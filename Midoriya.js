const Discord = require('discord.js');
const db = require('old-wio.db');
const request = require(`request`);
const fs = require(`fs`);

const client = new Discord.Client();
const logs = require('discord-logs');
logs(client);

client.config = require('./config/config.json');
client.emotes = require('./config/emotes.json');
client.apis = require('./config/apis.json');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

["aliases", "commands"].forEach(cmd => client[cmd] = new Discord.Collection());
["console", "command", "event"].forEach(events => require(`./handler/${events}`)(client));

client.categories = fs.readdirSync('./commands/')

client.on('ready', () => {
    console.log('Midoriya Loaded')
});

client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
  let embedcolor = db.fetch(`logs_embedcolor_${channel.guild.id}`);
  let logchannel = db.fetch(`logs_${channel.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
              .setAuthor(channel.guild.name, channel.guild.iconURL())
              .setColor(embedcolor || 'BLACK')
              .setFooter(client.user.username, client.user.avatarURL())
              .setDescription(`⚒️ **Channel ${channel} got updated!**`)
              .setTimestamp();

          var sChannel = channel.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildChannelTopicUpdate", (channel, oldTopic, newTopic) => {
  let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
  let logchannel = db.fetch(`logs_${guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(channel.guild.name, guild.iconURL())
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription('⚒️ **Channel Topic Changed**')
                .addField("Old topic ", `\`\`\`${oldTopic}\`\`\``, true)
                .addField("New topic ", `\`\`\`${newTopic}\`\`\``, true)
                .setTimestamp();

          var sChannel = channel.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberRoleAdd", (member, role) => {
  let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
  let logchannel = db.fetch(`logs_${member.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **has been updated.**`)
                .addField("Roles:", `${client.emotes.yes} ${role}`, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();

          var sChannel = member.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberRoleRemove", (member, role) => {
  let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
  let logchannel = db.fetch(`logs_${member.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **has been updated.**`)
                .addField("Roles:", `${client.emotes.no} ${role}`, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();

          var sChannel = member.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {
  let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
  let logchannel = db.fetch(`logs_${member.guild.id}`)
          if (!logchannel) return;

          const embed = new Discord.MessageEmbed()
                .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                .setColor(embedcolor || 'BLACK')
                .setFooter(client.user.username, client.user.avatarURL())
                .setDescription(`✍️ <@${member.user.id}> **has been updated.**`)
                .addField("Old nickname: ", `\`\`\`${oldNickname}\`\`\`` || `\`\`\`${member.user.username}\`\`\``, true)
                .addField("New nickname: ", `\`\`\`${newNickname}\`\`\`` || `\`\`\`${member.user.username}\`\`\``, true)
                .setThumbnail(member.user.avatarURL({dynamic:true}))
                .setTimestamp();

          var sChannel = member.guild.channels.cache.get(logchannel)
          if (!sChannel) return;
          sChannel.send(embed)
});

client.on("guildMemberBoost", (member) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.guild.name}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} <@${member.user.id}> **has boosted the server!.**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildMemberUnboost", (member) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.guild.name}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} <@${member.user.id}> **has unboosted the server!.**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL())
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **Server Boost Level Goes UP!.**`)
                    .addField("Old Level: ", `\`\`\`${oldLevel}\`\`\``, true)
                    .addField("New Level: ", `\`\`\`${newLevel}\`\`\``, true)
                    .setThumbnail(guild.iconURL())
                    .setTimestamp();
    
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${guild.name}`, guild.iconURL())
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.boost} **Server Boost Level Goes DOWN!.**`)
                    .addField("Old Level: ", `\`\`\`${oldLevel}\`\`\``, true)
                    .addField("New Level: ", `\`\`\`${newLevel}\`\`\``, true)
                    .setThumbnail(guild.iconURL())
                    .setTimestamp();
    
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on('guildRegionUpdate', (guild, oldRegion, newRegion) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
      const oldUpper = oldRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
      const newUpper = newRegion.charAt(0).toUpperCase() + oldRegion.substring(1);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Server Region Changed**')
                  .addField("Old region ", `\`\`\`${oldUpper}\`\`\``, true)
                  .addField("New region ", `\`\`\`${newUpper}\`\`\``, true)
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBannerAdd", (guild, bannerURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Server Banner Changed**')
                  .setImage(bannerURL)
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("emojiCreate", function(emoji){
      let embedcolor = db.fetch(`logs_embedcolor_${emoji.guild.id}`);
      let logchannel = db.fetch(`logs_${emoji.guild.id}`);
              if (!logchannel) return;
            if(emoji.animated == true) {
              const embed = new Discord.MessageEmbed()
                  .setAuthor(emoji.guild.name, emoji.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Server Emoji Created**')
                  .addField('Name: ', `\`\`\`${emoji.name}\`\`\``, false)
                  .addField('ID: ', `\`\`\`${emoji.id}\`\`\``, false)
                  .addField('Animated: ', `\`\`\`${emoji.animated}\`\`\``, false)
                  .addField('How it looks:', `<a:${emoji.name}:${emoji.id}>`, false)
                  .setTimestamp();
  
              var sChannel = emoji.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
            } else {
                  const embed2 = new Discord.MessageEmbed()
                  .setAuthor(emoji.guild.name, emoji.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Server Emoji Created**')
                  .addField('Name: ', `\`\`\`${emoji.name}\`\`\``, false)
                  .addField('ID: ', `\`\`\`${emoji.id}\`\`\``, false)
                  .addField('Animated: ', `\`\`\`${emoji.animated}\`\`\``, false)
                  .addField('How it looks:', `<:${emoji.name}:${emoji.id}>`, false)
                  .setTimestamp();
  
              var sChannel2 = emoji.guild.channels.cache.get(logchannel)
              if (!sChannel2) return;
              sChannel2.send(embed2)
            }
});

client.on("emojiDelete", function(emoji){
      let embedcolor = db.fetch(`logs_embedcolor_${emoji.guild.id}`);
      let logchannel = db.fetch(`logs_${emoji.guild.id}`);
              if (!logchannel) return;
              const embed = new Discord.MessageEmbed()
                  .setAuthor(emoji.guild.name, emoji.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Server Emoji Deleted**')
                  .addField('Name: ', `\`\`\`${emoji.name}\`\`\``, false)
                  .addField('ID: ', `\`\`\`${emoji.id}\`\`\``, false)
                  .addField('Animated: ', `\`\`\`${emoji.animated}\`\`\``, false)
                  .setTimestamp();
  
              var sChannel = emoji.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildAfkChannelAdd", (guild, afkChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **AFK Channel Changed!**')
                  .addField('AFK Channel:', afkChannel, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVanityURLAdd", (guild, vanityURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Vanity URL Setted!**')
                  .addField('Vanity URL:', vanityURL, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBanAdd", function(guild, user){
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **User got banned!**')
                  .addField('Username:', `\`\`\`${user.username}\`\`\``, true)
                  .addField('Discriminator:', `\`\`\`${user.discriminator}\`\`\``, true)
                  .addField('ID:', `\`\`\`${user.id}\`\`\``, false)
                  .addField('Created At:', `\`\`\`${user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildBanRemove", function(guild, user){
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **User got unbanned!**')
                  .addField('Username:', `\`\`\`${user.username}\`\`\``, true)
                  .addField('Discriminator:', `\`\`\`${user.discriminator}\`\`\``, true)
                  .addField('ID:', `\`\`\`${user.id}\`\`\``, false)
                  .addField('Created At:', `\`\`\`${user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildMemberAdd", function(member){
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(member.guild.name, member.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **User joins a guild!**')
                  .addField('Username:', `\`\`\`${member.user.username}\`\`\``, true)
                  .addField('Discriminator:', `\`\`\`${member.user.discriminator}\`\`\``, true)
                  .addField('ID:', `\`\`\`${member.user.id}\`\`\``, false)
                  .addField('Created At:', `\`\`\`${member.user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(member.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildMemberRemove", function(member){
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(member.guild.name, member.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **User leaves a guild, or get kicked!**')
                  .addField('Username:', `\`\`\`${member.user.username}\`\`\``, true)
                  .addField('Discriminator:', `\`\`\`${member.user.discriminator}\`\`\``, true)
                  .addField('ID:', `\`\`\`${member.user.id}\`\`\``, false)
                  .addField('Created At:', `\`\`\`${member.user.createdAt.toLocaleDateString()}\`\`\``, false)
                  .setThumbnail(member.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("roleCreate", function(role){
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Role got created!**')
                  .addField('Name:', `\`\`\`${role.name}\`\`\``, false)
                  .addField('ID:', `\`\`\`${role.id}\`\`\``, false)
                  .addField('Mentionable?: ', `\`\`\`${role.mentionable}\`\`\``, false)
                  .addField('Role Color:', `\`\`\`${role.color}\`\`\``, false)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("roleDelete", function(role){
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Role got created!**')
                  .addField('Name:', `\`\`\`${role.name}\`\`\``, false)
                  .addField('ID:', `\`\`\`${role.id}\`\`\``, false)
                  .addField('Mentionable?: ', `\`\`\`${role.mentionable}\`\`\``, false)
                  .addField('Role Color:', `\`\`\`${role.color}\`\`\``, false)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVanityURLRemove", (guild, vanityURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Vanity URL Removed!**')
                  .addField('Vanity URL:', `\`\`\`${vanityURL}\`\`\``, false)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Vanity URL Changed!**')   
                  .addField('OLD Vanity URL:', `\`\`\`${oldVanityURL}\`\`\``, true)
                  .addField('New Vanity URL:', `\`\`\`${newVanityURL}\`\`\``, true)
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildFeaturesUpdate", (oldGuild, newGuild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${newGuild.id}`);
      let logchannel = db.fetch(`logs_${newGuild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(newGuild.name, newGuild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Guild get new features!**')   
                  .addField('New Features:', `\`\`\`${newGuild.features.join(", ")}\`\`\``, true)
                  .setThumbnail(newGuild.iconURL())
                  .setTimestamp();
  
              var sChannel = newGuild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildAcronymUpdate", (oldGuild, newGuild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${newGuild.id}`);
      let logchannel = db.fetch(`logs_${newGuild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(newGuild.name, newGuild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Acronym Updated !**')   
                  .addField('New Acronym:', `\`\`\`${newGuild.nameAcronym}\`\`\``, true)
                  .setThumbnail(newGuild.iconURL())
                  .setTimestamp();
  
              var sChannel = newGuild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildOwnerUpdate", (oldGuild, newGuild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${newGuild.id}`);
      let logchannel = db.fetch(`logs_${newGuild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(newGuild.name, newGuild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Guild Owner Updated !**')   
                  .addField('Old Guild Owner:', `<@${oldGuild.owner.id}>`, true)
                  .addField('New Guild Owner:', `<@${newGuild.owner.id}>`, true)
                  .setThumbnail(newGuild.iconURL())
                  .setTimestamp();
  
              var sChannel = newGuild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildPartnerAdd", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Guild got Partnered!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildPartnerRemove", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Guild is no longer Partnered!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVerificationAdd", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Guild got Verified!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("guildVerificationRemove", (guild) => {
      let embedcolor = db.fetch(`logs_embedcolor_${guild.id}`);
      let logchannel = db.fetch(`logs_${guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(guild.name, guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Guild is no longer Verified!**')   
                  .setThumbnail(guild.iconURL())
                  .setTimestamp();
  
              var sChannel = guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("messagePinned", (message) => {
      let embedcolor = db.fetch(`logs_embedcolor_${message.guild.id}`);
      let logchannel = db.fetch(`logs_${message.guild.id}`);
              if (!logchannel) return;
  
              const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **The message has been pinned!**')
                  .addField('Content:', message, true)
                  .addField('Channel:', `<#${message.channel.id}>`, true) 
                  .addField('Message sent by:', message.author, true)  
                  .setThumbnail(message.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = message.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("messageContentEdited", (message, oldContent, newContent) => {
      let embedcolor = db.fetch(`logs_embedcolor_${message.guild.id}`);
      let logchannel = db.fetch(`logs_${message.guild.id}`);
              if (!logchannel) return;

              const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **The message has been updated!**')
                  .addField('Message sent by:', message.author, true) 
                  .addField('Message sent in:', `<#${message.channel.id}>`, true)
                  .addField('\u200B', '\u200B', false)
                  .addField('Old Message:', oldContent, true)
                  .addField('New Message:', newContent, true)  
                  .setThumbnail(message.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = message.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("messageDelete", function(message){
      let embedcolor = db.fetch(`logs_embedcolor_${message.guild.id}`);
      let logchannel = db.fetch(`logs_${message.guild.id}`);
              if (!logchannel) return;
            if(message.attachments.first()) {
              const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **The message has been deleted!**')
                  .addField('Message sent by:', message.author, true) 
                  .addField('Message sent in:', `<#${message.channel.id}>`, true)
                  .setImage(message.attachments.first().proxyURL)
                  .setTimestamp();

                  var sChannel = message.guild.channels.cache.get(logchannel)
                  if (!sChannel) return;
                  sChannel.send(embed)
            } else {
                  const embed = new Discord.MessageEmbed()
                  .setAuthor(message.guild.name, message.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **The message has been deleted!**')
                  .addField('Message sent by:', message.author, true) 
                  .addField('Message sent in:', `<#${message.channel.id}>`, true)
                  .addField('Message Content:', message.content || `I can't get message data (It was embed)`, false)
                  .setTimestamp();

                  var s1Channel = message.guild.channels.cache.get(logchannel)
                  if (!s1Channel) return;
                  s1Channel.send(embed)
            }
});

client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;

              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription('⚒️ **Role Position Updated!**')
                  .addField('Role:', `\`\`\`${role.name}\`\`\``, true) 
                  .addField('Old position:', `\`\`\`${oldPosition}\`\`\``, true)
                  .addField('New position:', `\`\`\`${newPosition}\`\`\``, true)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp();
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {
      let embedcolor = db.fetch(`logs_embedcolor_${role.guild.id}`);
      let logchannel = db.fetch(`logs_${role.guild.id}`);
              if (!logchannel) return;

              const embed = new Discord.MessageEmbed()
                  .setAuthor(role.guild.name, role.guild.iconURL())
                  .setColor(embedcolor || 'BLACK')
                  .setFooter(client.user.username, client.user.avatarURL())
                  .setDescription(`⚒️ **Permisions Updated for Role ${role}!**`)
                  .setThumbnail(role.guild.iconURL())
                  .setTimestamp(); 
  
              var sChannel = role.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelJoin", (member, channel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **joined <#${channel.id}>.**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelLeave", (member, channel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **left <#${channel.id}>.**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **changed voice channel.**`)
                    .addField(`Old channel: `, `\`\`\`${oldChannel.name}\`\`\``, true)
                    .addField(`New channel: `, `\`\`\`${newChannel.name}\`\`\``, true)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelMute", (member, muteType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **become muted! (type: ${muteType})**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelUnmute", (member, oldMuteType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **become unmuted! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelDeaf", (member, deafType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **become deaf! (type: ${deafType})**`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceChannelUndeaf", (member, deafType) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **become undeaf! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceStreamingStart", (member, voiceChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **started streaming in ${voiceChannel.name}! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});

client.on("voiceStreamingStop", (member, voiceChannel) => {
      let embedcolor = db.fetch(`logs_embedcolor_${member.guild.id}`);
      let logchannel = db.fetch(`logs_${member.guild.id}`)
              if (!logchannel) return;
    
              const embed = new Discord.MessageEmbed()
                    .setAuthor(`${member.user.username}${member.user.discriminator}`, member.user.avatarURL({dynamic:true}))
                    .setColor(embedcolor || 'BLACK')
                    .setFooter(client.user.username, client.user.avatarURL())
                    .setDescription(`${client.emotes.voice} <@${member.user.id}> **stopped streaming! **`)
                    .setThumbnail(member.user.avatarURL({dynamic:true}))
                    .setTimestamp();
    
              var sChannel = member.guild.channels.cache.get(logchannel)
              if (!sChannel) return;
              sChannel.send(embed)
});


client.login(client.config.token);
