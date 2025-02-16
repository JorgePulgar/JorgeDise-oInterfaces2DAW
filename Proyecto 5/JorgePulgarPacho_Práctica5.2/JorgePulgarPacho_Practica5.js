// VARIABLES GOBLALES
var tutorialDisplayed = 0 // Variable para detectar si el tutorial está desplegado o no
var score = 0 // Puntuación
var isPlaying = false // Juego en marcha (true) o no (false) 
var hardGameMode = false // Variable para almacenar el modo de juego


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
    if (hardMode) {
        hardGameMode = true
    }
    document.getElementById('tutorial-container').style.display = 'none' // Con esto nos aseguramos de esconder siempre el tutorial, por si estaba desplegado
    tutorialDisplayed = 0 // Esto es para poner la variable a cero de nuevo, para que se pueda desplegar bien la próxima vez
    document.getElementById('game-container').style.display = 'block' //Esto hace que aparezca el área de juego
    score = 0 // Esto es para poner la puntuación a cero 
    document.getElementById('score').textContent = 'Puntuación: ' + score //Esto simplemente pone el score actual en el texto de html
    isPlaying = true // Actualizamos la variable de juego a true para que otras funciones sepan que el juego está en marcha
    spawnBubbles() // Aquí llamo a la función que genera las pompas
    //creamos una variable de duración para pasarla como parámetro a la función timer
    let duration = hardGameMode ? 20 : 10 // si el modo dificiñ es verdadero entonces la duración del juego serán 20 segundos, si no serán 10. El parámetro lo cogemos de la función de empezar el juego, que en el botón de html tiene false o true
    timer(duration)
}

// Función con una cuenta atrás y la duración del juego
function timer(duration) {
    let time = duration // Tiempo limíte en segundos dependiendo de la dificultad
    /* QUIZÁ PUEDO HACER QUE EL CONTADOR SE VEA PARA AÑADIR MÁS COSAS. CON UN innerHTML SE OUEDE HACER FÁCIL */
    // intervalo cada segundo
    let interval = setInterval(() => {
        time-- //cada vez que se activa el intervalo restamos 1 al tiempo de juego 
        if (time <= 0) { // cuando el tiempo de juego llega a 0 hacemos una llamada a endGame() y paramos el temporizador 
            clearInterval(interval)
            endGame()
        }
    }, 1000)
}

// Esta es la función que genera los divs en forma de círculo que tenemos que clicar. Si no fuera por google esto no lo habría conseguido yo sólo
function spawnBubbles() {
    /**
     * Esto es para parar la generación de pompas si la variable "isPlaying" es "false".
     * 
     * Según San Google cuando una función encuentra return, finaliza inmediatamente y no ejecuta nada 
     * después de esa línea. Por eso lo he usado así, funciona y es bastante simple. Aunque no sé si será
     * lo más correcto para finalizar una función.
     */
    if (!isPlaying) return
    
    /**
     * Aquí creo un elemento div y le doy clase para que funcione como burbuja y tenga estilos. Pensé en utilizar un div ya existente
     * y simplemente hacerlo visible y moverlo pero me parecía que no tenía tanto sentido. Así que busqué cómo hacerlo así, con create element
     * y classList.add para añadirle una clase.
     */
    let bubble = document.createElement('div');
    
    // Aquí genero una probabilidad de que la pompa sea roja
    let redProbability = hardGameMode ? 0.5 : 0.33
    let red = Math.random() < redProbability
    bubble.classList.add('bubble', red ? 'red-bubble': 'blue-bubble')

    // Posicionamos la burbuja de forma aleatoria usando Math.random. Viva Google.
    /**
     * Math.random genera un decimal entre 0 y 1, así que lo multiplico por 350 para tener un número aleatorio entre 0 y 350. 
     * Luego se lo añado a la variable que usaré para definir la latura a la que estará la pompa. Uso 350 porque sé que el div tiene
     * 400 píxeles de alto, así que aseguro que siempre esté dentro del mismo.
     */ 
    let y = Math.random() * 350  
    /**
     * Como el ancho del div del área de juego funciona con el 100% de la pantalla no puedo hacer el mismo cálculo que en la variable y.
     * Busqué como conseguir el área de la pantalla y descubrí que puedo usar window.innerWidth. El resto es igual que en el cálculo anterior.
     */
    let x = Math.random() * (window.innerWidth -50)

    // Aquí hago que los estilos "left" y "top" tengan los valores de las variables correspondientes.
    bubble.style.left = x + 'px';
    bubble.style.top = y + 'px';
    
    // Aquí uso appenChild para meter la burbuja en el game-container
    document.getElementById('game-container').appendChild(bubble)

    // Cuando se clica en una burbuja se llama a la función popBubble
    bubble.addEventListener('click', () => popBubble(bubble, red))

    // Este timeout sirve para borrar las pompas que lleven en pantalla más de 2 segundos, para que no se acumulen demasiado
    setTimeout(() => bubble.remove(), 2000)
    // Este timeout es para llamar a una burbuja nueva cada segundo
    setTimeout(spawnBubbles, 1000)
}

function popBubble(bubble, red) {
    if (red) {
        endGame()
    } else {
        score++ // Sumamos un punto al score
        document.getElementById('score').textContent = 'Puntuación: ' + score
        bubble.remove()
    }
}

// Función para parar el jueguito y mandar un mensaje. No hay mucho que explicar aquí, la verdad...
function endGame() {
    isPlaying = false;
    let message = score > 5 ? '¡Has ganado!' : 'Womp womp :_(. Has perdido...'
    document.getElementById('message').textContent = message
    document.getElementById('message').style.display = 'block'
}
