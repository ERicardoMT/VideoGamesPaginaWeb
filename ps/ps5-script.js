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

// Función para manejar las tarjetas de juegos
function setupGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        // Botón de ver detalles
        const viewBtn = card.querySelector('.view-btn');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const gameTitle = card.querySelector('h3').textContent;
                alert(`Ver detalles de: ${gameTitle}`);
            });
        }
        
        // Clic en la tarjeta completa
        card.addEventListener('click', () => {
            const gameTitle = card.querySelector('h3').textContent;
            alert(`Has seleccionado: ${gameTitle}`);
        });
    });
}

// Función para manejar la paginación
function setupPagination() {
    const pageLinks = document.querySelectorAll('.page-link');
    
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Quitar clase activa de todos los enlaces
            pageLinks.forEach(l => l.classList.remove('active'));
            
            // Añadir clase activa al enlace clicado
            if (!link.classList.contains('next')) {
                link.classList.add('active');
            }
            
            // Simular cambio de página
            alert(`Cambiando a la página: ${link.textContent}`);
        });
    });
}

// Función para manejar los géneros
function setupGenres() {
    const genreItems = document.querySelectorAll('.genre-list li');
    
    genreItems.forEach(item => {
        item.addEventListener('click', () => {
            const genreName = item.textContent.split('-')[1].trim();
            alert(`Filtrar por género: ${genreName}`);
        });
    });
}

// Función para manejar los juegos reseñados
function setupReviewedGames() {
    const reviewedGames = document.querySelectorAll('.reviewed-game');
    
    reviewedGames.forEach(game => {
        game.addEventListener('click', () => {
            const gameTitle = game.querySelector('.review-title').textContent;
            alert(`Ver reseña de: ${gameTitle}`);
        });
    });
}


// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    createPlaceholderImages();
    createNeonEffect();
    setupPopupAds();
    setupChat();
    setupGameCards();
    setupPagination();
    setupGenres();
    setupReviewedGames();
});