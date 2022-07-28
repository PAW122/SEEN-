//nie działa!!
const {Collection} = require("discord.js")
const {readdirSync, readFileSync, writeFileSync} = require("fs")
const yaml = require("js-yaml")

//lokalizacja plików z ustawieniami serwerów
const serverconfigPath =`/config/servers/`

module.exports= (client) => {
    //kolekcja z ustawieniami
    client.settings = new Collection()

    //pobieranie plików z folderu
    const settingsFiles = readdirSync(__dirname + `/..${serverconfigPath}`).filter(file => file.endsWith(".yaml"))



    try {
        for(const file of settingsFiles) {
            //wczytuje plik
            const settingsFile = readFileSync(__dirname + `/..${serverconfigPath}/${file}`, "utf8")
            //zapisuje dane z pliku do zmiennej
            const data = yaml.load(settingsFile)
            //oddziela nazwe pliku od.yaml i zapisuje jako guildId
            const guildId = file.split(".")[0]

            //set server settings
            client.settings.set(guildId, data)
        }
    }catch(e){
        console.log(e)
    }
// safeLoad > load
    client.saveConfig = guildId => {
        //sprawdza czy gildia jest w configu(na liście)
        if(client.settings.has(guildId)) {
            //pobiera id gildi
            const config = client.settings.get(guildId)

            try {
                const yamlStr = yaml.dump(config)

                writeFileSync(__dirname + `/..${serverconfigPath}/${guildId}.yaml`, yamlStr, "utf8")

            }catch(error){
                console.log(error)
            }
        }
    }
}