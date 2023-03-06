const axios = window.axios;

const mainContainer = document.getElementById('main');
if (mainContainer) {
    mainContainer.setAttribute('style', 'overflow: auto;');
} else {
    console.error('Nie można znaleźć elementu o ID "main"');
}

// Pobierz wartość zmiennej guild_id z URL-a
const urlParams = new URLSearchParams(window.location.search);
const guild_data = urlParams.get('data');

// Użyj wartości zmiennej guild_id do wykonania odpowiednich działań
if (guild_data) {
    // Jeśli zmienna guild_id nie jest pusta, wykonaj odpowiednie akcje
    console.log(`data: ${guild_data}`);
} else {
    // Jeśli zmienna guild_id jest pusta, poinformuj o tym w konsoli
    console.error('Nie znaleziono wartości dla zmiennej data w URL-u');
}

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await axios.get(`http://localhost:2137/api/guilds/channels/${guild_data}`);
        console.log(response.data)
        console.log(`res= ${response.data}`)
        const data = response.data;
        let counter = 0; // deklaracja zmiennej licznika
        // loop through dataKeys array to create elements for each data key
        data.forEach((channel) => {

            const channel_name = channel.name
            const type = channel.type
            const id = channel.id

            // create element
            const statusElement = document.createElement('div');
            statusElement.style.backgroundColor = counter % 2 === 0 ? 'gray' : 'darkgray'; // dodanie ciemniejszego tła co drugiemu elemntowi
            statusElement.style.color = 'white';
            statusElement.style.padding = '10px';
            statusElement.style.display = 'flex';
            statusElement.style.alignItems = 'center';
            statusElement.style.justifyContent = 'space-between';
            const textElement = document.createElement('span');
            textElement.textContent = `${channel_name}`;
            statusElement.appendChild(textElement);

            //type element
            const typeElement = document.createElement('div');
            typeElement.style.backgroundColor = counter % 2 === 0 ? 'gray' : 'darkgray'; // dodanie ciemniejszego tła co drugiemu elemntowi
            typeElement.style.color = 'white';
            typeElement.style.padding = '10px';
            typeElement.style.display = 'flex';
            typeElement.style.alignItems = 'center';
            typeElement.style.justifyContent = 'space-between';
            const type_textElement = document.createElement('span');
            type_textElement.textContent = `${type}`;
            statusElement.appendChild(type_textElement);

            //button for element
            const buttonElement = document.createElement('button');
            buttonElement.textContent = `${id}`;
            buttonElement.style.backgroundColor = 'white';
            buttonElement.style.color = 'black';
            buttonElement.style.border = 'none';
            buttonElement.style.cursor = 'pointer';
            statusElement.appendChild(buttonElement);
            if (type == "GUILD_TEXT" || type == "GUILD_VOICE") {

                buttonElement.addEventListener('click', () => {
                    window.location.href = `../messages/index.html?channelId=${id}&guildId=${guild_data}`;
                });
            }

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