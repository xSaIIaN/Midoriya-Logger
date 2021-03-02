const { PREFIX } = require('../../config/config.json');

module.exports = async client => {
    let totalUsers = client.guilds.cache.reduce((users, value) => users + value.memberCount, 0)
    let totalGuilds = client.guilds.cache.size
    console.log('\x1b[32m%s\x1b[0m', `$[INFO] Logged as ${client.user.tag}`)
    console.log('\x1b[32m%s\x1b[0m', `$[INFO] Prefix: ${PREFIX}`)
    console.log('\x1b[31m%s\x1b[0m', `$[INFO] Members: ${totalUsers}`)
    console.log('\x1b[31m%s\x1b[0m', `$[INFO] Guilds: ${totalGuilds}`)
    
    var activities = [
        `Working at ${client.guilds.cache.size} servers!`,
        `Servicing ${totalUsers} users!`, 
        `Website still in creating!` 
        ], i = 0;
    setInterval(() => client.user.setActivity(`${PREFIX}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }),15000)
}
