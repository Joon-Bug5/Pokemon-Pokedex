let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let searchBar = document.querySelector('.search-item');

  searchBar.addEventListener('keyup', function() {
    let value = searchBar.value.toUpperCase();
    let listPokemon = document.querySelectorAll('.pokemon-search');
    // eslint-disable-next-line no-unused-vars
    let buttonClass = document.getElementsByClassName('button-class');

    listPokemon.forEach(function(pokemon) {
      let pokemonValue = pokemon.textContent || pokemon.innerText;
      if (pokemonValue.toUpperCase().indexOf(value) < 0) {
        pokemon.style.display = 'none';
      } else {
        pokemon.style.display = 'block';
      }
    });
  });

  function showModal(pokemon) {
    // Practice jQuery below for the modal
    let modalTitle = $('.modal-title');
    let modalBody = $('.modal-body');
    let modalFooter = $('.modal-footer');

    modalTitle.empty();
    modalBody.empty();
    modalFooter.empty();

    let titleElement = $(
      '<h1>' +
      pokemon.name.charAt(0).toUpperCase() +
      pokemon.name.slice(1) +
      '</h1>'
    );
    let imageElementFront = $('<img>');
    imageElementFront.attr('src', pokemon.image2);
    let heightElement = $('<p>' + 'Height : ' + pokemon.height + '</p><br>');
    let typesElement = $(
      '<p>' + 'Type(s) : ' + pokemon.types.join(', ') + '</p><br>'
    );
    let abilitiesElement = $(
      '<p>' + 'Abilities : ' + pokemon.abilities.join(', ') + '</p>'
    );

    modalTitle.append(titleElement);
    modalBody.append(imageElementFront);
    modalFooter.append(heightElement);
    modalFooter.append(typesElement);
    modalFooter.append(abilitiesElement);
  }

  function add(pokemon) {
    // adding to the last list of the array
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    }
  }

  function getAll() {
    // calls out the whole list of the array
    return pokemonList;
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      let mainPokemon = document.querySelector('.list-group'); // selecting the class in the HTML, need '' quotes and . to choose the class same as CSS
      let listPokemon = document.createElement('list-group-item'); // creates the list element
      let button = document.createElement('button'); // creates the button element
      let imageElement = document.createElement('img');
      imageElement.src = pokemon.image1;
      button.innerText =
        pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1); // name of the button in the inner text of the button
      button.classList.add('btn-outline-primary'); // adding the class, which then you can create the style of the button on class
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemon-modal');
      listPokemon.classList.add('pokemon-search');
      imageElement.classList.add('pokemon-image');
      button.appendChild(imageElement);
      listPokemon.appendChild(button); // showing the list as a button that was just created
      mainPokemon.appendChild(listPokemon); // showing the list in the class of the selector
      pokemonDetails(button, pokemon);
    });
  }

  function pokemonDetails(button, pokemon) {
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
      console.log(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.image1 = details.sprites.front_default;
        item.image2 = details.sprites.other.dream_world.front_default;
        item.height = details.height;
        item.types = [];
        for (let i = 0; i < details.types.length; i++) {
          item.types.push(
            details.types[i].type.name.charAt(0).toUpperCase() +
            details.types[i].type.name.slice(1)
          );
        }
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(
            details.abilities[i].ability.name.charAt(0).toUpperCase() +
            details.abilities[i].ability.name.slice(1)
          );
        }
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  return {
    // returns the information of once added.
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})(); // IIFE is within local only ().

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
