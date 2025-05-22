<?php

session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header('Location: ../login/login.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Virtual Level - Noticias de Videojuegos</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
    <header>
        <div class="logo-container">
            <img src="../imagenes/logo.png"  class="logo">
        </div>
        <nav>
            <ul class="menu">
                <li><a href="../groups/comunidades.html"><i class="fas fa-newspaper"></i> COMUNIDAD</a></li>
                <li><a href="../Reseña/Reseñas.html"><i class="fas fa-gamepad"></i> RESEÑADS</a></li>
                <li class="dropdown">
                    <a href="#"><i class="fas fa-tv"></i> CONSOLAS</a>
                    <div class="dropdown-content">
                        <a href="../ps/ps5-catalog.html">Playstation</a>
                        <a href="../xbox/xbox-catalogo.html">Xbox</a>
                        <a href="../nintendo/nint-catalog.html">Nintendo</a>
                        <a href="../pc/pc-catalog.html">PC</a>
                    </div>
                </li>
                <li><a href="../login/login.html" class="login-btn"><i class="fas fa-user-circle"></i> LOG IN / SING UP</a></li>
            </ul>
        </nav>
        <div class="search-container">
            <input type="text" placeholder="Buscar" class="search-input">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        </div>
    </header>

    <div class="content-wrapper">
        <main>
            <article class="featured-article">
                <div class="article-image">
                    <img src="../imagenes/silksong.jpg" alt="Hollow Knight Silksong">
                </div>
                <div class="article-content">
                    <h2>¿Cuando saldra hollow Knight silksong?</h2>
                    <p>¿Quieres saber cuándo sale el juego a la venta? Aquí podrás encontrar la fecha de lanzamiento oficial en México de Hollow Knight: Silksong en PC, Switch, PS5, Xbox Series X, PS4, Xbox One, desarrollado por Team Cherry. Estate atento y reserva Hollow Knight: Silksong antes de que esté disponible en tiendas.</p>
                </div>
            </article>

            <article class="featured-article">
                    <div class="article-image">
                        <a href="../guias/zelda-guide.html">
                            <img src="../imagenes/zelda.jpg" alt="Guía The Legend of Zelda: Ocarina of Time 3D">
                        </a>
                    </div>
                    <div class="article-content">
                        <h2>¿Conoces todos los secretos de The Legend of Zelda: Ocarina of Time 3D?</h2>
                        <p>¿Has visto The Legend of Zelda: Ocarina of Time 3D? Aquí encontrarás toda la guía completa para entender todos los secretos de esta aclamada entrega de la serie Zelda.</p>
                    </div>
                </a>
            </article>

            <article class="featured-article">
                <div class="article-image">
                    <img src="../imagenes/gta6.jpg" alt="GTA 6">
                </div>
                <div class="article-content">
                    <h2>El juego mas esperado del año</h2>
                    <p>GTA 6 se ha convertido en el videojuego más esperado de este 2025, ante la falta de información de este título, han comenzado a existir varios rumores alrededor de esta nueva entrega y uno de los más recientes ha señalado que el juego podría haber mostrado algunos nuevos avances y mejores en el Grand Theft Auto 5. Esto ha sido señalado por un canal de Youtube muy apoyado por los consumidores.</p>
                </div>
            </article>
        </main>

        <aside>
            <div class="sidebar-title">
                <h3>MEJORES JUEGOS RESEÑADOS</h3>
            </div>
            <div class="game-card">
                <img src="imagenes/zelda.jpg" alt="The Legend of Zelda: Ocarina of Time">
                <h4>The Legend of Zelda: Ocarina of Time</h4>
            </div>
            <div class="game-card">
                <img src="tony-hawk.jpg" alt="Tony Hawk's Pro Skater 2">
                <h4>Tony Hawk's Pro Skater 2</h4>
            </div>
            <div class="game-card">
                <img src="gta4.jpg" alt="Grand Theft Auto IV">
                <h4>Grand Theft Auto IV</h4>
            </div>
            <div class="game-card">
                <img src="mario-galaxy.jpg" alt="Super Mario Galaxy 2">
                <h4>Super Mario Galaxy 2</h4>
            </div>
        </aside>
    </div>

    <div id="popup-container" class="popup-hidden">
        <div class="popup-header">
            <span class="popup-title">¡Oferta Especial!</span>
            <button id="close-popup" class="close-btn">&times;</button>
        </div>
        <div class="popup-content">
            <img src="ad-image.jpg" alt="Promoción" class="popup-image">
            <p>¡50% de descuento en juegos seleccionados!</p>
            <button class="popup-btn">Ver Ofertas</button>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>