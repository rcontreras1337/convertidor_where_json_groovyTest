# Generador de Datos de Prueba para Groovy/Spock

Este proyecto genera datos formateados para usar en tests de Groovy/Spock después de la cláusula `where:`.

## 📋 Requisitos

- Node.js (versión 12 o superior)
  - **Windows/Mac/Linux**: Descargar desde [nodejs.org](https://nodejs.org/)

## 🚀 Uso Rápido

1. **Edita tus archivos de configuración:**
   - `datos.json` - Tus datos de entrada
   - `config.json` - Configuración de campos

2. **Ejecuta el generador:**
   ```bash
   node generador.js
   ```

3. **El resultado se muestra en consola y se guarda en:**
   - `output.txt`

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

Ejemplo de salida con parseo de enteros:

```
123 | "hola" | "mundo" || "resultado"
42 | "test" | "data" || "resultado"
100 | "ejemplo" | "prueba" || "resultado"
1 | "foo" | "bar" || "resultado"
```

**Nota:** Observa cómo `"000123"` se convirtió en `123` (tipo int), mientras que `"hola"` mantiene las comillas (tipo string).

## 🎯 Ejemplo de Uso en Groovy/Spock

Puedes copiar el contenido de `output.txt` directamente a tu test:

```groovy
def "test con datos generados"() {
    expect:
    miMetodo(id, nombre, descripcion) == resultado
    
    where:
    id | nombre | descripcion || resultado
    123 | "hola" | "mundo" || "resultado"
    42 | "test" | "data" || "resultado"
    100 | "ejemplo" | "prueba" || "resultado"
    1 | "foo" | "bar" || "resultado"
}
```

## ⚙️ Características

✅ Elimina automáticamente datos duplicados
✅ Configura el orden de los campos
✅ Define tipos (int, string, boolean)
✅ **Parsea automáticamente enteros y elimina ceros a la izquierda**
✅ Genera formato listo para Spock/Groovy
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

### Cambiar el nombre del archivo de salida

Edita la línea 103 en `generador.js`:

```javascript
const nombreArchivo = 'mi_archivo.txt'; // Cambia 'output.txt'
```

### Usar diferentes archivos de entrada

Puedes modificar las líneas 82-83 para usar diferentes archivos:

```javascript
let datos = leerJSON('mis_datos.json');
const config = leerJSON('mi_config.json');
```

### Formato personalizado del resultado

Por defecto, siempre se agrega ` || "resultado"` al final. Para cambiar esto, edita la línea 67:

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

