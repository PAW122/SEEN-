const axios = window.axios;

const mainContainer = document.getElementById('main');
if (mainContainer) {
    mainContainer.setAttribute('style', 'overflow: auto;');
} else {
    console.error('Nie można znaleźć elementu o ID "main"');
}

// Pobierz wartość zmiennej guild_id z URL-a
const urlParams = new URLSearchParams(window.location.search);
const guild_id = urlParams.get('guild_id');
console.log(guild_id);

// Użyj wartości zmiennej guild_id do wykonania odpowiednich działań
if (guild_id) {
    // Jeśli zmienna guild_id nie jest pusta, wykonaj odpowiednie akcje
    console.log(`Guild ID: ${guild_id}`);
} else {
    // Jeśli zmienna guild_id jest pusta, poinformuj o tym w konsoli
    console.error('Nie znaleziono wartości dla zmiennej guild_id w URL-u');
}
const dataKeys = [
    'id',
    'name',
    'has_icon',
    'members',
    'channels',
    'bans',
    'roles',
    'banner',
    'description',
    'verificationLevel',
    'memberCount',
    'premiumProgressBarEnabled',
    'afkTimeout',
    'afkChannelId',
    'systemChannelId',
    'premiumTier',
    'joinedTimestamp',
    'ownerId'
];

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await axios.get(`http://localhost:2137/api/guilds/info/${guild_id}`);
        console.log(response.data)
        console.log(`res= ${response.data}`)
        const data = response.data;
        let counter = 0; // deklaracja zmiennej licznika
        // loop through dataKeys array to create elements for each data key
        dataKeys.forEach((key) => {
            // create element for current key
            const statusElement = document.createElement('div');
            statusElement.style.backgroundColor = counter % 2 === 0 ? 'gray' : 'darkgray'; // dodanie ciemniejszego tła co drugiemu elemntowi
            statusElement.style.color = 'white';
            statusElement.style.padding = '10px';
            statusElement.style.display = 'flex';
            statusElement.style.alignItems = 'center';
            statusElement.style.justifyContent = 'space-between';
            const textElement = document.createElement('span');
            textElement.textContent = `${key}:`;
            statusElement.appendChild(textElement);

            // create button element for data
            const buttonElement = document.createElement('button');
            buttonElement.textContent = `${data[dataKeys.indexOf(key)]}`;
            buttonElement.style.backgroundColor = 'white';
            buttonElement.style.color = 'black';
            buttonElement.style.border = 'none';
            buttonElement.style.cursor = 'pointer';
            statusElement.appendChild(buttonElement);

            // add statusElement to mainContainer
            const mainContainer = document.getElementById('main');
            if (mainContainer) {
                mainContainer.appendChild(statusElement);
            } else {
                console.error('Nie można znaleźć elementu o ID "main"');
            }
            counter++; // zwiększenie wartości licznika
        });
    } catch (err) {
        console.log(err)
    }
});
