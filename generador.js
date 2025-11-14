const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Generador de datos de prueba para Groovy/Spock
 * Lee datos de un JSON, elimina duplicados y genera strings formateados
 */

// Función para leer y parsear archivos JSON
function leerJSON(nombreArchivo) {
    try {
        const contenido = fs.readFileSync(nombreArchivo, 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        throw new Error(`Error al parsear JSON: ${error.message}`);
    }
}

// Función para validar estructura del archivo de datos
function validarDatosJSON(datos) {
    // Debe ser un objeto o un array
    if (typeof datos !== 'object' || datos === null) {
        return { valido: false, mensaje: 'El archivo debe contener un objeto JSON o un array' };
    }
    
    // Si es array, verificar que no esté vacío
    if (Array.isArray(datos) && datos.length === 0) {
        return { valido: false, mensaje: 'El array de datos está vacío' };
    }
    
    return { valido: true };
}

// Función para validar estructura del archivo de configuración
function validarConfigJSON(config) {
    // Debe ser un objeto
    if (typeof config !== 'object' || config === null || Array.isArray(config)) {
        return { valido: false, mensaje: 'El archivo de configuración debe ser un objeto JSON' };
    }
    
    // Debe tener el campo "campos"
    if (!config.campos) {
        return { valido: false, mensaje: 'El archivo de configuración debe tener un campo "campos"' };
    }
    
    // El campo "campos" debe ser un array
    if (!Array.isArray(config.campos)) {
        return { valido: false, mensaje: 'El campo "campos" debe ser un array' };
    }
    
    // El array "campos" no debe estar vacío
    if (config.campos.length === 0) {
        return { valido: false, mensaje: 'El array "campos" no puede estar vacío' };
    }
    
    // Validar que cada campo tenga "nombre" y "tipo"
    for (let i = 0; i < config.campos.length; i++) {
        const campo = config.campos[i];
        if (!campo.nombre || !campo.tipo) {
            return { 
                valido: false, 
                mensaje: `El campo en posición ${i} debe tener propiedades "nombre" y "tipo"` 
            };
        }
    }
    
    return { valido: true };
}

// Función para generar nombre de archivo con timestamp
function generarNombreAutomatico() {
    const ahora = new Date();
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    const hora = String(ahora.getHours()).padStart(2, '0');
    const minuto = String(ahora.getMinutes()).padStart(2, '0');
    const segundo = String(ahora.getSeconds()).padStart(2, '0');
    
    return `output_${año}${mes}${dia}_${hora}${minuto}${segundo}.txt`;
}

// Función para preguntar por la ruta de un archivo JSON con validación
function preguntarRutaJSON(nombreDefault, tipoArchivo, validarFn) {
    return new Promise((resolve) => {
        const pregunta = () => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            rl.question(`📂 ¿Ruta del archivo ${tipoArchivo}? (Enter para '${nombreDefault}'): `, (respuesta) => {
                rl.close();
                
                // Si el usuario no escribe nada, usar archivo por defecto
                const rutaArchivo = (!respuesta || respuesta.trim() === '') ? nombreDefault : respuesta.trim();
                
                // Verificar si el archivo existe
                if (!fs.existsSync(rutaArchivo)) {
                    console.log(`   ❌ Error: El archivo '${rutaArchivo}' no existe\n`);
                    pregunta();
                    return;
                }
                
                // Intentar leer y validar el JSON
                try {
                    const datos = leerJSON(rutaArchivo);
                    
                    // Validar estructura si se proporciona función de validación
                    if (validarFn) {
                        const resultado = validarFn(datos);
                        if (!resultado.valido) {
                            console.log(`   ❌ Error de validación: ${resultado.mensaje}\n`);
                            pregunta();
                            return;
                        }
                    }
                    
                    // Si llegamos aquí, todo está bien
                    if (rutaArchivo === nombreDefault) {
                        console.log(`   ✓ Usando archivo por defecto: ${nombreDefault}\n`);
                    } else {
                        console.log(`   ✓ Usando archivo: ${rutaArchivo}\n`);
                    }
                    resolve(rutaArchivo);
                    
                } catch (error) {
                    console.log(`   ❌ Error: ${error.message}\n`);
                    pregunta();
                }
            });
        };
        
        pregunta();
    });
}

// Función para preguntar al usuario el nombre del archivo de salida
function preguntarNombreArchivo() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('📝 ¿Nombre del archivo de salida? (Enter para usar nombre automático): ', (respuesta) => {
            rl.close();
            
            // Si el usuario no escribe nada, usar nombre automático
            if (!respuesta || respuesta.trim() === '') {
                const nombreAutomatico = generarNombreAutomatico();
                console.log(`   ✓ Usando nombre automático: ${nombreAutomatico}\n`);
                resolve(nombreAutomatico);
            } else {
                // Agregar .txt si no tiene extensión
                let nombreFinal = respuesta.trim();
                if (!nombreFinal.endsWith('.txt')) {
                    nombreFinal += '.txt';
                }
                console.log(`   ✓ Usando nombre: ${nombreFinal}\n`);
                resolve(nombreFinal);
            }
        });
    });
}

// Función para eliminar duplicados
function eliminarDuplicados(datos) {
    const unicos = [];
    const vistos = new Set();

    for (const objeto of datos) {
        // Crear una clave única basada en todos los valores del objeto
        const clave = JSON.stringify(objeto);
        
        if (!vistos.has(clave)) {
            vistos.add(clave);
            unicos.push(objeto);
        }
    }

    return unicos;
}

// Función para formatear un valor según su tipo
function formatearValor(valor, tipo) {
    switch (tipo.toLowerCase()) {
        case 'int':
        case 'number':
        case 'integer':
            // Parsear el valor para eliminar ceros a la izquierda
            const numeroParseado = parseInt(valor, 10);
            
            // Validar que sea un número válido
            if (isNaN(numeroParseado)) {
                console.warn(`⚠️  Advertencia: "${valor}" no es un número válido, usando 0`);
                return '0';
            }
            
            return String(numeroParseado);
            
        case 'string':
        case 'str':
            return `"${valor}"`;
            
        case 'boolean':
        case 'bool':
            return String(valor);
            
        default:
            // Por defecto, tratar como string
            return `"${valor}"`;
    }
}

// Función para generar la línea de cabecera
function generarCabecera(config) {
    const nombresCampos = config.campos.map(campo => campo.nombre);
    return nombresCampos.join(' | ') + ' || resultado';
}

// Función principal para generar las líneas formateadas
function generarLineas(datos, config) {
    const lineas = [];

    for (const objeto of datos) {
        const partes = [];

        // Procesar cada campo según la configuración
        for (const campo of config.campos) {
            const valor = objeto[campo.nombre];
            
            if (valor === undefined || valor === null) {
                console.warn(`⚠️  Advertencia: El campo "${campo.nombre}" no existe en:`, objeto);
                partes.push('null');
            } else {
                partes.push(formatearValor(valor, campo.tipo));
            }
        }

        // Unir con ' | ' y agregar ' || "resultado"' al final
        const linea = partes.join(' | ') + ' || "resultado"';
        lineas.push(linea);
    }

    return lineas;
}

// Función principal
async function main() {
    console.log('🚀 Iniciando generador de datos de prueba...\n');

    // 1. Preguntar por el archivo de datos JSON (con validación)
    const rutaDatos = await preguntarRutaJSON('datos.json', 'de datos JSON', validarDatosJSON);

    // 2. Preguntar por el archivo de configuración JSON (con validación)
    const rutaConfig = await preguntarRutaJSON('config.json', 'de configuración JSON', validarConfigJSON);

    // 3. Preguntar nombre del archivo de salida
    const nombreArchivo = await preguntarNombreArchivo();

    // 4. Leer datos de entrada
    console.log('📖 Leyendo archivo de datos...');
    let datos = leerJSON(rutaDatos);
    
    // Verificar si datos es un array
    if (!Array.isArray(datos)) {
        // Si es un objeto único, convertirlo a array
        datos = [datos];
    }
    console.log(`   ✓ ${datos.length} registro(s) encontrado(s)\n`);

    // 5. Eliminar duplicados
    console.log('🧹 Eliminando duplicados...');
    const datosOriginales = datos.length;
    datos = eliminarDuplicados(datos);
    const duplicadosEliminados = datosOriginales - datos.length;
    console.log(`   ✓ ${duplicadosEliminados} duplicado(s) eliminado(s)`);
    console.log(`   ✓ ${datos.length} registro(s) único(s)\n`);

    // 6. Leer configuración
    console.log('⚙️  Leyendo archivo de configuración...');
    const config = leerJSON(rutaConfig);
    console.log(`   ✓ ${config.campos.length} campo(s) configurado(s)\n`);

    // 7. Generar cabecera y líneas formateadas
    console.log('🔧 Generando líneas formateadas...');
    const cabecera = generarCabecera(config);
    const lineas = generarLineas(datos, config);
    console.log(`   ✓ ${lineas.length} línea(s) generada(s)\n`);

    // 8. Mostrar en consola
    console.log('📋 Resultado:\n');
    console.log('─'.repeat(80));
    console.log(`Cabecera: ${cabecera}`);
    console.log('─'.repeat(80));
    lineas.forEach((linea, index) => {
        console.log(`${index + 1}. ${linea}`);
    });
    console.log('─'.repeat(80));
    console.log();

    // 9. Guardar en archivo con cabecera
    const contenidoCompleto = [cabecera, ...lineas];
    const contenido = contenidoCompleto.join('\n');
    fs.writeFileSync(nombreArchivo, contenido, 'utf-8');
    console.log(`✅ Archivo generado: ${nombreArchivo}\n`);
    console.log(`💾 Total de líneas escritas: ${contenidoCompleto.length} (1 cabecera + ${lineas.length} datos)`);
}

// Ejecutar el programa
main();

