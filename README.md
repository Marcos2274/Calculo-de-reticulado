# 📐 Calculadora de Reticulados - Método de Nudos

Una aplicación web profesional para el análisis estructural de reticulados por el método de nudos, desarrollada por Marcos Di Dio.

## 🌐 Sitio Web

- **Página Principal**: [https://marcos2274.github.io/Calculo-de-reticulado/](https://marcos2274.github.io/Calculo-de-reticulado/)
- **Aplicación Directa**: [https://marcos2274.github.io/Calculo-de-reticulado/app/calculadora.html](https://marcos2274.github.io/Calculo-de-reticulado/app/calculadora.html)

## ✨ Características Principales

- 🔧 **Método de Nudos**: Cálculo preciso de esfuerzos internos utilizando el método de análisis por nudos
- 📊 **Diagnóstico de Isostaticidad**: Evaluación automática de grados de libertad (isostática, hipostática, hiperestática)
- 💾 **Guardar y Cargar**: Exporta e importa proyectos completos en formato JSON
- 🎨 **Visualización Avanzada**: Canvas interactivo con zoom, paneo y múltiples orientaciones de ejes
- 📐 **Diferenciación de Fuerzas**: Distingue entre reacciones de apoyo y cargas externas
- ↩️ **Deshacer/Rehacer**: Sistema completo de historial de cambios

## 🚀 Funcionalidades Detalladas

### Entrada de Datos
- ✅ Definición de nudos con coordenadas X, Y personalizadas
- ✅ Creación de barras conectando nudos
- ✅ Cargas externas por componentes directas (Fx, Fy)
- ✅ Fuerzas inclinadas por geometría/pendiente
- ✅ Reacciones de apoyo diferenciadas
- ✅ Edición en línea de todos los elementos

### Análisis y Resultados
- ✅ Cálculo automático de esfuerzos internos (tracción/compresión)
- ✅ Evaluación de isoestaticidad (fórmula GL = 2n - b - r)
- ✅ Detección de barras nulas
- ✅ Tabla de resultados ordenada por nudos
- ✅ Leyenda de reacciones con identificadores alfabéticos

### Visualización
- ✅ Canvas de geometría con código de colores
- ✅ Diagrama de esfuerzos ampliado con indicadores direccionales
- ✅ Controles de zoom y paneo (arrastrar con mouse)
- ✅ 4 orientaciones de ejes disponibles
- ✅ Flechas inteligentes que evitan superposición con barras

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura y contenido embebido
- **CSS3**: Estilos modernos con diseño responsivo
- **JavaScript Vanilla**: Lógica de cálculo, visualización y persistencia
- **Canvas API**: Renderizado gráfico de alta calidad

## 📖 Cómo Usar

### 1. Definir Nudos
- Ingresa coordenadas X e Y (en metros)
- Opcionalmente especifica un ID de nudo
- Los nudos se visualizan automáticamente

### 2. Conectar Barras
- Selecciona el nudo de inicio y fin
- Las barras se crean automáticamente
- Verifica que no haya duplicados

### 3. Aplicar Cargas y Reacciones
**Opción A - Por Componentes:**
- Define fuerzas en X (Fx) y/o Y (Fy)
- Selecciona si es reacción de apoyo o carga externa

**Opción B - Por Geometría:**
- Ingresa la magnitud de la fuerza
- Define proporciones dx y dy (pendiente)
- La calculadora proyecta automáticamente

### 4. Calcular
- Presiona "Calcular Esfuerzos Internos"
- Verifica el diagnóstico de isostaticidad
- Revisa los resultados en las tablas y gráficos

### 5. Guardar/Cargar Proyectos
- Descarga el archivo JSON del proyecto
- O copia el código al portapapeles
- Importa proyectos guardados para continuar trabajando

## 🔧 Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/Marcos2274/Calculo-de-reticulado.git

# Navegar al directorio
cd Calculo-de-reticulado

# Opción 1: Abrir la landing page
# Abre index.html en tu navegador

# Opción 2: Ir directamente a la aplicación
# Abre app/calculadora.html en tu navegador
```

No requiere servidor ni dependencias. Todo funciona con archivos HTML estáticos.

## 📁 Estructura del Proyecto

```
Calculo-de-reticulado/
│
├── app/
│   └── calculadora.html      # Aplicación completa (HTML + CSS + JS embebido)
├── index.html                # Landing page del proyecto
└── README.md                 # Documentación
```

## 🎓 Fundamentos de Ingeniería

### Método de Nudos
La aplicación resuelve estructuras reticuladas mediante el **Método de los Nudos**, que:
- Aplica ecuaciones de equilibrio (ΣFx = 0, ΣFy = 0) en cada nudo
- Resuelve sistemas de ecuaciones lineales iterativamente
- Determina si las barras están en tracción (+) o compresión (-)

### Fórmula de Isoestaticidad
**GL = 2n - b - r**

Donde:
- **n** = número de nudos
- **b** = número de barras
- **r** = restricciones de apoyo (componentes de reacciones)

**Resultados:**
- GL = 0 → Estructura **isostática** (perfecta)
- GL > 0 → Estructura **hipostática** (inestable)
- GL < 0 → Estructura **hiperestática** (sobrerestringida)

## 💡 Consejos de Uso

- Comienza con estructuras simples (3-4 nudos)
- Verifica que el diagnóstico sea "Isostática" antes de calcular
- Usa la función de guardar frecuentemente
- Experimenta con las diferentes orientaciones de ejes
- Aprovecha el zoom y paneo en estructuras grandes

## 📄 Licencia

Este proyecto fue desarrollado por **Marcos Di Dio** y está disponible para uso educativo y profesional.

## 👤 Autor

**Marcos Di Dio**

- GitHub: [@Marcos2274](https://github.com/Marcos2274)
- Proyecto: [Calculo-de-reticulado](https://github.com/Marcos2274/Calculo-de-reticulado)

## 🙏 Agradecimientos

Desarrollado con dedicación para estudiantes y profesionales de ingeniería civil y estructural.

---

⭐ Si te resulta útil este proyecto, ¡dale una estrella en GitHub!
