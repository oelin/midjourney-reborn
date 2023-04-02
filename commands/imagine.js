const { SlashCommandBuilder } = require('discord.js')


module.exports = {
        data: new SlashCommandBuilder()
                .setName('imagine')
                .setDescription('There are endless possibilities...')
                .addStringOption(option =>
                        option
                                .setName('prompt')
                                .setDescription('The prompt to imagine')
                                .setRequired(true)
                ),
        async execute(interaction) {

                const { default: midjourney } = await import('midjourney-client')
                const prompt = interaction.options.getString('prompt')

                midjourney(prompt).then(response => {
                        if (response.length < 1) {
                                interaction.editReply('Unabled to generate images 😭.')
                        }

                        const imageURLs = response.join('\n')
                        
                                if (interaction.channel.nsfw === true) {
                        
                        interaction.editReply(`**${prompt}**\n${imageURLs}`)
                                
                               }else {            
                           interaction.editReply({content: 'Must be a Age Restricted channel to function', ephemeral: true });
                       } 

                })

                await interaction.reply('Generating images, may take up to 7 seconds...')
        }
}
