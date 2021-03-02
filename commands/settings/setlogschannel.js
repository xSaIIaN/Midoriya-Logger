const db = require("old-wio.db");
const { PREFIX } = require('../../config/config.json');
const Discord = require('discord.js');

module.exports = {
    config: {
        name: 'setlogschannel',
        description: 'test',
        aliases: [""],
        usage: 'test',
        accessableby: "tes",
        cooldown: '5000'
    },
    run: async (client, message, args) => {
        if(message.author.bot) return;
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**You Do Not Have The Required Permissions! - [ADMINISTRATOR]**")

        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }
        
        if(!args[0]) {
            const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **Enter a valid Text Channel!**`)
                  .addField('Example usage: ', 'm!setlogschannel #logs')
                  .setTimestamp(); 
            return message.channel.send(embed);
        }
            let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());
            const embed2 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **Please enter a valid Text Channel!**`)
                  .addField('Example usage: ', 'm!setlogschannel #logs')
                  .setTimestamp(); 
            if (!channel || channel.type !== 'text') return message.channel.send(embed2);
        
            try {
                let a = await db.fetch(`logs_${message.guild.id}`)
    
                if (channel.id === a) {
                    const embed3 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **This Channel is Already Set As Logger Channel!**`)
                  .setTimestamp(); 
                    return message.channel.send(embed3)
                } else {
                    client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id);
                    db.set(`logs_${message.guild.id}`, channel.id);
                    const embed4 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.yes} **Logger Channel Has Been Set Successfully in \`${channel.name}\`!**`)
                  .setTimestamp(); 
                    message.channel.send(embed4);
                }
            } catch (err) {
                const embed5 = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor('BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`${client.emotes.no} **Error - \`Missing Permissions Or Channel Is Not A Text Channel!\`**`)
                  .setTimestamp();
                message.channel.send(embed5);
                return console.log(err);
        }
    }
}
