const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const db = require('old-wio.db');
const { stripIndents } = require("common-tags");
const { PREFIX } = require('../../config/config.json');

module.exports = {
    config: {
        name: 'help',
        description: 'test',
        aliases: [""],
        usage: 'test',
        accessableby: "tes",
        cooldown: '5000'
    },
    run: async (client, message, args) => {
        let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

        const embed = new MessageEmbed()
            .setColor("black")
            .setAuthor(`${message.guild.me.displayName} Help`, message.guild.iconURL())
            .setThumbnail(client.user.displayAvatarURL())

        if (!args[0]) {

            embed.setDescription(`**These Are the Available Commands For ${message.guild.me.displayName}\nMidoriya's Global Prefix Is \`${PREFIX}\`\nServer Prefix Is \`${prefix}\`\n\nFor Help Related To A Particular Command Type -\n\`${prefix}help [command name] Or ${prefix}help [alais]\`**`)
            embed.setFooter(`${message.guild.me.displayName} | Total Commands - ${client.commands.size - 1} Loaded`, client.user.displayAvatarURL());
            embed.addField(`${client.emotes.settings} Settings - `, '`setlogschannel`, `setembedcolor`')
            embed.addField(`${client.emotes.help} Infos - `, '`help`')

            return message.channel.send(embed)
        } else {
            let command = client.commands.get(client.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!command) return message.channel.send(embed.setTitle("**Invalid Command!**").setDescription(`**Do \`${prefix}help\` For the List Of the Commands!**`))
            command = command.config
            
            embed.setDescription(stripIndents`**The Midoriya's Global Prefix Is \`${PREFIX}\`**\n
            **Server Prefix Is \`${prefix}\`**\n
            ** Command -** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}\n
            ** Description -** ${command.description || "No Description provided."}\n
            ** Category -** ${command.category}\n
            ** Usage -** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}\n
            ** Nedded Permissions -** ${command.accessableby || "everyone can use this command!"}\n
            ** Aliases -** ${command.aliases ? command.aliases.join(", ") : "None."}`)
            embed.setFooter(message.guild.name, message.guild.iconURL())

            return message.channel.send(embed)
        }
    }
}
