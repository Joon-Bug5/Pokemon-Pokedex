let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('.modal-container');

  function showModal(pokemon) {
    modalContainer.innerHTML = ' ';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let contentElement = document.createElement('p');
    contentElement.innerText = ' Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl

    // let typesElement = document.createElement('p');
    // typesElement.innerText = pokemon.type;


    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    // modal.appendChild(typesElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    hideModal();
  }
});
modalContainer.addEventListener('click', (e) => {
  // Since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
    hideModal();
  }
});

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
      showModal(pokemon);
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
