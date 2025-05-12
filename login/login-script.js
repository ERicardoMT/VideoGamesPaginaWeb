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
    const lineCount = 30; // Más líneas para un efecto más denso
    
    // Crear líneas de neón
    for (let i = 0; i < lineCount; i++) {
        lines.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            length: Math.random() * 150 + 50,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.3 + 0.1,
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

// Función para manejar el envío del formulario
function handleFormSubmit() {
    const form = document.querySelector('.login-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        
        // Aquí normalmente enviarías los datos al servidor
        console.log('Intento de inicio de sesión:', {
            username,
            password: '********', // No mostrar la contraseña real
            remember
        });
        
        // Simulación de inicio de sesión
        if (username && password) {
            // Mostrar animación de carga
            const button = document.querySelector('.login-button');
            const originalText = button.textContent;
            button.textContent = 'CARGANDO...';
            button.disabled = true;
            
            // Simular tiempo de procesamiento
            setTimeout(() => {
                // Redirigir a la página principal (en una aplicación real)
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Mostrar mensaje de error
            alert('Por favor, completa todos los campos.');
        }
    });
}

// Función para crear el logo

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    createNeonEffect();
    handleFormSubmit();
    createLogo();
    
    // Añadir efecto de enfoque a los campos de entrada
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.boxShadow = '0 0 0 2px #0077ff, 0 0 15px #0077ff';
        });
        
        input.addEventListener('blur', () => {
            input.style.boxShadow = '';
        });
    });
});