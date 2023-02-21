const axios = window.axios;
//zrobić tak aby te szare elementy były innych odcieńów
const mainContainer = document.getElementById('main');
if (mainContainer) {
  mainContainer.setAttribute('style', 'overflow: auto;');
} else {
  console.error('Nie można znaleźć elementu o ID "main"');
}

async function main() {
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
        textElement.textContent = 'bot online status:';
        statusElement.appendChild(textElement);
        const dotElement = document.createElement('div');
        dotElement.style.width = '10px';
        dotElement.style.height = '10px';
        dotElement.style.borderRadius = '50%';
        dotElement.style.backgroundColor = 'green';
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
}
  
main()
