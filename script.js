const pokemon_container = document.getElementById('pokemon_container');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.querySelector('.modal-body');

const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
};
const main_types = Object.keys(colors);

const getPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=20`;
    const res = await fetch(url);
    const pokemon = await res.json();
    // console.log('pokemon', pokemon.results)
    for (let i = 0; i < pokemon.results.length; i++) {
        getPokemon(pokemon.results[i]);
    }
};

const getPokemon = async (poke) => {
    const res = await fetch(poke.url);
    const pokemon = await res.json();
  //  console.log('pokemon', pokemon)
    createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('col-lg-3', 'col-md-4', 'col-sm-6');
    pokemonEl.setAttribute('data-bs-toggle', 'modal');
    pokemonEl.setAttribute('data-bs-target', '#pokemonModal');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];
    // pokemonEl.style.backgroundColor = color;
    pokemonEl.innerHTML = getPokeInnerHTML(pokemon, name, color);
    var myModal = new bootstrap.Modal(document.getElementById('pokemonModal'), {
        keyboard: false
    })
    pokemonEl.addEventListener('click', () => {
        // var myModal = new bootstrap.Modal(document.getElementById('pokemonModal'), { show: true });
        myModal.show();
        modalTitle.innerHTML = name;
        modalBody.innerHTML = getPokeInnerHTML(pokemon, name, color, true);
        modalBody.querySelector('.pokemon').style.backgroundColor = color;
        myModal._dialog.querySelector('.btn-close').addEventListener('click', () => {
            myModal.hide();
        });
    });

    pokemon_container.appendChild(pokemonEl);
}

function getPokeInnerHTML(pokemon, name, color, isModal = false) {
    let abilities = ''
    pokemon.abilities.forEach(ability => {
        abilities += `<li  class="list-group-item">${ability.ability.name}</li>`;
    });
    const abilityHTML = isModal ? `<ul class="list-group pt-2">
    <li class="list-group-item"><strong>Ability</strong></li>
    ${abilities}
  </ul>` : '';
    return `
    <div class="pokemon" style="background-color: ${color}">
        <div class="img-container">
            <img src="${pokemon.sprites.front_default}" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
            .toString()
            .padStart(3, '0')}</span>
            <h3 class="name">${name}</h3>
            ${abilityHTML}
        </div>
        </div>
    `;
}

getPokemons();
