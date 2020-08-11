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

[uno](imagenes/index_html.png)
[dos](imagenes/index_js1.png)
[tres](imagenes/index_js2.png)
[cuatro](imagenes/pokemon.js.png)







