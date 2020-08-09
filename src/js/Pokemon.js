
//Creamos la clase Pokemon, en esta clase tendremos el indentificador del pokemon, el nombre, así como su imagen delantera y trasera

export default class Pokemon {
    constructor(datos_pokemon) {
        //Le pasamos por el constructor todos los datos del pokemon, de uno en particular
        this.nombre = datos_pokemon.name; //El nombre de este pokemon será el nombre del objeto que le pasemos por parametro en este caso dentro de datos_pokemon buscamos la variable name
        this.id = datos_pokemon.id; //Se busca dentro del objeto la variable 
        this.imagen_detras = datos_pokemon.sprites.back_default;
        this.imagen_delante = datos_pokemon.sprites.front_default;
    }

}