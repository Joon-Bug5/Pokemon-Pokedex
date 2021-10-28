let pokemonRepository = (function () {
  let pokemonList = [ // Use solid braces for arrays. !!!! Use LET if variable will change, or CONST if variable will not change
    { name: 'Bulbasaur', height: 0.7, type: ['Grass', 'Poison'] }, // Curly braces are for objects (unordered list of data).
    { name: 'Charmander', height: 0.6, type: 'Fire' }, // Use single quotes for string and number has no quotes.
    { name: 'Squirtle', height: 0.5, type: 'Water' },
    { name: 'Pikachu', height: 0.4, type: 'Electric' },
    { name: 'Articuno', height: 1.7, type: ['Ice', 'Flying'] }, // Using solid braces within the curly braces due to separate arrays.
    { name: 'Zapdos', height: 1.6, type: ['Electric', 'Flying'] },
    { name: 'Moltres', height: 2, type: ['Fire', 'Flying'] },
    { name: 'Mew', height: 0.4, type: 'Psychic' },
    { name: 'Mewtwo', height: 2, type: 'Psychic' },
    { name: 'Eevee', height: 0.3, type: 'Normal' }];

  function add (pokemon) { // adding to the last list of the array
    pokemonList.push(pokemon);
  }

  function getAll () { // calls out the whole list of the array
    return pokemonList;
  }

  function addListItem (pokemon) {
    let mainPokemon = document.querySelector('.pokemon-list');// selecting the class in the HTML, need '' quotes and . to choose the class same as CSS
    let listPokemon = document.createElement('li'); // creates the list element
    let button = document.createElement('button'); // creates the button element
    button.innerText = pokemon.name; // name of the button in the inner text of the button
    button.classList.add('button-class'); // adding the class, which then you can create the style of the button on class
    listPokemon.appendChild(button);// showing the list as a button that was just created
    mainPokemon.appendChild(listPokemon);// showing the list in the class of the selector
    pokemonDetails(button, pokemon);
  }

  function pokemonDetails (button, pokemon) {
    button = button.addEventListener('click', function () {
      showDetails(pokemon);
    })
  }

  function showDetails (pokemon) {
    console.log(pokemon.name);
  }

  return { // returns the information of once added.
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})(); // IIFE is within local only ().

const Psyduck = { name: 'Psyduck', height: 0.8, type: 'Water' };
const Vulpix = { name: 'Vulpix', height: 0.6, type: 'Fire' };
const Ninetales = { name: 'Ninetales', height: 1.1, type: 'Fire' };
pokemonRepository.add(Psyduck);
pokemonRepository.add(Vulpix);
pokemonRepository.add(Ninetales);

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
