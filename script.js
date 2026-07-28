// Variables globales
let estructura = {
    nodos: [],
    elementos: [],
    cargas: [],
    apoyos: []
};

let canvas, ctx;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('canvas-estructura');
    ctx = canvas.getContext('2d');
    
    // Event listeners
    document.getElementById('generar-estructura').addEventListener('click', generarEstructura);
    document.getElementById('calcular').addEventListener('click', calcularEstructura);
    
    // Navegación suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Generar estructura de ejemplo
    generarEstructuraEjemplo();
});

function generarEstructura() {
    const numNodos = parseInt(document.getElementById('num-nodos').value);
    const numElementos = parseInt(document.getElementById('num-elementos').value);
    
    if (numNodos < 2 || numElementos < 1) {
        alert('Por favor, ingresa valores válidos para nodos y elementos.');
        return;
    }
    
    // Limpiar estructura anterior
    estructura.nodos = [];
    estructura.elementos = [];
    estructura.cargas = [];
    estructura.apoyos = [];
    
    // Generar nodos en una disposición simple
    const width = canvas.width - 100;
    const height = canvas.height - 100;
    const spacing = width / (numNodos - 1);
    
    for (let i = 0; i < numNodos; i++) {
        estructura.nodos.push({
            id: i,
            x: 50 + i * spacing,
            y: height / 2,
            desplazamientoX: 0,
            desplazamientoY: 0
        });
    }
    
    // Generar elementos conectando nodos
    const elementosPorNodo = Math.ceil(numElementos / (numNodos - 1));
    let elementoId = 0;
    
    for (let i = 0; i < numNodos - 1 && elementoId < numElementos; i++) {
        estructura.elementos.push({
            id: elementoId++,
            nodoInicio: i,
            nodoFin: i + 1,
            fuerza: 0
        });
    }
    
    // Agregar algunos elementos diagonales si hay espacio
    for (let i = 0; i < numNodos - 2 && elementoId < numElementos; i++) {
        estructura.elementos.push({
            id: elementoId++,
            nodoInicio: i,
            nodoFin: i + 2,
            fuerza: 0
        });
    }
    
    // Definir apoyos (primer y último nodo)
    estructura.apoyos.push({ nodo: 0, tipo: 'fijo' });
    estructura.apoyos.push({ nodo: numNodos - 1, tipo: 'rodillo' });
    
    // Agregar una carga en el nodo central
    const nodoCentral = Math.floor(numNodos / 2);
    estructura.cargas.push({
        nodo: nodoCentral,
        fx: 0,
        fy: -100 // Carga hacia abajo
    });
    
    dibujarEstructura();
}

function generarEstructuraEjemplo() {
    // Estructura de ejemplo: cercha simple
    estructura.nodos = [
        { id: 0, x: 50, y: 250, desplazamientoX: 0, desplazamientoY: 0 },
        { id: 1, x: 200, y: 100, desplazamientoX: 0, desplazamientoY: 0 },
        { id: 2, x: 350, y: 250, desplazamientoX: 0, desplazamientoY: 0 },
        { id: 3, x: 500, y: 100, desplazamientoX: 0, desplazamientoY: 0 }
    ];
    
    estructura.elementos = [
        { id: 0, nodoInicio: 0, nodoFin: 1, fuerza: 0 },
        { id: 1, nodoInicio: 1, nodoFin: 2, fuerza: 0 },
        { id: 2, nodoInicio: 2, nodoFin: 3, fuerza: 0 },
        { id: 3, nodoInicio: 0, nodoFin: 2, fuerza: 0 },
        { id: 4, nodoInicio: 1, nodoFin: 3, fuerza: 0 }
    ];
    
    estructura.apoyos = [
        { nodo: 0, tipo: 'fijo' },
        { nodo: 3, tipo: 'rodillo' }
    ];
    
    estructura.cargas = [
        { nodo: 1, fx: 0, fy: -50 },
        { nodo: 2, fx: 0, fy: -75 }
    ];
    
    dibujarEstructura();
}

function dibujarEstructura() {
    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar elementos (barras)
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    
    estructura.elementos.forEach(elemento => {
        const nodoInicio = estructura.nodos[elemento.nodoInicio];
        const nodoFin = estructura.nodos[elemento.nodoFin];
        
        ctx.beginPath();
        ctx.moveTo(nodoInicio.x, nodoInicio.y);
        ctx.lineTo(nodoFin.x, nodoFin.y);
        ctx.stroke();
        
        // Dibujar fuerza en el elemento si existe
        if (elemento.fuerza !== 0) {
            const midX = (nodoInicio.x + nodoFin.x) / 2;
            const midY = (nodoInicio.y + nodoFin.y) / 2;
            
            ctx.fillStyle = elemento.fuerza > 0 ? '#ef4444' : '#10b981';
            ctx.font = '12px Arial';
            ctx.fillText(`${elemento.fuerza.toFixed(1)} kN`, midX + 5, midY - 5);
        }
    });
    
    // Dibujar nodos
    estructura.nodos.forEach((nodo, index) => {
        // Nodo
        ctx.fillStyle = '#1e40af';
        ctx.beginPath();
        ctx.arc(nodo.x, nodo.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Número del nodo
        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(index, nodo.x + 10, nodo.y - 10);
    });
    
    // Dibujar apoyos
    estructura.apoyos.forEach(apoyo => {
        const nodo = estructura.nodos[apoyo.nodo];
        
        if (apoyo.tipo === 'fijo') {
            // Apoyo fijo (triángulo)
            ctx.fillStyle = '#64748b';
            ctx.beginPath();
            ctx.moveTo(nodo.x, nodo.y);
            ctx.lineTo(nodo.x - 10, nodo.y + 15);
            ctx.lineTo(nodo.x + 10, nodo.y + 15);
            ctx.closePath();
            ctx.fill();
        } else if (apoyo.tipo === 'rodillo') {
            // Apoyo rodillo (círculo)
            ctx.fillStyle = '#64748b';
            ctx.beginPath();
            ctx.arc(nodo.x, nodo.y + 12, 5, 0, 2 * Math.PI);
            ctx.fill();
        }
    });
    
    // Dibujar cargas
    ctx.strokeStyle = '#ef4444';
    ctx.fillStyle = '#ef4444';
    ctx.lineWidth = 2;
    
    estructura.cargas.forEach(carga => {
        const nodo = estructura.nodos[carga.nodo];
        const escala = 0.5;
        
        // Flecha de carga
        if (carga.fy !== 0) {
            const offsetY = carga.fy < 0 ? -40 : 40;
            ctx.beginPath();
            ctx.moveTo(nodo.x, nodo.y - 40);
            ctx.lineTo(nodo.x, nodo.y);
            ctx.stroke();
            
            // Punta de flecha
            ctx.beginPath();
            ctx.moveTo(nodo.x, nodo.y);
            ctx.lineTo(nodo.x - 5, nodo.y - 10);
            ctx.lineTo(nodo.x + 5, nodo.y - 10);
            ctx.closePath();
            ctx.fill();
            
            // Valor de la carga
            ctx.font = '12px Arial';
            ctx.fillText(`${Math.abs(carga.fy)} kN`, nodo.x + 10, nodo.y - 40);
        }
    });
}

function calcularEstructura() {
    const E = parseFloat(document.getElementById('modulo-elasticidad').value) * 1e9; // Convertir a Pa
    const A = parseFloat(document.getElementById('area-seccion').value) * 1e-4; // Convertir a m²
    
    if (!E || !A) {
        alert('Por favor, ingresa valores válidos para el módulo de elasticidad y área de sección.');
        return;
    }
    
    // Cálculo simplificado de fuerzas usando el método de nodos
    // Este es un ejemplo básico - un análisis real requeriría matrices de rigidez
    
    estructura.elementos.forEach(elemento => {
        const nodoInicio = estructura.nodos[elemento.nodoInicio];
        const nodoFin = estructura.nodos[elemento.nodoFin];
        
        // Calcular longitud del elemento
        const dx = nodoFin.x - nodoInicio.x;
        const dy = nodoFin.y - nodoInicio.y;
        const L = Math.sqrt(dx * dx + dy * dy) / 100; // Convertir a metros
        
        // Cálculo simplificado de la fuerza axial
        // En un análisis real, esto vendría de resolver el sistema de ecuaciones
        let fuerza = 0;
        
        estructura.cargas.forEach(carga => {
            if (carga.nodo === elemento.nodoInicio || carga.nodo === elemento.nodoFin) {
                const cosTheta = dx / (L * 100);
                const senTheta = dy / (L * 100);
                fuerza += (carga.fx * cosTheta + carga.fy * senTheta) * 0.5;
            }
        });
        
        elemento.fuerza = fuerza;
    });
    
    // Mostrar resultados
    mostrarResultados();
    dibujarEstructura();
}

function mostrarResultados() {
    const resultadosDiv = document.getElementById('resultados');
    const contenidoDiv = document.getElementById('resultados-contenido');
    
    let html = '<div class="result-item">';
    html += '<h4>Fuerzas en los Elementos</h4>';
    
    estructura.elementos.forEach(elemento => {
        const tipo = elemento.fuerza > 0 ? 'Tracción' : 'Compresión';
        const color = elemento.fuerza > 0 ? 'color: #ef4444' : 'color: #10b981';
        
        html += `<p>Elemento ${elemento.id} (Nodo ${elemento.nodoInicio} → ${elemento.nodoFin}): 
                 <span class="result-value" style="${color}">${Math.abs(elemento.fuerza).toFixed(2)} kN (${tipo})</span></p>`;
    });
    
    html += '</div>';
    
    html += '<div class="result-item">';
    html += '<h4>Desplazamientos Nodales</h4>';
    
    estructura.nodos.forEach((nodo, index) => {
        const esApoyo = estructura.apoyos.some(a => a.nodo === index);
        if (!esApoyo) {
            html += `<p>Nodo ${index}: 
                     <span class="result-value">δx = ${nodo.desplazamientoX.toFixed(4)} m, 
                     δy = ${nodo.desplazamientoY.toFixed(4)} m</span></p>`;
        }
    });
    
    html += '</div>';
    
    html += '<div class="result-item">';
    html += '<h4>Reacciones en los Apoyos</h4>';
    
    estructura.apoyos.forEach(apoyo => {
        const nodo = estructura.nodos[apoyo.nodo];
        let reaccionY = 0;
        
        estructura.cargas.forEach(carga => {
            reaccionY += Math.abs(carga.fy / 2);
        });
        
        html += `<p>Apoyo en Nodo ${apoyo.nodo} (${apoyo.tipo}): 
                 <span class="result-value">Ry = ${reaccionY.toFixed(2)} kN</span></p>`;
    });
    
    html += '</div>';
    
    contenidoDiv.innerHTML = html;
    resultadosDiv.style.display = 'block';
    
    // Scroll suave a resultados
    resultadosDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
