module.exports = {
    name: 'warn',
    description: 'Warns a user.',
    usage: '[user mention or id] [reason]',
    category: 'Moderation',
    permissions: ['KICK_MEMBERS'],
    execute(client, msg, args) {
        const user = msg.mentions.users.first() ? msg.mentions.users.first().id : args[0];
        const member = msg.guild.member(user);
        if (member) {
            if (!member.kickable) {
                return msg.channel.send('You cannot warn this user.');
            }
    
            if (member.id === msg.author.id || member.id === client.user.id) {
                return msg.channel.send('You cannot warn the bot or yourself.');
            }
    
            if (member.roles.cache.find(r => r.id === client.config.modRole)) {
                return msg.channel.send('You cannot warn this user.');
            }

            const currentWarnings = client.db.prepare('SELECT number FROM warns WHERE id = ?').get(member.id);
            client.db.prepare('INSERT OR REPLACE INTO warns (id, number) VALUES (?, ?)').run(member.id, currentWarnings ? currentWarnings.number + 1 : 1);
    
            if (!client.settings.modlog) {
                return;
            }

            client.channels.fetch(client.settings.modlog).then(channel => {
                const latest = client.db.prepare('SELECT number FROM cases ORDER BY number DESC LIMIT 1').get() || { number: 0 };
                const embed = {
                    color: 'e67e22',
                    author: {
                        name: 'Warn | Case #' + (latest.number + 1),
                        icon_url: msg.author.avatarURL()
                    },
                    description: `**User:** ${user.tag} (${user.id})\n**Moderator:** ${msg.author.tag} (${msg.author.id})\n**Reason:** ${args.slice(1).join(' ') || 'No reason provided. To provide a reason run +reason ' + (latest.number + 1)}`,
                    footer: {
                        text: msg.guild.name,
                        icon_url: msg.guild.iconURL()
                    }
                }
                channel.send({
                    embed
                }).then(message => {
                    client.db.prepare('INSERT INTO cases (message_id) VALUES (?)').run(message.id);
                });
            });
        } else {
            msg.channel.send('No user provided');
        }
    }
};
