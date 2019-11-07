var index = require('../index');

exports.run = async(client, message, args) => {
  var syncType = args.toString().toLowerCase();
  
  if(!index.allowedUsers.includes(message.author.username)) {
    message.channel.send("> You're not allowed to use this command!")
    return;
  }
  
  if(syncType == "master") {
    index.teamCityRequest("ProjectBorealis_ReleasePipeline_SyncMaster")
    message.channel.send("> Initiated a job for synchronizing **master** with **promoted**")
  } else if(syncType == "promoted") {
    index.teamCityRequest("ProjectBorealis_ReleasePipeline_SyncPromoted")
    message.channel.send("> Initiated a job for synchronizing **promoted** with latest release")
  } else if(syncType == "ue") {
    index.teamCityRequest("UnrealEngine_UpstreamSynchronization")
    message.channel.send("> Initiated a job for synchronizing unreal engine branch **4.23-PB** with upstream")
  } else {
    message.channel.send("> **" + syncType + "** is not a valid branch synchronization type")
  }
}