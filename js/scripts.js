let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('.modal-container');
  let searchBar = document.querySelector('.search-item');

  searchBar.addEventListener('keyup', function () {
    let value = searchBar.value.toUpperCase();
    let listPokemon = document.querySelectorAll('li');

    listPokemon.forEach(function (pokemon) {
      pokemonValue = pokemon.textContent || pokemon.innerText
      if (pokemonValue.toUpperCase().indexOf(value) < 0) {
        pokemon.style.display = 'none';
      } else {
        pokemon.style.display = 'block';
      }
    })
  });

  function showModal (pokemon) { // this function will allow the modal to show
    modalContainer.innerHTML = ' '; // this clears anything inside the modal
    let modal = document.createElement('div'); // creating div element inside the modal
    modal.classList.add('modal'); // adding the class to change in css on how it looks

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal); // this closes the modal when clicking on the close button

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let contentElement = document.createElement('p');
    contentElement.innerText = ' Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imageUrl

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imageElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal () {
    modalContainer.classList.remove('is-visible'); // this removes the class is-visible from css to hide the modal again
  }

  window.addEventListener('keydown', (e) => { // this controls the key button when pressing escape it will hide the modal
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => { // this will hide the modal when clicking outside of the modal
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
