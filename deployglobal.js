const { REST } = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const path = require('path');
const { readdirSync } = require('fs');

const commands = [];
readdirSync("./commands/").map (async dir => {
    readdirSync(`./commands/${dir}`).map(async (cmd) => {
        commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)))
    })
})

const rest = new REST({version: '9'}).setToken(token);

( async () => {
    try {
        console.log('[BOTLOADED] Start RegisterCommands....');

        await rest.put(
            Routes.applicationCommands(clientId),
            {body: commands},
        );
        console.log('[BOTLOADED] RegisterCommands Successfully!!');
    } catch (error)  {
        console.log('[BOTLOADED] RegisterCommands Faild T_T')
    }
})();
