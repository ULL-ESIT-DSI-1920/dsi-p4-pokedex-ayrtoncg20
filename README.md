### Práctica 4: Pokedex

# Práctica

Necesitamos crear una PokeDex para mostrar un listado de los 151 pokémon de primera generación. Para ello, podemos utilizar la API gratuita PokeAPI. Dicho servicio pone a nuestra disposición una API que al realizar la petición https://pokeapi.co/api/v2/pokemon/1/ nos muestra información del pokémon número 1, que entre otras cosas que puedes profundizar en su documentación, nos devuelve un JSON con la siguiente información:

```
{
   abilities: [],     // Array de objetos con las habilidades del pokémon
   height: Integer,   // Altura del pokémon
   weigth: Integer,   // Peso del pokémon
   id: Integer,       // Número del pokémon en la pokedex
   moves: [],         // Movimientos del pokémon
   sprites: {},       // Imágenes del pokémon (frontal, trasera, shiny, etc...)
   stats: [],         // Estadísticas del pokémon
   types: [],         // Tipos del pokémon
   ...
}
```

Nuestro objetivo es realizar lo siguiente:

- Crea una página donde se muestren todos los pokémon de la primera generación en un elemento HTML, donde en su interior aparezca la imagen del mismo, su ID y su nombre. Utiliza PostCSS para darle estilos y adaptarlos para que parezca una tarjeta o carta.

- Modifica el ejemplo de modo que todos los pokemon se vean de espaldas y cuando pases el ratón por encima de ellos, se muestren de frente. ¿Serías capaz también de conseguir aumentar su tamaño mediante CSS? ¿Que propiedad tendrías que utilizar? ¿Encuentras alguna forma de mantener el pixelado de la imagen sin que se vea borrosa?

- La forma más fácil de hacer los puntos anteriores es utilizar los recursos de forma local o teniendo un JSON en local con toda la información. Sin embargo, la idea de esta práctica es obtener la información desde la API de PokéAPI realizando peticiones desde Javascript y obteniendo la información necesaria. Asegúrate que lo estás haciendo así y comprueba que el orden de los pokémon es el correcto (ordenados, de menor a mayor). Pista: Las promesas y Promise.all() podría ayudarte.

NOTA: Ten en cuenta que la API de PokéAPI tiene un límite de 100 peticiones por IP al minuto (sin incluir las imágenes). Este es un caso didáctico para aprender a trabajar con promesas. Un buen criterio en el caso de que querer hacer algo real para poner en producción, podría ser almacenar la información en el localStorage del navegador (o en una base de datos en backend) y extraer los datos de allí, para no sobrepasar el límite de la API. De esta forma estaríamos usando esa capa como caché y las obtenemos de ahí si ya existen, evitando volver a hacer peticiones innecesarias.

Criterios importantes

- Mostrar cartas visuales con información
- Cambio visual del sprite (imagen) de espaldas al sprite de frente
- Obtención de información mediante la API PokéAPI
- ¿Los pokémon salen siempre en orden creciente?
- Mejoras o funcionalidades extra

Retos

- Busca plugins de PostCSS que consideres interesantes y documentalos en el README.md con un enlace a su GitHub y una breve descripción de lo que hacen y para que podría serte útil.
- Digital Clock: Reto fácil. Implementa un reloj digital que muestre la hora actual. Para conseguir el relleno izquierdo de los ceros, investiga el método .padStart().
- Analogic Clock: Reto difícil. Implementa un reloj analógico que muestre la hora real · Previsualización

### Comenzando 

Antes que nada para poder comenzar la práctica lo primero que tenemos que hacer al crear el directorio de trabajo es hacer un:

```
$ npm init
```
Para iniciar un repositorio. Dentro de la carpeta tenemos que hacer:

```
$ git remote add origin <ruta_ssh>
```

A continuación creamos el package.json

```
$ npm init -y 
```

Por último instalamos parcel de manera local:

```
$ npm install -D parcel-bundler
```

Lo primero que tenemos que hacer es crear la jerarquía de la práctica, para ello creamos todos los directorios. 

```
src
  assets
  css
   index.css
  js
   index.js
   Pokemon.js
  index.html
```

Comenzamos con el código y nos dirigimos al index.html para explicarlo:

En este fichero creamos una primpera parte para mostrar una especie de pokedex con la que podemos interactuar para después ver la lista de pokemon que tiene esa pokedex. Para ello declaramos un div pokedex donde tenemos unas imagenes y un boton el cual el usuario va a pulsar para ver todos los pokemon que hay. 

```
 <div id="pokedex">
        <!--Creamos un div para tener una especie de pokedex donde tendremos un boton para poder ver todos los pokemon-->
        <img
            src="https://images.wikidexcdn.net/mwuploads/esssbwiki/thumb/7/77/latest/20111028181540/TituloUniversoPok%C3%A9mon.png/550px-TituloUniversoPok%C3%A9mon.png">
        <div class="container my-5 text-center">
            <button class="btn btn-warning" id="button">Pokedex</button>
            <img
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/62902855-31e8-48de-986e-5080e8ef5f15/d5uxsvu-cbf56dfe-0c82-40f9-928b-1e756acf0236.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNjI5MDI4NTUtMzFlOC00OGRlLTk4NmUtNTA4MGU4ZWY1ZjE1XC9kNXV4c3Z1LWNiZjU2ZGZlLTBjODItNDBmOS05MjhiLTFlNzU2YWNmMDIzNi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.2zLsxmr6hCqcUNfeDQCmgJ4MXZ6OA-oU_kWdoX6C4-A">
        </div>
    </div>
 ```
 Después he declarado un div contenido que es donde vamos a añadir todos nuestros pokemons con javascript.
 
 En la siguiente imagen podemos ver el index.html
![uno](imagenes/index.html.png)

Ahora nos dirigimos al index.js.

Dentro del index.js tenemos que declarar:

```
import 'regenerator-runtime/runtime'
import Pokemon from './Pokemon.js
```

Declaramos runtime para que las promesas no fallen y tambien tenemos que importar la clase pokemon para poder crear objetos tipo pokemos mas adelante.

```
var array_pokemons = []
```

Creamos un array de pokemon, contendrá todos los pokemon de la pokedex. 

Comenzamos ahora con las funciones, la primera función que nos encontramos en la de crear pokedex:

```
function crear_pokedex () { // Cremos una funcion crear pokedex que se encargara de cuando toquemos el boton quitar la pokedex y mostrar los pokemon
  const button = document.querySelector('#button') // Seleccionamos el elemento boton
  button.addEventListener('click', () => { // Si hay un evento de click
    document.querySelector('#pokedex').style.display = 'none' // La pokedex ponla a nula
    document.querySelector('#contenido').style.visibility = 'visible' // Pon el contenido a visible
    obtenerPokemon() // Llamamos a la función obtener pokemon
  })
}
```

En esta función utilizamos javascript para coger el boton creado en el html, creamos una constante llamada button. Le añadimos un evento click a esa constante, cuando el usuario haga click en el boton entonces, la pokedex se dejará de ver y se empezará a ver el contenido de la pokedex que son los pokemons, por último dentro de esta función llamamos a obtenerPokemon().

A continuación vamos a ver la función obtener pokemon:

```
const obtenerPokemon = async () => { // Tenemos que utilizar promesas por lo que declaramos un async
  for (var numero_pokemon = 1; numero_pokemon <= 151; numero_pokemon++) { // Recorremos el numero de pokemon que tenemos
    await fetch('https://pokeapi.co/api/v2/pokemon/' + numero_pokemon + '/') // Hacemos una promesa para que nos devuelva cada pokemon
      .then(data => data.json()) // Guardamos en data el json de los datos del pokemon
      .then(data => {
        const datos_pokemon = data // Guardamos en datos pokemon el json de los datos del pokemon guardado en data gracias a las promesas
        const pokemon = new Pokemon(datos_pokemon) // Creamos un nuevo pokemon con los datos del mismo
        insertar_pokemon(pokemon) // Llamamos a insertar pokemon que se encargara de insertar los pokemon en el array
      })
  }
  await mostrar_pokemons() // Esperamos y cuando se haya realizado todo llamamos a la funcion mostrar pokemon
}
```

Dentro de esta función utilizamos las promesas, por ello declaramos la función como asíncrona. Declaramos un for para poder llamar a todos los pokemon con la promesa fetch y la url mas el numero del pokemon. Dentro de la promesa el json del pokemon se guarda en data por lo que nosotros hemos creado una constante llamada datos_pokemon donde guardamos el json del pokemon. A continuacion creamos un objeto tipo pokemon y le pasamos la constante datos pokemon. Vamos a ver que tiene la clase Pokemon:

```

export default class Pokemon {
  constructor (datos_pokemon) {
    // Le pasamos por el constructor todos los datos del pokemon, de uno en particular
    this.nombre = datos_pokemon.name // El nombre de este pokemon será el nombre del objeto que le pasemos por parametro en este caso dentro de datos_pokemon buscamos la variable name
    this.id = datos_pokemon.id // Se busca dentro del objeto la variable id
    this.imagen_detras = datos_pokemon.sprites.back_default // Guardamos la imagen de detras
    this.imagen_delante = datos_pokemon.sprites.front_default // guardamos la imagen de delante
  }
}
```
Dentro de la clase pokemon tenemos un constructor que recibe los datos del pokemon por paramentro y una serie de propiedades, el id, el nombre, la imagen delantera y la imagen trasera, los datos necesarios de cada pokemon. 

![cuatro](imagenes/pokemon.js.png)

Por último, volvemos a la clase obtenerPokemon y llamamos a la función insertar pokemon y le pasamos el objeto creado anteriormente.

```
function insertar_pokemon (pokemon) { // funcion insertar pokemon que se encargara de meter cada pokemon en el array creado al principio
  array_pokemons.push(pokemon)
}
```
Dentro de esta función lo que hacemos es meter el objeto de ese pokemon dentro del array creado al principio para todos los pokemon. 

Una vez se sale del for, utilizamos await para experar a que haga lo anterior y una vez hecho, llamamos a la función mostrar pokemons que tambien es de tipo asíncrono. 

```
const mostrar_pokemons = async () => { // Tenemos la funcion mostrar pokemon
  const pokedex = document.getElementById('contenido') // creamos una constante pokedex con el elemento contenido

  for (var i = 0; i < array_pokemons.length; i++) { // Recorremos todo el array de los pokemon, utilizamos innetHTML para meter un div carta con las imagenes y los datos del pokemon
    pokedex.innerHTML += `
                    <div class="carta">
                        <img src="${array_pokemons[i].imagen_detras}">
                        <img src="${array_pokemons[i].imagen_delante}" class="delante"><br>
                        ${array_pokemons[i].id} ${array_pokemons[i].nombre} 
                    </div>
                    `
  }
}
```
Dentro de esta función llamamos al id contenido que es el div que creamos en el index.html. Declaramos un for que recorre todo el array de pokemon y metemos con innetHTMl a contenido(pokedex) un div que es la carta con las imagenes el identificador del pokemon y el nombre del pokemon.

Por ultimo:
```
crear_pokedex()
```
Llamamos a la función crear pokedex, para poner todo en funcionamiento.

![dos](imagenes/index_js1.png)
![tres](imagenes/index_js2.png)

Vamos a comentar que hemos utilizado postcss para mejorar el css. 

```
.carta{
    border-radius: 2%;
    background-color: #B5B5B5; 
    display: inline-block; 
    align-items: center;
    position: relative;
    margin-top: 10px;
    text-align: center;
    width: 200px;
    height: 200px;   
    align-items: center;    
    font-weight: bold;
    border-width: 3px;
    border-style: solid;
    border-color: #7E7E7E;

    img {
        width: 150px;
        height: 150px;
    }

    .delante {
        display: none;
    }
    
    &:hover img {
        display: none;
    }

    &:hover .delante {
        display: inline-block;
        animation: redimensionar 3s infinite;
    }


}
```

Para poder redimensaionar las imagenes hemos utilizado animation: redimensionar 3s infinite, esto llama a una "función" redimensarionar:

```
@keyframes redimensionar {
    0% {
      transform: scale(1);
    }
  
    100% {
      transform: scale(1.3);
    }
  }
  ```
  
  Transforma la escala de la imagen.
  
  En las siguientes imágenes podemos observar el código css.


![cinco](imagenes/css1.png)
![seis](imagenes/css2.png)



### ¿Qué es PostCss?

Es “una herramienta para transformar CSS con plugins de Javascript”

### RETOS

1. Busca plugins de PostCSS que consideres interesantes y documentalos en el README.md con un enlace a su GitHub y una breve descripción de lo que hacen y para que podría serte útil.

# CSSNext

- CSS Next te permite usar la sintaxis más actualizada de CSS en sitios web que estás desarrollando. Como debes saber la W3C, comunidad encargada de regular los estándares usados en la web, publica nuevas reglas para CSS que permiten a los desarrolladores agilizar su proceso de trabajo. Sin embargo, estas nuevas reglas todavía no han sido implementadas en las últimas versiones de los navegadores más populares. Es aquí cuando CSS Next entra en acción y te permite hacer uso de esta nueva sintaxis sin comprometer el funcionamiento de tus sitios.


URL Github Pages: https://ull-esit-dsi-1920.github.io/dsi-p4-pokedex-ayrtoncg20/



