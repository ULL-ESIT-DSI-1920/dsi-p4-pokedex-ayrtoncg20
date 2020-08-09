import "regenerator-runtime/runtime";
import Pokemon from './Pokemon.js';

var array_pokemons = [];


function crear_pokedex() {

    const button = document.querySelector("#button");
    button.addEventListener("click", () => {
        document.querySelector('#pokedex').style.display = 'none';
        document.querySelector('#contenido').style.visibility = 'visible';
        obtenerPokemon()
        mostrar_pokemons();
    })


}


function insertar_pokemon(pokemon) {
    array_pokemons.push(pokemon);


}


const obtenerPokemon = async () => {

    for (var numero_pokemon = 1; numero_pokemon <= 151; numero_pokemon++) {
        fetch("https://pokeapi.co/api/v2/pokemon/" + numero_pokemon + "/")
            .then(data => data.json())
            .then(data => {
                const datos_pokemon = data;
                const pokemon = new Pokemon(datos_pokemon)
                insertar_pokemon(pokemon)
            })
    }


}


function mostrar_pokemons() {

    const pokedex = document.getElementById("contenido");

    for (var i = 0; i < array_pokemons.length; i++) {
        pokedex.innerHTML += `
                    <div class="fondo" style="background-color: grey; display: inline-block; align-items: center">
                    ${array_pokemons[i].nombre} ${array_pokemons[i].id}
                    <img src="${array_pokemons[i].imagen_detras}" class="detras">
                    <img src="${array_pokemons[i].imagen_delante}" class="delante" width=\"150px\" height=\"150px\">
                    </div>
                    `
    }

}

crear_pokedex()


