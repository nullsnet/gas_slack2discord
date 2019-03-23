function doPost(e) {
  const baseurl  = "https://discordapp.com/api/webhooks/";
  try {
    if(!isPropertyAvailable(e.postData,"contents")){
      throw new Error("payload not found");
    }else{
      const contents = JSON.parse(decodeURIComponent(e.postData.contents.replace(/\+/g,"%20")).replace(/^payload=/,""))
      if(isPropertyAvailable(contents,"channel") && isPropertyAvailable(e.parameter,contents.channel.replace(/#/g,""))){
        return discordMessenger(makePayload(contents),baseurl + decodeURIComponent(e.parameter[contents.channel.replace(/#/g,"")]));
      }else if(isPropertyAvailable(e.parameter,"url")){
        return discordMessenger(makePayload(contents),baseurl + decodeURIComponent(e.parameter.url))
      }else{
        throw new Error("url/channel is invalid");
      }
    }
  } catch(e) {
    return JSON.stringify({"error":e.message});
  }
}