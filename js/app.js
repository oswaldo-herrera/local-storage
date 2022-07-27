//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];



//event listeners
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el docmumento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [] ;

        console.log(tweets);

        crearHTML();
    })
}

//funciones

function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    //console.log(tweet)

    //validacion...
    if(tweet === ''){
        mostrarError('Un mensjae no puede ir vacio');
        return; //evita que se ejecuten mas lineas de codigo( esto para el ciclo del ('no puede ir vacio') )
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //añadir al arreglo de tweets
    tweets = [...tweets,tweetObj];
    
    
    //una vez agregado vamos a crear el html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
    

    
}

//mostar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    
    //elimina la alerta despues de 3seg
    setTimeout(() => {
        mensajeError.remove();
    },3000);
}
//muestra un listado de los tweet
function crearHTML() {
    
    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach(tweet => {

            //agregar boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crear el html
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tweet.tweet;

            //asignar el boton
            li.appendChild(btnEliminar);

            //insertarlo en el html
            listaTweets.appendChild(li);
        });
    }  
    
    sincronizarStorage();
}

//agregar los tweets actuales a local storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);

    crearHTML();
}

//limpiar html
function limpiarHTML() {
    while( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

