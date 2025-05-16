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

// Función para manejar el login
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const button = document.querySelector('.login-button');
    
    button.disabled = true;
    button.textContent = 'VERIFICANDO...';
    
    try {
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success && result.redirect) {
            window.location.href = result.redirect;
        } else {
            alert(result.message || 'Error en el login');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    } finally {
        button.disabled = false;
        button.textContent = 'INGRESAR';
    }
}

// Inicialización cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Crear el efecto de neón
    createNeonEffect();
    
    // Asignar el manejador de eventos al formulario
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});
async function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const button = document.querySelector('.login-button');
    
    button.disabled = true;
    button.textContent = 'VERIFICANDO...';
    
    try {
        console.log('Enviando datos...');
        const response = await fetch('login.php', {
            method: 'POST',
            body: formData
        });
        
        console.log('Respuesta recibida');
        const result = await response.json();
        console.log('Resultado:', result);
        
        if (result.success && result.redirect) {
            console.log('Redireccionando a:', result.redirect);
            window.location.href = result.redirect;
        } else {
            alert(result.message || 'Error en el login');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    } finally {
        button.disabled = false;
        button.textContent = 'INGRESAR';
    }
}

