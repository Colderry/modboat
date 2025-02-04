const { Message } = require("discord.js");

const symbols = ["!", ":", "?", "$", "%", "&", "'", "(", ")", "#", "*", "+", ",", "-", ".", "/"]

module.exports = {
    name: 'dehoist',
    descritpion: 'Dehoists Users',
    usage: 'nickname [user mention or id] | username [user mention or id]',
    category: 'Moderation',
    permissions: ['MANAGE_NICKNAMES'],
    /**
     * 
     * @param {*} client 
     * @param {Message} msg 
     * @param {*} args 
     * @returns 
     */
    async execute(client, msg, args) {
        const member = msg.mentions.members.first() || msg.guild.members.cache.get(args[0]);
        if (!member) {
            return msg.channel.send('Please mention a user to dehoist.');
        }

        if (!member.kickable) {
            return msg.channel.send('You cannot dehoist this user.');
        };

        if (args[0] === 'nickname') {
            if (member.nickname === null) {
                return msg.channel.send('This user doesn\'t seem to be hoisting.');
            }

            if (client.emoji.removeEmoji(member.nickname, false)) {
                member.edit({ nick: 'No hoisting' });
                return message.channel.send(`\`${member.user.tag}\` has been dehoisted.`);
            }

            const nick = symbols.find(s => member.nickname.startsWith(s));

            if (nick) {
                member.edit({ nick: 'No hoisting' });
                return msg.channel.send(`\`${member.user.tag}\` has been dehoisted.`);
            }
            
            if (!nick) {
                return msg.channel.send('This user doesn\'t seem to be hoisting.');
            }

            if (member.nickname[0] < '0') {
                member.edit({ nick: 'No hoisting' });
                return msg.channel.send(`\`${member.user.tag}\` has been dehoisted.`);
            }
        }
        if (args[0] === 'username') {
            if (member.user.username === null) {
                return msg.channel.send('This user doesn\'t seem to be hoisting.');
            }

            if (client.emoji.removeEmoji(member.user.username, false)) {
                member.edit({ nick: 'No hoisting' });
                return msg.channel.send(`\`${member.user.tag}\` has been dehoisted.`);
            }
            
            const user = symbols.find(s => member.user.username.startsWith(s));
            
            if (user) {
                member.edit({ nick: 'No hoisting' });
                return msg.channel.send(`\`${member.user.tag}\` has been dehoisted.`);
            }

            if (!user) {
                return msg.channel.send('This user doesn\'t seem to be hoisting.');
            }

            if (member.user.username[0] < '0' ) {
                member.edit({ nick: 'No hoisting' });
                return msg.channel.send(`\`${member.user.tag}\` has been dehoisted.`);
            };
        };
    }
}