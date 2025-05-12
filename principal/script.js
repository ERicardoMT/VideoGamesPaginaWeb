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

// Cerrar popup al hacer clic en el botón de cerrar
document.getElementById('close-popup').addEventListener('click', closePopup);

// Mostrar anuncios emergentes cada cierto tiempo
function setupPopupAds() {
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
}

// Función para crear imágenes de ejemplo
function createPlaceholderImages() {
    // Crear imágenes para los artículos y juegos
    const images = {
        'logo.png': 'Virtual Level',
        'neon-bg.jpg': 'Fondo de neón',
        'hollow-knight.jpg': 'Hollow Knight Silksong',
        'gta6.jpg': 'GTA 6',
        'zelda.jpg': 'The Legend of Zelda',
        'tony-hawk.jpg': 'Tony Hawk Pro Skater 2',
        'gta4.jpg': 'GTA IV',
        'mario-galaxy.jpg': 'Super Mario Galaxy 2',
        'ad-image.jpg': 'Anuncio promocional'
    };
    
    // Crear elementos de imagen para precargar
    for (let src in images) {
        const img = new Image();
        img.src = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(images[src])}`;
        img.style.display = 'none';
        document.body.appendChild(img);
    }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    createPlaceholderImages();
    createNeonEffect();
    setupPopupAds();
    
    // Simular carga de contenido
    setTimeout(() => {
        document.querySelectorAll('img').forEach(img => {
            if (img.src.includes('placeholder.svg')) {
                // Reemplazar con una imagen de color sólido que coincida con el tema
                const text = img.src.split('text=')[1] || '';
                const color = img.src.includes('logo') ? '#0077ff' : 
                              img.src.includes('ad') ? '#ff3300' : '#222';
                
                img.src = `/placeholder.svg?height=${img.height || 300}&width=${img.width || 400}&text=${text}&background=${color.replace('#', '')}`;
            }
        });
    }, 500);
});