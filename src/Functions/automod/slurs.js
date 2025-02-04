const { MessageEmbed } = require('discord.js');

module.exports = (client, msg) => {
    const slurCensor = client.automod.slurs;
    const slurCheck = !!slurCensor.find((word) => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(msg.content);
    });

    if (slurCheck) {
        setTimeout(() => {
            msg.delete().catch((err) => {})
        }, 0);
        client.channels.fetch(client.config.messagelog).then(channel => {
            const embed = new MessageEmbed()
            .setColor('#fc5858')
            .setThumbnail(msg.author.avatarURL({
                dylanic: true
            }))
            .setDescription(`<@${msg.author.id}> | ${msg.author.tag} (${msg.author.id}) tried to say a blacklisted word/phrase in <#${msg.channel.id}>\n\n Message Deleted: ||${msg.content}||\n\n** **`);
            return channel.send({
                embed
            });
        });
    }
}