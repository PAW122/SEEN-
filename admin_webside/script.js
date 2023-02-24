const axios = window.axios;
//zrobić tak aby te szare elementy były innych odcieńów
const mainContainer = document.getElementById('main');
if (mainContainer) {
  mainContainer.setAttribute('style', 'overflow: auto;');
} else {
  console.error('Nie można znaleźć elementu o ID "main"');
}

async function main() {
  document.addEventListener("DOMContentLoaded", async function () {
    try {
      //bot status
      const response = await axios.get(`http://localhost:2137/ready`);
      const allData = response.data;
      console.log(allData);
      if (allData === true) {
        const mainContainer = document.getElementById('main');
        if (!mainContainer) {
          console.error('Nie można znaleźć elementu o ID "main"');
          return;
        }

        const statusElement = document.createElement('div');
        statusElement.style.backgroundColor = 'gray';
        statusElement.style.color = 'white';
        statusElement.style.padding = '10px';
        statusElement.style.display = 'flex';
        statusElement.style.alignItems = 'center';
        statusElement.style.justifyContent = 'space-between';
        const textElement = document.createElement('span');
        textElement.textContent = 'bot online status:';
        statusElement.appendChild(textElement);
        const dotElement = document.createElement('div');
        dotElement.style.width = '10px';
        dotElement.style.height = '10px';
        dotElement.style.borderRadius = '50%';
        dotElement.style.backgroundColor = 'green';
        statusElement.appendChild(dotElement);

        mainContainer.appendChild(statusElement);
      }


      //bot servers:
      const servers = await axios.get(`http://localhost:2137/api/servers`);
      console.log(`response:: ${servers}`)
      const servers_res = servers.data;

      if (!servers_res) {
        const statusElement = document.createElement('div');
        statusElement.style.backgroundColor = 'gray';
        statusElement.style.color = 'white';
        statusElement.style.padding = '10px';
        statusElement.style.display = 'flex';
        statusElement.style.alignItems = 'center';
        statusElement.style.justifyContent = 'space-between';
        const textElement = document.createElement('span');
        textElement.textContent = `nie uzyskano odpowiedzi od API`;
        statusElement.appendChild(textElement);
        const dotElement = document.createElement('div');
        dotElement.style.width = '10px';
        dotElement.style.height = '10px';
        dotElement.style.borderRadius = '50%';
        dotElement.style.backgroundColor = 'red';
        statusElement.appendChild(dotElement);

        mainContainer.appendChild(statusElement);
      } else {
        //text
        const statusElement = document.createElement('div');
        statusElement.style.color = 'white';
        statusElement.style.padding = '10px';
        statusElement.style.display = 'flex';
        statusElement.style.alignItems = 'center';
        statusElement.style.justifyContent = 'space-between';
        const textElement = document.createElement('span');
        textElement.textContent = `bot guilds:`;
        statusElement.appendChild(textElement);

        //button
        const buttonElement = document.createElement('button');
        buttonElement.textContent = `${servers_res}`;
        buttonElement.style.backgroundColor = 'white';
        buttonElement.style.color = 'black';
        buttonElement.style.border = 'none';
        buttonElement.style.cursor = 'pointer';
        statusElement.appendChild(buttonElement);

        mainContainer.appendChild(statusElement);
      }

      // Alternate background color for every other element
      const children = mainContainer.children;
      for (let i = 0; i < children.length; i++) {
        if (i % 2 !== 0) {
          children[i].style.backgroundColor = 'darkgray';
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
}

main()
