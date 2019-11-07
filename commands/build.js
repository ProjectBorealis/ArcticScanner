var index = require('../index');

exports.run = async(client, message, args) => {
  var buildType = args.toString().toLowerCase();
  
  if(!index.allowedUsers.includes(message.author.username)) {
    message.channel.send("> You're not allowed to use this command!")
    return;
  }
  
  if(buildType == "ue") {
    index.teamCityRequest("UnrealEngine_UnrealEngineWin64Build")  
    message.channel.send("> Initiated a new **Unreal Engine** release")
  } else if(buildType == "doxygen") {
    index.teamCityRequest("ProjectBorealis_Doxygen")
    message.channel.send("> Initiated a new **Doxygen** release")
  } else if (buildType == "stable" || buildType ==  "public" || buildType ==  "hotfix" ) {
    index.teamCityRequest("ProjectBorealis_ReleasePipeline_PushRelease", "ReleaseType", buildType)
    message.channel.send("> Initiated a new **" + buildType + "** release")
  } else if(buildType == "pbsync") {
    index.teamCityRequest("ProjectBorealis_Tools_PBSyncRelease")
    message.channel.send("> Initiated a new **PBSync** release")
  } else if(buildType == "pbget") {
    index.teamCityRequest("ProjectBorealis_Tools_PBGetRelease")
    message.channel.send("> Initiated a new **PBGet** release")
  } else {
    message.channel.send("> **" + buildType + "** is not a valid build type")
  }
}