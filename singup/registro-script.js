document.addEventListener('DOMContentLoaded', function() {
    // Configurar el campo de fecha
    setupDateField();
    
    // Manejar el envío del formulario
    handleFormSubmit();
    
    // Configurar animación de fondo
    createNeonEffect();
});

function handleFormSubmit() {
    const form = document.querySelector('.registro-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const button = document.querySelector('.registro-button');
        const originalText = button.textContent;
        button.textContent = 'PROCESANDO...';
        button.disabled = true;
        
        // Obtener datos del formulario
        const formData = new FormData(form);
        const formDataObj = Object.fromEntries(formData.entries());
        
        // Validación del lado del cliente
        const validationError = validateFormData(formDataObj);
        if (validationError) {
            showErrorPopup(validationError);
            resetButton(button, originalText);
            return;
        }
        
        try {
            // Enviar datos al servidor
            const response = await fetch('registro.php', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Error en el registro');
            }
            
            // Mostrar mensaje de éxito con animación
            showSuccessPopup(
                '¡Registro exitoso!', 
                'Serás redirigido al login en 3 segundos',
                true,
                3000
            );
            
            // Redirección después del tiempo especificado
            setTimeout(() => {
                window.location.href = data.redirect || '../login/login.html';
            }, data.redirect_delay || 3000);
            
        } catch (error) {
            console.error('Error en el registro:', error);
            showErrorPopup(`Error: ${error.message}`);
        } finally {
            resetButton(button, originalText);
        }
    });
}

function validateFormData(data) {
    // Validación de campos requeridos
    if (!data.nombres || !data.apellidos || !data.fecha || 
        !data.correo || !data.usuario || !data.password) {
        return 'Todos los campos son obligatorios';
    }
    
    // Validación de usuario
    if (data.usuario.length < 4) return 'El usuario debe tener al menos 4 caracteres';
    if (data.usuario.length > 50) return 'El usuario no puede exceder los 50 caracteres';
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) return 'Por favor, introduce un correo electrónico válido';
    
    // Validación de contraseña
    if (data.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    
    // Validación de fecha (formato DD/MM/AAAA)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(data.fecha)) return 'El formato de fecha debe ser DD/MM/AAAA';
    
    // Validación adicional de fecha
    const [day, month, year] = data.fecha.split('/');
    if (!isValidDate(day, month, year)) {
        return 'La fecha ingresada no es válida';
    }
    
    return null;
}

function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() == year && 
           (date.getMonth() + 1) == month && 
           date.getDate() == day;
}

function setupDateField() {
    const fechaInput = document.getElementById('fecha');
    
    fechaInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        
        if (value.length > 4) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4);
        } else if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        
        e.target.value = value;
    });
    
    // Añadir máscara visual cuando el campo está vacío
    fechaInput.addEventListener('focus', function() {
        if (!this.value) {
            this.value = '  /  /    ';
            this.setSelectionRange(0, 0);
        }
    });
}

function resetButton(button, text) {
    button.textContent = text;
    button.disabled = false;
}

// Funciones para popups mejorados
function showSuccessPopup(title, message, autoClose = true, closeTime = 3000) {
    let popup = document.getElementById('popup-container');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popup-container';
        document.body.appendChild(popup);
    }
    
    popup.innerHTML = `
        <div class="popup-content success-popup">
            <div class="popup-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 class="popup-title">${title}</h3>
            <div class="popup-message">${message}</div>
            ${autoClose ? '<div class="popup-progress-bar"><div class="popup-progress"></div></div>' : ''}
        </div>
    `;
    
    popup.classList.add('active');
    
    // Animación de la barra de progreso si es autoClose
    if (autoClose) {
        const progressBar = popup.querySelector('.popup-progress');
        progressBar.style.animation = `progressAnimation ${closeTime/1000}s linear`;
    }
}

function showErrorPopup(message) {
    let popup = document.getElementById('popup-container');
    
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'popup-container';
        document.body.appendChild(popup);
    }
    
    popup.innerHTML = `
        <div class="popup-content error-popup">
            <div class="popup-icon">
                <i class="fas fa-exclamation-circle"></i>
            </div>
            <div class="popup-message">${message}</div>
            <button class="popup-close-btn">Cerrar</button>
        </div>
    `;
    
    popup.classList.add('active');
    popup.querySelector('.popup-close-btn').addEventListener('click', () => {
        popup.classList.remove('active');
    });
}

// Animación de fondo de neón (completa)
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
            color: getRandomNeonColor()
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
                line.color = getRandomNeonColor();
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Función para generar colores neón aleatorios
    function getRandomNeonColor() {
        const colors = [
            '#ff00ff', '#00ffff', '#ffff00', '#ff0077',
            '#00ff77', '#7700ff', '#ff7700', '#00ff00'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Redimensionar canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    animate();
}