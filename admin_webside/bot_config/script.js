const axios = window.axios;

const mainContainer = document.getElementById('main');
if (mainContainer) {
  mainContainer.setAttribute('style', 'overflow: auto;');
} else {
  console.error('Nie można znaleźć elementu o ID "main"');
}

async function main() {
  const switchState = { value: false };
  document.addEventListener("DOMContentLoaded", async function() {
    try {
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
        textElement.textContent = 'test_bot:';
        statusElement.appendChild(textElement);
        const dotElement = document.createElement('div');
        dotElement.style.width = '10px';
        dotElement.style.height = '10px';
        dotElement.style.borderRadius = '50%';
        dotElement.style.backgroundColor = 'red';
        dotElement.style.cursor = 'pointer';
        dotElement.addEventListener('click', function () {
          switchState.value = !switchState.value;
          dotElement.style.backgroundColor = switchState.value ? 'green' : 'red';
          switchFunction(switchState.value);
        });
        statusElement.appendChild(dotElement);

        const children = mainContainer.children;
        for (let i = 0; i < children.length; i++) {
          if (i % 2 !== 0) {
            children[i].style.backgroundColor = 'gray';
          }
        }
  
        mainContainer.appendChild(statusElement);
      }
    } catch (error) {
      console.error(error);
    }
  });
  
  function switchFunction(value) {
    if (value) {
      // Wywołaj funkcję, która ma być wykonana po włączeniu switcha
      use_switch(true)
    } else {
      // Wywołaj funkcję, która ma być wykonana po wyłączeniu switcha
      use_switch(false)
    }
  }
}

main();

function use_switch(action) {
    //action == true / false
    console.log(action)
    //wyślij do db bota informacje.
    //bot sprawdza czy db itnieje, jeżeli nie to zrob nową db
    //jeżeli istnieje to zapisz true albo false
    //bot musi najpierw wczytywać w configu dane z db
    //jeżeli nie am danych z db ustaw na domyślną wartość
}