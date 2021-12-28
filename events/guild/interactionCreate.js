const { MessageEmbed } = require('discord.js');
const ownerId = require('../../config.json')

module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {
        if (!client.slash.has(interaction.commandName)) return;
        if (!interaction.guild) return;
        const command = client.slash.get(interaction.commandName);
        if(!command) return;
        try {
            if (command.permission) {
                if (!interaction.member.hasPermission(command.permission)) {
                    const embed = new MessageEmbed()
                        .setTitle('ERROR')
                        .setColor('RED')
                        .setDescription('แกไม่มีสิทธิ์')
                        .setFooter(`${client.user.tag}`);

                    return interaction.reply({ embeds: [embed]})
                
                }
            }

            if (command.ownerOnly) {
                if(interaction.user.id !== ownerId) {
                    const embed2 = new MessageEmbed()
                        .setTitle('ERROR')
                        .setColor('RED')
                        .setDescription('มึงไม่ใช่เจ้าของ')
                        .setFooter(`${client.user.tag}`);

                    return interaction.reply({ embeds: [embed2]})
                }
            }
           command.run(interaction, client);

        } catch (e) {
            console.log(e)
            await interaction.reply({content: 'ERROR NAJA', ephemeral: true})
        }
    }
}