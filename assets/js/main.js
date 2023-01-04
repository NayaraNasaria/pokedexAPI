const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const limit = 6;
let offset = 0;

function convertPokemonToLI(pokemon) {
  return `
            <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
            <ol class="types">
            ${pokemon.types
              .map((type) => `<li class="type ${type}">${type}</li>`)
              .join("")}
            </ol>

            <img
                src="${pokemon.photo}"
                alt="${pokemon.name}"
            />
            </div>
        </li>
        `;
}

pokeapi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLI).join("");
});

function loadPokemonItems(offset, limit) {
  pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHTML = pokemons.map(convertPokemonToLI).join("");
    pokemonList.innerHTML += newHTML;
  });
}

loadMoreButton.addEventListener("click", () => {
  offset += limit;
  loadPokemonItems(offset, limit);
});
