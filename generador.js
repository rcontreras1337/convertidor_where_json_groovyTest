const fs = require('fs');
const path = require('path');

/**
 * Generador de datos de prueba para Groovy/Spock
 * Lee datos de un JSON, elimina duplicados y genera strings formateados
 */

// Función para leer archivos JSON
function leerJSON(nombreArchivo) {
    try {
        const contenido = fs.readFileSync(nombreArchivo, 'utf-8');
        return JSON.parse(contenido);
    } catch (error) {
        console.error(`❌ Error al leer ${nombreArchivo}:`, error.message);
        process.exit(1);
    }
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
function main() {
    console.log('🚀 Iniciando generador de datos de prueba...\n');

    // 1. Leer datos de entrada
    console.log('📖 Leyendo datos.json...');
    let datos = leerJSON('datos.json');
    
    // Verificar si datos es un array
    if (!Array.isArray(datos)) {
        // Si es un objeto único, convertirlo a array
        datos = [datos];
    }
    console.log(`   ✓ ${datos.length} registro(s) encontrado(s)\n`);

    // 2. Eliminar duplicados
    console.log('🧹 Eliminando duplicados...');
    const datosOriginales = datos.length;
    datos = eliminarDuplicados(datos);
    const duplicadosEliminados = datosOriginales - datos.length;
    console.log(`   ✓ ${duplicadosEliminados} duplicado(s) eliminado(s)`);
    console.log(`   ✓ ${datos.length} registro(s) único(s)\n`);

    // 3. Leer configuración
    console.log('⚙️  Leyendo config.json...');
    const config = leerJSON('config.json');
    console.log(`   ✓ ${config.campos.length} campo(s) configurado(s)\n`);

    // 4. Generar líneas formateadas
    console.log('🔧 Generando líneas formateadas...');
    const lineas = generarLineas(datos, config);
    console.log(`   ✓ ${lineas.length} línea(s) generada(s)\n`);

    // 5. Mostrar en consola
    console.log('📋 Resultado:\n');
    console.log('─'.repeat(80));
    lineas.forEach((linea, index) => {
        console.log(`${index + 1}. ${linea}`);
    });
    console.log('─'.repeat(80));
    console.log();

    // 6. Guardar en archivo
    const nombreArchivo = 'output.txt';
    const contenido = lineas.join('\n');
    fs.writeFileSync(nombreArchivo, contenido, 'utf-8');
    console.log(`✅ Archivo generado: ${nombreArchivo}\n`);
    console.log(`💾 Total de líneas escritas: ${lineas.length}`);
}

// Ejecutar el programa
main();

