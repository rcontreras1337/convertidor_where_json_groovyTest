# 🎯 Ejemplo de Uso Completo

## Escenario 1: Usando Nombre Personalizado

```bash
$ node generador.js

🚀 Iniciando generador de datos de prueba...

📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): test_usuarios
   ✓ Usando nombre: test_usuarios.txt

📖 Leyendo datos.json...
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

## Escenario 2: Usando Nombre Automático (Timestamp)

```bash
$ node generador.js

🚀 Iniciando generador de datos de prueba...

📝 ¿Nombre del archivo de salida? (presiona Enter para usar nombre automático): [Enter]
   ✓ Usando nombre automático: output_20251113_143025.txt

📖 Leyendo datos.json...
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

**Resultado:** Se crea un archivo con timestamp único que no sobrescribe archivos anteriores.

---

## Escenario 3: Múltiples Ejecuciones (Historial)

```bash
# Primera ejecución (14:30:25)
$ node generador.js
[Enter] → output_20251113_143025.txt

# Segunda ejecución (14:31:10)
$ node generador.js
[Enter] → output_20251113_143110.txt

# Tercera ejecución (15:00:05)
$ node generador.js
[Enter] → output_20251113_150005.txt
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

1. **Nombres descriptivos:** Usa nombres que indiquen el propósito
   - ✅ `test_usuarios_validos.txt`
   - ✅ `casos_borde_login.txt`
   - ❌ `output.txt` (genérico)

2. **Modo automático para experimentar:** Si estás probando diferentes configuraciones, usa el modo automático (Enter) para no preocuparte por los nombres.

3. **Organización:** Crea una carpeta `outputs/` para guardar todos los archivos generados:
   ```bash
   mkdir outputs
   # Luego mueve o configura la salida ahí
   ```

4. **Versión en Git:** Si usas Git, considera agregar `output_*.txt` al `.gitignore` para no versionar archivos generados automáticamente.

