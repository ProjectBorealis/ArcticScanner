const curl = new (require( 'curl-request' ))();

module.exports = {
    teamCityRequest: function (buildId, propertyName = null, propertyValue = null) {
        var xml = '<build><buildType id="' + buildId + '"/></build>'
  
        if(propertyName != null && propertyValue != null) {
            xml += '<properties><property name="' + propertyName + '" value="' + propertyValue + '"/></properties>'
        }
        
        curl.setHeaders([
            'Accept: application/json',
            'Content-Type: application/xml',
            'Authorization: Bearer ' + process.env.TCTOKEN,
            'Host: ' + process.env.TCHOST
            ]).setBody(xml)
            .post(process.env.TCPATH)
    },
    allowedUsers: ["mastercoms", "Doğa"],
    version: "0.0.3"
}

const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require("fs");
require(__dirname + '/app/keepAlive.js')

//Command Handler
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        console.log("Successfully loaded " + file)
        let commandName = file.split(".")[0];
        client.commands.set(commandName, props);
    });
});
    //Events "handler"
    fs.readdir('./events/', (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
            let eventFunc = require(`./events/${file}`);
            console.log("Successfully loaded " + file)
            let eventName = file.split(".")[0];
            client.on(eventName, (...args) => eventFunc.run(client, ...args));
        });
});

client.on("ready", () => console.log("Online!"));
client.login(process.env.TOKEN)