function mdlinkReplacer(match,p1,p2) {
  return "[" + p2 + "](" + p1.replace(/ /g,"%20") +")";
}

function slacklink2mdlink(slack_text) {
  return slack_text.replace(/<(.*?)\|(.*?)>/g,mdlinkReplacer)
}

function attachment2embed(attachment){
  var embed = {};
  
  if(isPropertyAvailable(attachment,"author_name")){
    if(!("author" in embed)) embed.author = {};
    embed.author.name = attachment.author_name;
  }
  
  if(isPropertyAvailable(attachment,"author_link")){
    if(!("author" in embed)) embed.author = {};
    embed.author.url  = attachment.author_link.replace(/ /g,"%20");
  }
  
  embed.description = isPropertyAvailable(attachment,"text"      ) ? slacklink2mdlink(attachment.text)              : null;  
  embed.url         = isPropertyAvailable(attachment,"title_link") ? attachment.title_link                          : null;
  embed.title       = isPropertyAvailable(attachment,"title"     ) ? attachment.title                               : null;
  embed.color       = isPropertyAvailable(attachment,"color"     ) ? parseInt(attachment.color.replace("#",""), 16) : null;

  return embed;
}

function makePayload(contents){
  var payload = {};
  
  payload.content    = isPropertyAvailable(contents,"text")     ? slacklink2mdlink(contents.text) : null;  
  payload.username   = isPropertyAvailable(contents,"username") ? contents.username               : null;
  payload.avatar_url = isPropertyAvailable(contents,"icon_url") ? contents.icon_url               : null;
  
  if(isPropertyAvailable(contents,"attachments")){
    payload.embeds = new Array();
    contents.attachments.forEach(function (attachment) {
      payload.embeds.push(attachment2embed(attachment));
    });
  }
  
  return payload;
}

function discordMessenger(payload,url) {
  const params = {
    'method' : 'post',
    'payload' : JSON.stringify(payload),
    'Content-Type' : 'application/json',
    'muteHttpExceptions': true
  };
  
  response = UrlFetchApp.fetch(url, params);
  console.log(response.getContentText());
  return response.getContentText();
}