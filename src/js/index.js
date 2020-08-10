import "regenerator-runtime/runtime";
import Pokemon from './Pokemon.js';

var array_pokemons = [];


function crear_pokedex() {

    const button = document.querySelector("#button");
    button.addEventListener("click", () => {
        document.querySelector('#pokedex').style.display = 'none';
        document.querySelector('#contenido').style.visibility = 'visible';
        obtenerPokemon()
    })


}

const obtenerPokemon = async () => {

    for (var numero_pokemon = 1; numero_pokemon <= 151; numero_pokemon++) {
        await fetch("https://pokeapi.co/api/v2/pokemon/" + numero_pokemon + "/")
            .then(data => data.json())
            .then(data => {
                const datos_pokemon = data;
                const pokemon = new Pokemon(datos_pokemon)
                insertar_pokemon(pokemon)
            })

    }
    await mostrar_pokemons()

}

function insertar_pokemon(pokemon) {
    array_pokemons.push(pokemon);


}

const mostrar_pokemons = async () => {

    const pokedex = document.getElementById("contenido");

    for (var i = 0; i < array_pokemons.length; i++) {
        pokedex.innerHTML += `
                    <div class="carta">
                        ${array_pokemons[i].id} ${array_pokemons[i].nombre} 
                        <img src="${array_pokemons[i].imagen_detras}">
                        <img src="${array_pokemons[i].imagen_delante}" class="delante">
                    </div>
                    `
    }

}

crear_pokedex()
