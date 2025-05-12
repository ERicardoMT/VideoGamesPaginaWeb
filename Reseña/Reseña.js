// Función para mostrar anuncios emergentes
function showPopup() {
    const popup = document.getElementById('popup-container');
    popup.classList.remove('popup-hidden');
    popup.classList.add('popup-visible');
}

// Función para cerrar anuncios emergentes
function closePopup() {
    const popup = document.getElementById('popup-container');
    popup.classList.remove('popup-visible');
    popup.classList.add('popup-hidden');
}

// Mostrar anuncios emergentes cada cierto tiempo
function setupPopupAds() {
    // Cerrar popup al hacer clic en el botón de cerrar
    const closeButton = document.getElementById('close-popup');
    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }

    // Mostrar el primer anuncio después de 10 segundos
    setTimeout(showPopup, 10000);
    
    // Configurar anuncios periódicos (cada 60 segundos)
    setInterval(() => {
        // Mostrar anuncio
        showPopup();
        
        // Ocultar anuncio después de 8 segundos
        setTimeout(closePopup, 8000);
    }, 60000);
}

// Función para crear efecto de neón en el fondo
function createNeonEffect() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
    
    document.body.appendChild(canvas);
    
    const lines = [];
    const lineCount = 20;
    
    // Crear líneas de neón
    for (let i = 0; i < lineCount; i++) {
        lines.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 100 + 50,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.5 + 0.1,
            thickness: Math.random() * 3 + 1,
            color: '#0077ff'
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let line of lines) {
            ctx.beginPath();
            ctx.moveTo(line.x, line.y);
            const endX = line.x + Math.cos(line.angle) * line.length;
            const endY = line.y + Math.sin(line.angle) * line.length;
            ctx.lineTo(endX, endY);
            
            ctx.strokeStyle = line.color;
            ctx.lineWidth = line.thickness;
            ctx.shadowBlur = 15;
            ctx.shadowColor = line.color;
            ctx.stroke();
            
            // Mover la línea
            line.x += Math.cos(line.angle) * line.speed;
            line.y += Math.sin(line.angle) * line.speed;
            
            // Si la línea sale de la pantalla, reiniciarla
            if (line.x < -line.length || line.x > canvas.width + line.length || 
                line.y < -line.length || line.y > canvas.height + line.length) {
                line.x = Math.random() * canvas.width;
                line.y = Math.random() * canvas.height;
                line.angle = Math.random() * Math.PI * 2;
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    // Ajustar el tamaño del canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Función para crear imágenes de ejemplo
function createPlaceholderImages() {
    // Crear imágenes para los artículos y juegos
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.src || img.src.includes('placeholder.svg')) {
            // Asegurarse de que la imagen tenga un texto alternativo
            const alt = img.alt || 'Imagen';
            const width = img.width || 300;
            const height = img.height || 200;
            
            // Crear URL para la imagen de marcador de posición
            img.src = `https://via.placeholder.com/${width}x${height}/222222/0077ff?text=${encodeURIComponent(alt)}`;
        }
    });
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    createPlaceholderImages();
    createNeonEffect();
    setupPopupAds();
    
    // Añadir interactividad a los botones de paginación
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase activa de todos los botones
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir la clase activa al botón clickeado
            button.classList.add('active');
        });
    });
    
    // Añadir interactividad a los botones de "Leer más"
    const readMoreButtons = document.querySelectorAll('.read-more-btn, .read-more-btn-small');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('Esta funcionalidad estará disponible próximamente.');
        });
    });
    
    // Añadir interactividad a los filtros
    const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            // Aquí iría la lógica para filtrar las reseñas
            console.log(`Filtro ${checkbox.id} ${checkbox.checked ? 'activado' : 'desactivado'}`);
        });
    });
});