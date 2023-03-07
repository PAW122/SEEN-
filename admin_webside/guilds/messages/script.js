//wczytaj i za loguj ostatnie 100 wiadomości!!
const axios = window.axios;

const mainContainer = document.getElementById('main');
if (mainContainer) {
    mainContainer.setAttribute('style', 'overflow: auto;');
} else {
    console.error('Nie można znaleźć elementu o ID "main"');
}

// Pobierz wartość zmiennej guild_id z URL-a
const urlParams = new URLSearchParams(window.location.search);
const channelId = urlParams.get('channelId');
const guildId = urlParams.get('guildId');

// Użyj wartości zmiennej guild_id do wykonania odpowiednich działań
if (channelId) {
    // Jeśli zmienna guild_id nie jest pusta, wykonaj odpowiednie akcje
    console.log(`channel: ${channelId}`);
} else {
    // Jeśli zmienna guild_id jest pusta, poinformuj o tym w konsoli
    console.error('Nie znaleziono wartości dla zmiennej channel w URL-u');
}

if (guildId) {
    console.log(`guild: ${guildId}`)
} else {
    console.error(`Nie znaleziono guildId w linku`)
}


let load_lessages = 100

document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await axios.get(`http://localhost:2137/api/guilds/messages/${guildId}/${channelId}/${load_lessages}`);
        console.log(response.data)
        console.log(`res= ${response.data}`)
        const data = response.data;
        let counter = 0; // deklaracja zmiennej licznika
        // loop through dataKeys array to create elements for each data key
        data.forEach((message) => {

            const message_content = message[0]

            const message_info = message[1]
            const autor_id = message_info.id
            const message_author_avatar_url = message_info.avatarURL
            const bot = message_info.bot
            const createdTimestamp = message_info.createdTimestamp
            const user_username = message_info.tag
            const user_name = message_info.username
            const user_tag = message_info.discriminator

            const message_id = message[4]

            // user avatar
            const image = new Image();
            image.src = message_author_avatar_url;
            image.style.width = '50px'; // dostosuj szerokość i wysokość obrazka do swoich potrzeb
            image.style.height = '50px';
            image.style.marginRight = '10px'; // dodaj odstęp między obrazkiem a tekstem

            // create element 1
            const statusElement = document.createElement('div');
            statusElement.style.backgroundColor = counter % 2 === 0 ? 'gray' : 'darkgray'; // dodanie ciemniejszego tła co drugiemu elemntowi
            statusElement.style.color = 'white';
            statusElement.style.padding = '10px';
            statusElement.style.display = 'flex';
            statusElement.style.alignItems = 'center';
            statusElement.style.justifyContent = 'space-between';

            statusElement.appendChild(image); // Dodaj obrazek do elementu
            const textElement = document.createElement('span');
            textElement.textContent = `${user_username}`;
            statusElement.appendChild(textElement);


            // create element 2
            const typeElement = document.createElement('div');
            typeElement.style.backgroundColor = counter % 2 === 0 ? 'gray' : 'darkgray'; // dodanie ciemniejszego tła co drugiemu elemntowi
            typeElement.style.color = 'white';
            typeElement.style.padding = '10px';
            typeElement.style.display = 'flex';
            typeElement.style.alignItems = 'center';
            typeElement.style.justifyContent = 'space-between';
            const type_textElement = document.createElement('span');
            type_textElement.textContent = `${message_content}`;
            statusElement.appendChild(type_textElement);

            //button for element
            const buttonElement = document.createElement('button');
            buttonElement.textContent = `${message_id}`;
            buttonElement.style.backgroundColor = 'white';
            buttonElement.style.color = 'black';
            buttonElement.style.border = 'none';
            buttonElement.style.cursor = 'pointer';

            //button for element 2
            const buttonElemen2 = document.createElement('button');
            buttonElemen2.textContent = `delete messages`;
            buttonElemen2.style.backgroundColor = 'white';
            buttonElemen2.style.color = 'black';
            buttonElemen2.style.border = 'none';
            buttonElemen2.style.cursor = 'pointer';
            buttonElemen2.style.marginTop = '5px';

            const buttonsContainer = document.createElement('div');
            buttonsContainer.style.display = 'flex';
            buttonsContainer.style.flexDirection = 'column';
            buttonsContainer.appendChild(buttonElement);
            buttonsContainer.appendChild(buttonElemen2);

            statusElement.appendChild(buttonsContainer);

            // add statusElement to mainContainer
            const mainContainer = document.getElementById('main');
            if (mainContainer) {
                mainContainer.appendChild(statusElement);
            } else {
                console.error('Nie można znaleźć elementu o ID "main"');
            }
            buttonElemen2.addEventListener('click', async () => {
                const deleted = await axios.get(`http://localhost:2137/api/guilds/del_messages/${guildId}/${channelId}/${message_id}`);
                console.log(deleted)
                if (deleted) {
                    showNotification('Wiadomość usunięta', 'success');
                  } else {
                    showNotification('Nie udało się usunąć wiadomości', 'error');
                  }                  
              });
            counter++; // zwiększenie wartości licznika

            function showNotification(message, type) {
                const notification = document.createElement('div');
                notification.classList.add('notification', type);
                notification.textContent = message;
                document.body.appendChild(notification);
                setTimeout(() => {
                  notification.remove();
                }, 5000);
              }
              
        });
    } catch (err) {
        console.log(err)
    }
});