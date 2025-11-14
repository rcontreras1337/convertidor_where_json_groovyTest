# 🎯 Ejemplo de Uso Completo

## Escenario 1: Usando Archivos por Defecto

```bash
$ node generador.js

🚀 Iniciando generador de datos de prueba...

📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): [Enter]
   ✓ Usando archivo por defecto: datos.json

📂 ¿Ruta del archivo de configuración JSON? (Enter para 'config.json'): [Enter]
   ✓ Usando archivo por defecto: config.json

📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): test_usuarios
   ✓ Usando nombre: test_usuarios.txt

📖 Leyendo archivo de datos...
   ✓ 6 registro(s) encontrado(s)

🧹 Eliminando duplicados...
   ✓ 2 duplicado(s) eliminado(s)
   ✓ 4 registro(s) único(s)

⚙️  Leyendo config.json...
   ✓ 3 campo(s) configurado(s)

🔧 Generando líneas formateadas...
   ✓ 4 línea(s) generada(s)

📋 Resultado:

────────────────────────────────────────────────────────────────────────────────
1. 123 | "hola" | "mundo" || "resultado"
2. 42 | "test" | "data" || "resultado"
3. 100 | "ejemplo" | "prueba" || "resultado"
4. 1 | "foo" | "bar" || "resultado"
────────────────────────────────────────────────────────────────────────────────

✅ Archivo generado: test_usuarios.txt

💾 Total de líneas escritas: 4
```

**Resultado:** Se crea el archivo `test_usuarios.txt` con el contenido.

---

## Escenario 2: Usando Rutas Personalizadas

```bash
$ node generador.js

🚀 Iniciando generador de datos de prueba...

📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): test_data/usuarios.json
   ✓ Usando archivo: test_data/usuarios.json

📂 ¿Ruta del archivo de configuración JSON? (Enter para 'config.json'): test_data/config_usuarios.json
   ✓ Usando archivo: test_data/config_usuarios.json

📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): [Enter]
   ✓ Usando nombre automático: output_20251113_143025.txt

📖 Leyendo archivo de datos...
   ✓ 6 registro(s) encontrado(s)

🧹 Eliminando duplicados...
   ✓ 2 duplicado(s) eliminado(s)
   ✓ 4 registro(s) único(s)

⚙️  Leyendo config.json...
   ✓ 3 campo(s) configurado(s)

🔧 Generando líneas formateadas...
   ✓ 4 línea(s) generada(s)

📋 Resultado:

────────────────────────────────────────────────────────────────────────────────
1. 123 | "hola" | "mundo" || "resultado"
2. 42 | "test" | "data" || "resultado"
3. 100 | "ejemplo" | "prueba" || "resultado"
4. 1 | "foo" | "bar" || "resultado"
────────────────────────────────────────────────────────────────────────────────

✅ Archivo generado: output_20251113_143025.txt

💾 Total de líneas escritas: 4
```

**Resultado:** Se crean archivos usando rutas personalizadas de diferentes carpetas.

---

## Escenario 3: Manejo de Errores y Recuperación

```bash
$ node generador.js

🚀 Iniciando generador de datos de prueba...

📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): archivo_inexistente.json
   ❌ Error: El archivo 'archivo_inexistente.json' no existe

📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): C:\ruta\incorrecta\datos.json
   ❌ Error: El archivo 'C:\ruta\incorrecta\datos.json' no existe

📂 ¿Ruta del archivo de datos JSON? (Enter para 'datos.json'): [Enter]
   ✓ Usando archivo por defecto: datos.json

📂 ¿Ruta del archivo de configuración JSON? (Enter para 'config.json'): [Enter]
   ✓ Usando archivo por defecto: config.json

📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): [Enter]
   ✓ Usando nombre automático: output_20251113_150005.txt

📖 Leyendo archivo de datos...
   ✓ 6 registro(s) encontrado(s)

🧹 Eliminando duplicados...
   ✓ 2 duplicado(s) eliminado(s)
   ✓ 4 registro(s) único(s)

⚙️  Leyendo archivo de configuración...
   ✓ 3 campo(s) configurado(s)

🔧 Generando líneas formateadas...
   ✓ 4 línea(s) generada(s)

📋 Resultado:

────────────────────────────────────────────────────────────────────────────────
1. 123 | "hola" | "mundo" || "resultado"
2. 42 | "test" | "data" || "resultado"
3. 100 | "ejemplo" | "prueba" || "resultado"
4. 1 | "foo" | "bar" || "resultado"
────────────────────────────────────────────────────────────────────────────────

✅ Archivo generado: output_20251113_150005.txt

💾 Total de líneas escritas: 4
```

**Resultado:** Después de varios intentos fallidos, presionar Enter permite usar los valores por defecto y continuar.

---

## Escenario 4: Múltiples Ejecuciones (Historial)

Usando valores por defecto para todo (presionando Enter 3 veces):

```bash
# Primera ejecución (14:30:25)
$ node generador.js
[Enter datos] [Enter config] [Enter salida] → output_20251113_143025.txt

# Segunda ejecución (14:31:10)
$ node generador.js
[Enter datos] [Enter config] [Enter salida] → output_20251113_143110.txt

# Tercera ejecución (15:00:05)
$ node generador.js
[Enter datos] [Enter config] [Enter salida] → output_20251113_150005.txt
```

**Ventaja:** Mantienes un historial completo sin sobrescribir archivos anteriores.

```
📁 Directorio:
  ├── datos.json
  ├── config.json
  ├── generador.js
  ├── output_20251113_143025.txt  ← Primera ejecución
  ├── output_20251113_143110.txt  ← Segunda ejecución
  └── output_20251113_150005.txt  ← Tercera ejecución
```

---

## 🎯 Uso en Groovy/Spock

Copia el contenido del archivo generado directamente a tu test:

```groovy
class MiTest extends Specification {
    
    def "debe procesar correctamente los datos"() {
        expect:
        procesarDatos(id, nombre, descripcion) == resultado
        
        where:
        id | nombre | descripcion || resultado
        123 | "hola" | "mundo" || "resultado"
        42 | "test" | "data" || "resultado"
        100 | "ejemplo" | "prueba" || "resultado"
        1 | "foo" | "bar" || "resultado"
    }
}
```

---

## 💡 Consejos

1. **Organización de archivos:** Crea carpetas para diferentes conjuntos de datos
   ```bash
   mkdir test_data
   mkdir test_data/usuarios
   mkdir test_data/productos
   ```

2. **Rutas relativas vs absolutas:**
   - ✅ Relativas: `test_data/usuarios.json` (más portables)
   - ✅ Absolutas: `C:\datos\usuarios.json` (más específicas)
   - 💡 Las relativas funcionan mejor en equipos diferentes

3. **Nombres descriptivos para archivos de salida:**
   - ✅ `test_usuarios_validos.txt`
   - ✅ `casos_borde_login.txt`
   - ❌ `output.txt` (genérico)

4. **Modo automático para experimentar:** 
   - Presiona Enter 3 veces para usar todos los defaults
   - Ideal cuando estás probando configuraciones rápidamente

5. **Manejo de errores:**
   - Si te equivocas en la ruta, el programa pregunta de nuevo
   - Siempre puedes presionar Enter para usar el archivo por defecto
   - No hay límite de reintentos

6. **Archivos en la misma carpeta:**
   - Si tus archivos están en el directorio actual, solo escribe el nombre
   - Ejemplo: `usuarios.json` en vez de `./usuarios.json`

7. **Versión en Git:** 
   - El `.gitignore` ya está configurado para ignorar `output_*.txt`
   - Tus archivos generados automáticamente no se versionarán

