# Generador de Datos de Prueba para Groovy/Spock

Este proyecto genera datos formateados para usar en tests de Groovy/Spock después de la cláusula `where:`.

> 📖 **¿Primera vez usando el generador?** Lee [EJEMPLO_USO.md](EJEMPLO_USO.md) para ver ejemplos completos paso a paso.

## 📋 Requisitos

- Node.js (versión 12 o superior)
  - **Windows/Mac/Linux**: Descargar desde [nodejs.org](https://nodejs.org/)

## 🚀 Uso Rápido

1. **Prepara tus archivos:**
   - Archivo JSON con datos de entrada
   - Archivo JSON con configuración de campos

2. **Ejecuta el generador:**
   ```bash
   node generador.js
   ```

3. **Responde las preguntas interactivas:**
   - **Ruta del archivo de datos JSON** (Enter para `datos.json`)
   - **Ruta del archivo de configuración JSON** (Enter para `config.json`)
   - **Nombre del archivo de salida** (Enter para nombre automático con timestamp)

4. **El resultado se muestra en consola y se guarda en el archivo indicado**

## 📂 Selección de Archivos de Entrada

El generador te permite especificar rutas personalizadas para tus archivos JSON o usar los valores por defecto.

### Pregunta 1: Archivo de Datos JSON

```bash
📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): _
```

**Opciones:**
- **Presiona Enter**: Usa `datos.json` (archivo por defecto en el directorio actual)
- **Escribe una ruta**: Usa el archivo que especifiques
  - Ruta relativa: `mis_datos/usuarios.json`
  - Ruta absoluta: `C:\datos\usuarios.json`
  - Archivo en mismo directorio: `usuarios.json`

**Validación:**
- ✅ Si el archivo existe → Continúa
- ❌ Si el archivo NO existe → Vuelve a preguntar (sin límite de intentos)
- 💡 Puedes presionar Enter en cualquier momento para usar el archivo por defecto

### Pregunta 2: Archivo de Configuración JSON

```bash
📂 ¿Ruta del archivo de configuración JSON? (Enter para 'config.json'): _
```

Funciona igual que la pregunta anterior, pero para el archivo de configuración.

### Ejemplo con Errores y Recuperación:

```bash
📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): mi_archivo.json
   ❌ Error: El archivo 'mi_archivo.json' no existe

📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): /ruta/incorrecta.json
   ❌ Error: El archivo '/ruta/incorrecta.json' no existe

📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): usuarios.json
   ✓ Usando archivo: usuarios.json
```

## 📝 Nombre del Archivo de Salida

Al final, se te preguntará por el nombre del archivo de salida:

```bash
🚀 Iniciando generador de datos de prueba...

📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): _
```

### Opción 1: Nombre Personalizado

Escribe el nombre que quieras:

```bash
📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): test_usuarios
   ✓ Usando nombre: test_usuarios.txt
```

**Nota:** Si no agregas `.txt`, se añade automáticamente.

### Opción 2: Nombre Automático (Timestamp)

Simplemente presiona **Enter** sin escribir nada:

```bash
📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): 
   ✓ Usando nombre automático: output_20251113_143025.txt
```

**Formato del timestamp:** `output_YYYYMMDD_HHMMSS.txt`
- `YYYYMMDD` = Año, Mes, Día
- `HHMMSS` = Hora, Minuto, Segundo

**Ventajas:**
- ✅ No sobrescribe archivos anteriores
- ✅ Mantiene un historial de salidas
- ✅ Fácil identificar cuándo se generó cada archivo

## 📁 Estructura de Archivos

### `datos.json` - Datos de entrada

Puede ser un array de objetos o un objeto único:

```json
[
    {
        "variable1": "1",
        "variable2": "2",
        "variable3": "3"
    },
    {
        "variable1": "10",
        "variable2": "20",
        "variable3": "30"
    }
]
```

**Nota:** Los duplicados se eliminan automáticamente.

### `config.json` - Configuración

Define qué campos usar, en qué orden y qué tipo tienen:

```json
{
    "campos": [
        {
            "nombre": "variable1",
            "tipo": "int"
        },
        {
            "nombre": "variable2",
            "tipo": "string"
        },
        {
            "nombre": "variable3",
            "tipo": "string"
        }
    ]
}
```

**Tipos soportados:**
- `int`, `integer`, `number` → Sin comillas, parsea y elimina ceros a la izquierda: `"000123"` → `123`
- `string`, `str` → Con comillas, mantiene el formato original: `"000123"` → `"000123"`
- `boolean`, `bool` → Sin comillas: `true` o `false`

**Nota:** Cuando el tipo es `int`, el valor se parsea con `parseInt()` para:
- Eliminar ceros a la izquierda: `000123` → `123`
- Convertir a número válido: `"00042"` → `42`
- Si el valor no es numérico, se usa `0` y muestra una advertencia

### `output.txt` - Salida generada

Ejemplo de salida con cabecera y parseo de enteros:

```
variable1 | variable2 | variable3 || resultado
123 | "hola" | "mundo" || "resultado"
42 | "test" | "data" || "resultado"
100 | "ejemplo" | "prueba" || "resultado"
1 | "foo" | "bar" || "resultado"
```

**Características:**
- ✅ Primera línea es la **cabecera** con nombres de campos (generada automáticamente desde config.json)
- ✅ Los valores tipo `int` se parsean: `"000123"` → `123`
- ✅ Los valores tipo `string` mantienen comillas: `"hola"`

## 🎯 Ejemplo de Uso en Groovy/Spock

Puedes copiar el contenido de `output.txt` directamente a tu test:

```groovy
def "test con datos generados"() {
    expect:
    miMetodo(variable1, variable2, variable3) == resultado
    
    where:
    variable1 | variable2 | variable3 || resultado
    123 | "hola" | "mundo" || "resultado"
    42 | "test" | "data" || "resultado"
    100 | "ejemplo" | "prueba" || "resultado"
    1 | "foo" | "bar" || "resultado"
}
```

**💡 Nota:** La primera línea del archivo generado **ya es la cabecera** lista para Spock, puedes copiar todo el contenido directamente.

## ⚙️ Características

✅ **Genera cabecera automáticamente** con nombres de campos desde config.json
✅ **Selección flexible de archivos de entrada** (rutas personalizadas o defaults)
✅ **Validación automática de existencia de archivos** con reintentos ilimitados
✅ Elimina automáticamente datos duplicados
✅ Configura el orden de los campos
✅ Define tipos (int, string, boolean)
✅ **Parsea automáticamente enteros y elimina ceros a la izquierda**
✅ **Nombre de archivo de salida personalizado o automático con timestamp**
✅ No sobrescribe archivos anteriores (con modo automático)
✅ Soporta rutas relativas y absolutas
✅ **Formato listo para copiar directo a tests Spock/Groovy**
✅ Muestra resultado en consola y archivo
✅ Compatible con Windows, Mac y Linux

## 🔢 Ejemplos de Parseo de Enteros

Cuando defines un campo con tipo `int`, el generador automáticamente parsea el valor:

| Valor Original | Tipo Config | Resultado |
|---------------|-------------|-----------|
| `"000123"`    | `int`       | `123`     |
| `"00042"`     | `int`       | `42`      |
| `"0000001"`   | `int`       | `1`       |
| `"123"`       | `int`       | `123`     |
| `"000123"`    | `string`    | `"000123"` |
| `"abc"`       | `int`       | `0` ⚠️ (muestra advertencia) |

**Ventajas del parseo:**
- 🧹 Limpia ceros innecesarios automáticamente
- ✅ Formato correcto para números en Groovy
- 📖 Tests más legibles
- 🎯 Comportamiento correcto según el tipo de dato

## 🔧 Personalización

### Usar diferentes archivos de entrada

Puedes modificar las líneas correspondientes en `generador.js` para usar diferentes archivos:

```javascript
let datos = leerJSON('mis_datos.json');
const config = leerJSON('mi_config.json');
```

### Cambiar formato del nombre automático

Para personalizar el formato del timestamp, edita la función `generarNombreAutomatico()` en `generador.js`:

```javascript
return `mi_prefix_${año}${mes}${dia}_${hora}${minuto}${segundo}.txt`;
```

### Formato personalizado del resultado

Por defecto, siempre se agrega ` || "resultado"` al final. Para cambiar esto, busca y edita esta línea en `generador.js`:

```javascript
const linea = partes.join(' | ') + ' || "mi_resultado"';
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
- Asegúrate de estar en el directorio correcto
- Verifica que Node.js esté instalado: `node --version`

### Advertencia: "El campo no existe"
- Revisa que los nombres en `config.json` coincidan con los de `datos.json`
- Verifica la ortografía (mayúsculas/minúsculas importan)

### Datos duplicados no se eliminan
- La eliminación se basa en que **todos** los campos sean idénticos
- Revisa que los valores sean exactamente iguales

## 📝 Notas

- El formato de salida usa espacios alrededor de `|` y `||` para mejor legibilidad
- Los valores `null` o `undefined` se muestran como `null`
- El archivo se sobrescribe cada vez que ejecutas el generador

## 📞 Ayuda

Si tienes problemas, verifica:
1. ✅ Node.js está instalado
2. ✅ Estás en el directorio correcto
3. ✅ Los archivos `datos.json` y `config.json` existen y son JSON válidos
4. ✅ Los nombres de campos coinciden entre archivos

---

¡Feliz generación de datos de prueba! 🚀

