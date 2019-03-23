function isPropertyAvailable(object,property){
  return (property in object && object[property] != '') ? true : false;
}