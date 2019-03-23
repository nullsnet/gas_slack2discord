function doPost(e) {
  const baseurl  = "https://discordapp.com/api/webhooks/";
  
  try {
    if(isPropertyAvailable(e.postData,"contents")){
      const contents = JSON.parse(decodeURIComponent(e.postData.contents.replace(/\+/g,"%20")).replace(/^payload=/,""))
      
      if(isPropertyAvailable(contents,"channel") && isPropertyAvailable(e.parameter,contents.channel.replace(/#/g,""))){
        return discordMessenger(makePayload(contents),baseurl + decodeURIComponent(e.parameter[contents.channel.replace(/#/g,"")]));
        
      }else if(isPropertyAvailable(e.parameter,"url")){
        return discordMessenger(makePayload(contents),baseurl + decodeURIComponent(e.parameter.url))
        
      }else{
        throw new Error("url/channel is invalid");
        
      }
    }else{
      throw new Error("payload not found");
      
    }
  } catch(e) {
    return JSON.stringify({"error":e.message});
    
  }
}