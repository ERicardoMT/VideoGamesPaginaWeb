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

// Función para manejar el chat
function setupChat() {
    const chatBubble = document.querySelector('.chat-bubble');
    
    chatBubble.addEventListener('click', () => {
        alert('Función de chat no disponible en esta demostración');
    });
}


// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    createPlaceholderImages();
    createNeonEffect();
    setupPopupAds();
    setupChat();
    
    // Simular carga de contenido
    setTimeout(() => {
        // Logo principal
        document.querySelector('.logo').src = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/info5.PNG-c3h9qU7XqciNZLzJvNmLdNtaItXxPQ.png';
        
        // Logos de comunidades
        const playstationLogo = document.querySelectorAll('.community-logo img')[0];
        if (playstationLogo) {
            playstationLogo.src = `/placeholder.svg?height=80&width=80&text=PlayStation&background=003087`;
        }
        
        const nintendoLogo = document.querySelectorAll('.community-logo img')[1];
        if (nintendoLogo) {
            nintendoLogo.src = `/placeholder.svg?height=80&width=80&text=Nintendo&background=e60012`;
        }
        
        const xboxLogo = document.querySelectorAll('.community-logo img')[2];
        if (xboxLogo) {
            xboxLogo.src = `/placeholder.svg?height=80&width=80&text=Xbox&background=107c10`;
        }
        
        const marvelLogo = document.querySelectorAll('.community-logo img')[3];
        if (marvelLogo) {
            marvelLogo.src = `/placeholder.svg?height=80&width=80&text=Marvel&background=ed1d24`;
        }
        
        // Anuncio de LoL
        const lolAd = document.querySelector('.ad-image');
        if (lolAd) {
            lolAd.src = `/placeholder.svg?height=600&width=300&text=League%20of%20Legends&background=091428`;
        }
    }, 500);
    
    // Añadir interactividad a las tarjetas de comunidad
    const communityCards = document.querySelectorAll('.community-card');
    communityCards.forEach(card => {
        card.addEventListener('click', () => {
            // En una aplicación real, esto llevaría a la página de la comunidad
            const communityName = card.querySelector('.community-name').textContent;
            alert(`Has seleccionado la comunidad: ${communityName}`);
        });
        
        // Hacer que las tarjetas sean interactivas
        card.style.cursor = 'pointer';
    });
});