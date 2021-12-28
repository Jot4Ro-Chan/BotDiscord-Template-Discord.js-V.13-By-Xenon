const { readdirSync } = require("fs")

module.exports = async (client) => {
    const load = dirs => {
        const commands = readdirSync(`./commandsmsg/${dirs}/`).filter(d => d.endsWith('.js'));
        for (let file of commands) {
            let pull = require(`../commandsmsg/${dirs}/${file}`);
            client.commands.set(pull.name, pull);
            if (pull.aliases) 
            pull.aliases.forEach(a => client.aliases.set(a, pull.name));
          };
        };
        ["message"].forEach(x => load(x));

      console.log(`[BOTLOADED] Message Events Loaded...`);
};