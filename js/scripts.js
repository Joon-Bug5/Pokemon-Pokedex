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
  { name: 'Eevee', height: 0.3, type: 'Normal' }
];
// You can choose which line you are going to comment with CTRL /
// && (First False, Last Truth), || (First Truth, First False)
for (let list = 0; list < pokemonList.length; list++){
  document.write(pokemonList[list].name + '- (Height: ' +pokemonList[list].height + ' m),' + ' ');
}
