module.exports = {
    name: 'vcdeafen',
    description: 'Deafens a user in voice.',
    usage: '[user mention or id]',
    category: 'Moderation',
    permissions: ['MANAGE_ROLES'],
    async execute(client, msg, args) {
        const user = msg.mentions.users.first() ? msg.mentions.users.first().id : args[0];

        if (user === 'all') {
            msg.guild.members.cache.forEach(async (member) => {
                if (member.voice.channel) {
                    await member.voice.setDeafen(true);
                }
            });
            return msg.channel.send('All users have been deafened in voice.');
        }

        const member = msg.guild.member(user);
        if (member) {
            if (!member.kickable) {
                return msg.channel.send('You cannot deafen this user.');
            }
    
            if (member.id === msg.author.id || member.id === client.user.id) {
                return msg.channel.send('You cannot deafen the bot or yourself.');
            }
    
            if (member.roles.cache.find(r => r.id === client.config.modRole)) {
                return msg.channel.send('You cannot deafen this user.');
            }
    
            member.voice.setDeafen(true).then(() => { 
                msg.channel.send(`${user.tag} (${user.id}) has been deafened in voice chat.`);
            });
        } else {
            msg.channel.send('No user provided');
        }
    }
};
