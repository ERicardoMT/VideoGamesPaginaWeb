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

// Función para manejar las acciones de las publicaciones
function setupPostActions() {
    // Botones de voto
    const upvoteButtons = document.querySelectorAll('.action-btn.upvote');
    const downvoteButtons = document.querySelectorAll('.action-btn.downvote');
    
    upvoteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Alternar clase activa
            this.classList.toggle('active');
            
            // Si se activa el upvote, desactivar el downvote correspondiente
            if (this.classList.contains('active')) {
                const downvoteBtn = this.parentElement.querySelector('.downvote');
                if (downvoteBtn.classList.contains('active')) {
                    downvoteBtn.classList.remove('active');
                }
                
                // Cambiar color al activar
                this.style.color = '#4CAF50';
            } else {
                // Restaurar color al desactivar
                this.style.color = '';
            }
        });
    });
    
    downvoteButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Alternar clase activa
            this.classList.toggle('active');
            
            // Si se activa el downvote, desactivar el upvote correspondiente
            if (this.classList.contains('active')) {
                const upvoteBtn = this.parentElement.querySelector('.upvote');
                if (upvoteBtn.classList.contains('active')) {
                    upvoteBtn.classList.remove('active');
                    upvoteBtn.style.color = '';
                }
                
                // Cambiar color al activar
                this.style.color = '#F44336';
            } else {
                // Restaurar color al desactivar
                this.style.color = '';
            }
        });
    });
    
    // Botones de comentario
    const commentButtons = document.querySelectorAll('.action-btn.comment');
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Función de comentarios no disponible en esta demostración');
        });
    });
    
    // Botones de compartir
    const shareButtons = document.querySelectorAll('.action-btn.share');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Función de compartir no disponible en esta demostración');
        });
    });
    
    // Reproducción de video
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            alert('Reproducción de video no disponible en esta demostración');
        });
    });
}

// Función para manejar la creación de nuevas publicaciones
function setupNewPost() {
    const newPostForm = document.querySelector('.new-post');
    const submitButton = newPostForm.querySelector('.post-submit-btn');
    const textarea = newPostForm.querySelector('textarea');
    
    submitButton.addEventListener('click', function() {
        if (textarea.value.trim() === '') {
            alert('Por favor, escribe algo antes de publicar.');
            return;
        }
        
        // Simular publicación
        alert('Tu publicación ha sido enviada.');
        textarea.value = '';
    });
    
    // Botones de medios
    const mediaButtons = document.querySelectorAll('.post-media-btn');
    mediaButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Función de adjuntar medios no disponible en esta demostración');
        });
    });
}


// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    createPlaceholderImages();
    createNeonEffect();
    setupPopupAds();
    setupChat();
    setupPostActions();
    setupNewPost();
});