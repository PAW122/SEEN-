const axios = window.axios;

const mainContainer = document.getElementById('main');
if (mainContainer) {
  mainContainer.setAttribute('style', 'overflow: auto;');
} else {
  console.error('Nie można znaleźć elementu o ID "main"');
}


async function main() {
    document.addEventListener("DOMContentLoaded", async function() {
        try {
            const response = await axios.get(`http://localhost:2137/api/guilds`);
            const allData = response.data;
            console.log(allData);
            //pobiera full dane o gildiach.
            //trzeba pobrać do kazdej gildii która ma awatar link i pobrać awatary
            //jeżeli nie mają awatara przygotować grafike z deafultowym
            //do tego obok dać nazwe serwera
            //dalej dodać id serwera i liczbę ludzi na srv

            //zanim klikniemy na kanał to ma się wyświetlać lista ludzi z srv
            //posergeregowana według aktywności (online, offline itd)

            //jak klikniemy w serwer to ma się wyświetlić menu z lista kanałów
            //po wekjściu na kanał ma wię wyświetlić historia czatu z nickami i awatarami ludzi
            //+ lista ludzi, którzy widzą kanał

          if(!allData) {
            const statusElement = document.createElement('div');
            statusElement.style.backgroundColor = 'gray';
            statusElement.style.color = 'white';
            statusElement.style.padding = '10px';
            statusElement.style.display = 'flex';
            statusElement.style.alignItems = 'center';
            statusElement.style.justifyContent = 'space-between';
            const textElement = document.createElement('span');
            textElement.textContent = `nie można załadować listi gildi`;
            statusElement.appendChild(textElement);
            const dotElement = document.createElement('div');
            dotElement.style.width = '10px';
            dotElement.style.height = '10px';
            dotElement.style.borderRadius = '50%';
            dotElement.style.backgroundColor = 'red';
            statusElement.appendChild(dotElement);
            const mainContainer = document.getElementById('main');

            if (mainContainer) {
              mainContainer.appendChild(statusElement);
            } else {
              console.error('Nie można znaleźć elementu o ID "main"');
            }

          }

          allData.forEach((element, i) => {

            const guild_name = element.name;
            const guild_id = element.id;
          
            const statusElement = document.createElement('div');
            if (i % 2 === 1) {
                statusElement.style.backgroundColor = '#444';
            } else {
                statusElement.style.backgroundColor = '#222';
            }
            statusElement.style.color = 'white';
            statusElement.style.padding = '10px';
            statusElement.style.display = 'flex';
            statusElement.style.alignItems = 'center';
            statusElement.style.justifyContent = 'space-between';
          
            const textElement = document.createElement('span');
            textElement.textContent = `guild name: ${guild_name}`;
          
            statusElement.appendChild(textElement);
          
            const buttonElement = document.createElement('button');
            buttonElement.textContent = `${guild_id}`;
            buttonElement.style.backgroundColor = 'white';
            buttonElement.style.color = 'black';
            buttonElement.style.border = 'none';
            buttonElement.style.cursor = 'pointer';
          
            buttonElement.addEventListener('click', () => {
                window.location.href = `./info/info.html?guild_id=${guild_id}`;
              });
              
          
            statusElement.appendChild(buttonElement);
          
            const dotElement = document.createElement('div');
            dotElement.style.width = '10px';
            dotElement.style.height = '10px';
            dotElement.style.borderRadius = '50%';
            dotElement.style.backgroundColor = 'green';
          
            statusElement.appendChild(dotElement);
          
            const mainContainer = document.getElementById('main');
          
            if (mainContainer) {
              mainContainer.appendChild(statusElement);
            } else {
              console.error('Nie można znaleźć elementu o ID "main"');
            }
          
          });
          
          

         
          
        } catch (error) {
          console.error(error);
        }
      });
      
      
} 

  
main()