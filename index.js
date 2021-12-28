const {Client, Intents, Collection} = require('discord.js');
const {token, prefix} = require('./config.json');
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_VOICE_STATES]});

client.slash = new Collection()
client.aliases = new Collection();
client.commands = new Collection();
client.commandsmsg = new Collection();


['loadEvents', 'loadCommands', 'loadMessage']
    .forEach(file => {
        require(`./handlers/${file}`)(client)
    })



client.login(token);