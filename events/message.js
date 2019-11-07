let prefix = "/"
var index = require('../index');

exports.run = async(client, message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(prefix)) {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    
    if(cmd == "/help") {
      message.channel.send("> **~ ~ ~ ~ Arctic Scanner v" + index.version + " ~ ~ ~ ~**\n> **/help** : Shows this output\n> **/build** <Public, Stable, Hotfix, UE, Doxygen, PBSync, PBGet> : Launches a release job in Team City with specified build type\n> **/sync** <Master, Promoted, UE> : Synchronizes specified branch. If **Master** is provided, it will be synchronized with **Promoted**. If **Promoted** is provided, it will be synchronized with latest release in **Stable**. If **UE** is provided, current default engine branch will be updated with upstream.")
      return;
    }  
    
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(!commandfile) return;
    commandfile.run(client,message,args);
  }
}