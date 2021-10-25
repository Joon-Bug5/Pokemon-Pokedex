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
  return { // returns the information of once added.
    add: add,
    getAll: getAll
  };
})(); // IIFE is within local only ().
const Psyduck = { name: 'Psyduck', height: 0.8, type: 'Water' };
const Vulpix = { name: 'Vulpix', height: 0.6, type: 'Fire' };
const Ninetales = { name: 'Ninetales', height: 1.1, type: 'Fire' };
pokemonRepository.add(Psyduck);
pokemonRepository.add(Vulpix);
pokemonRepository.add(Ninetales);
// You can choose which line you are going to comment with CTRL /
// && (First False, Last Truth), || (First Truth, First False)
// for (let i = 0; i < pokemonList.length; i++) {
//   document.write('<br>' + '<p>' + ('<span>' + pokemonList[i].name + '</span>') + ' - (Height: ' + pokemonList[i].height + ' m)' + ' ' + '</p>'); // Can add HTML elements within JS.
//   if (pokemonList[i].height >= 2) {
//     document.write(' - "Wow, that\'s big!" ');
//   }
// }
// Below is a basic function that can be written similar to above code
pokemonRepository.getAll().forEach(function (pokemon) {
  document.write('<br>' + '<p>' + ('<span>' + pokemon.name + '</span>') + ' - (Height: ' + pokemon.height + ' m)' + ' ' + '</p>');
  if (pokemon.height >= 2) {
    document.write(' - "Wow, that\'s big!" ');
  }
});
