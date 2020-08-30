import 'regenerator-runtime/runtime' // declaramos runtime para las promesas
import Pokemon from './Pokemon.js' // Importamos la clase pokemon que es otro fichero

var array_pokemons = [] // declaramos un array de pokemon, cuando llamemos a cada pokemon lo vamos almacenando en este array

function crear_pokedex () { // Cremos una funcion crear pokedex que se encargara de cuando toquemos el boton quitar la pokedex y mostrar los pokemon
  const button = document.querySelector('#button') // Seleccionamos el elemento boton
  button.addEventListener('click', () => { // Si hay un evento de click
    document.querySelector('#pokedex').style.display = 'none' // La pokedex ponla a nula
    document.querySelector('#contenido').style.visibility = 'visible' // Pon el contenido a visible
    obtenerPokemon() // Llamamos a la función obtener pokemon
  })
}

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

function insertar_pokemon (pokemon) { // funcion insertar pokemon que se encargara de meter cada pokemon en el array creado al principio
  array_pokemons.push(pokemon)
}

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

crear_pokedex() // Llamamos a crear pokedex para inicializar toda la practica
