// VARIABLES GOBLALES
var tutorialDisplayed = 0 // Variable para detectar si el tutorial está desplegado o no
var score = 0 // Puntuación
var isPlaying = false // Juego en marcha (true) o no (false) 

// Función para enseñar u ocultar el tutorial
function tutorial() {
    if (!tutorialDisplayed) {
        document.getElementById('tutorial-container').style.display = 'flex'
        tutorialDisplayed = 1 
    } else {
        document.getElementById('tutorial-container').style.display = 'none'
        tutorialDisplayed = 0 
    }
    
}

// Función es para iniciar el juego
function startGame(hardMode) {
    document.getElementById('tutorial-container').style.display = 'none' // Con esto nos aseguramos de esconder siempre el tutorial, por si estaba desplegado
    tutorialDisplayed = 0 // Esto es para poner la variable a cero de nuevo, para que se pueda desplegar bien la próxima vez
    document.getElementById('game-container').style.display = 'block' //Esto hace que aparezca el área de juego
    score = 0 // Esto es para poner la puntuación a cero 
    document.getElementById('score').textContent = 'Puntuación: ' + score //Esto simplemente pone el score actual en el texto de html
    isPlaying = true // Actualizamos la variable de juego a true para que otras funciones sepan que el juego está en marcha
    
    
    spawnBubbles() 
    //creamos una variable de duración para pasarla como parámetro a la función timer
    let duration = hardMode ? 20 : 10 // si el modo dificiñ es verdadero entonces la duración del juego serán 20 segundos, si no serán 10. El parámetro lo cogemos de la función de empezar el juego, que en el botón de html tiene false o true
    timer(duration)
}

// Función con una cuenta atrás y la duración del juego
function timer(duration) {
    let time = duration // Tiempo limíte en segundos dependiendo de la dificultad

    // intervalo cada segundo
    let interval = setInterval(() => {
        time-- //cada vez que se activa el intervalo restamos 1 al tiempo de juego 
        if (time <= 0) { // cuando el tiempo de juego llega a 0 hacemos una llamada a endGame() y paramos el temporizador 
            clearInterval(interval)
            endGame()
        }
    }, 1000)
}

// Función para parar el jueguito y mandar un mensaje. No hay mucho que explicar aquí, la verdad...
function endGame() {
    isPlaying = false;
    let message = score > 5 ? '¡Has ganado!' : 'Womp womp :_(. Has perdido...'
    document.getElementById('message').textContent = message
    document.getElementById('message').style.display = 'block'
}
