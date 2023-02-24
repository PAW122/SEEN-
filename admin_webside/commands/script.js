const axios = window.axios;
//ma wyświetlać listę wszystkich mokend,
// po kliknięciu w komendę będzie jej: nazwa, przycisk => nowa strone z opisem z helpa
const mainContainer = document.getElementById('main');
if (mainContainer) {
  mainContainer.setAttribute('style', 'overflow: auto;');
} else {
  console.error('Nie można znaleźć elementu o ID "main"');
}

async function main() {
  document.addEventListener("DOMContentLoaded", async function () {

    //pobierz listę wszystkich komend
    try {
      const response = await axios.get(`http://localhost:2137/api/commands/list`);
      console.log(response.data)
      const command_list = response.data;

      command_list.forEach(element => {
       const name =  element[0]
       if(!name || name == null) return
         //text
         const statusElement = document.createElement('div');
         statusElement.style.color = 'white';
         statusElement.style.padding = '10px';
         statusElement.style.display = 'flex';
         statusElement.style.alignItems = 'center';
         statusElement.style.justifyContent = 'space-between';
         const textElement = document.createElement('span');
         textElement.textContent = `command: ${name}`;
         statusElement.appendChild(textElement);

         //button
        const buttonElement = document.createElement('button');
        buttonElement.textContent = `będzie link`;
        buttonElement.style.backgroundColor = 'white';
        buttonElement.style.color = 'black';
        buttonElement.style.border = 'none';
        buttonElement.style.cursor = 'pointer';
        statusElement.appendChild(buttonElement);
        mainContainer.appendChild(statusElement);
      });

      const children = mainContainer.children;
      for (let i = 0; i < children.length; i++) {
        if (i % 2 !== 0) {
          children[i].style.backgroundColor = 'darkgray';
        } else {
          children[i].style.backgroundColor = 'gray';
        }
      }

    }catch(err) {
      console.log(err)
    }

  });
}

main()