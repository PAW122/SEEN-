module.exports = (client, action) => {

    function read() {
        const commands = client.command
        let i = 0;
        commands.forEach(element => {
            i++
        });
        return i;
    }

    function list() {
        const list = [];
        const commands = client.command;

        const commands_name = Array.from(client.command).map((command) => command[1].name);

        let i = 0;
        commands_name.forEach((command) => {
            const one_command = [];
            one_command.push(commands_name[i]);
            list.push(one_command);
            i++;
        });

        return Promise.resolve(list);
    }


    if (action == "read") {
        return read().toString();
    } else {
        return list()
    }
}