let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add (pokemon) { // adding to the last list of the array
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }
  
  function getAll () { // calls out the whole list of the array
    return pokemonList;
  }

  function addListItem (pokemon) {
    let mainPokemon = document.querySelector('.pokemon-list');// selecting the class in the HTML, need '' quotes and . to choose the class same as CSS
    let listPokemon = document.createElement('li'); // creates the list element
    let button = document.createElement('button'); // creates the button element
    button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // name of the button in the inner text of the button
    button.classList.add('button-class'); // adding the class, which then you can create the style of the button on class
    listPokemon.appendChild(button);// showing the list as a button that was just created
    mainPokemon.appendChild(listPokemon);// showing the list in the class of the selector
    pokemonDetails(button, pokemon);
  }

  function pokemonDetails (button, pokemon) {
    button.addEventListener('click', function () {
      showDetails(pokemon);
    })
  }

  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails (item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return { // returns the information of once added.
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})(); // IIFE is within local only ().

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
