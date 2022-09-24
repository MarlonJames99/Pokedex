const poke_container = document.getElementById('poke-container');
const pokemon_count = 151;
const colors = {
    fire: 'rgba(240,69,16,0.5)',
    grass: 'rgba(123,199,62,0.5)',
    electric: 'rgba(251,187,23,0.5)',
    water: 'rgba(46,144,241,0.5)',
    ground: 'rgba(210,177,85,0.5)',
    rock: 'rgba(189,165,91,0.5)',
    fairy: 'rgba(243,174,243,0.5)',
    poison: 'rgba(148,71,149,0.5)',
    bug: 'rgba(172,188,33,0.5)',
    dragon: 'rgba(122,97,227,0.5)',
    psychic: 'rgba(239,89,142,0.5)',
    flying: 'rgba(153,170,244,0.5)',
    fighting: 'rgba(123,49,27,0.5)',
    normal: 'rgba(200,194,187,0.5)'
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div');
    pokemonEl.classList.add('pokemon');

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, '0');

    const poke_types = pokemon.types.map(type => type.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];

    pokemonEl.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="img-container">
            <img src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png" alt="">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML;

    poke_container.appendChild(pokemonEl);
}

fetchPokemons()