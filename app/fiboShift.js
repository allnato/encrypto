String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

var fibonacci = require ('fibonacci');
var fibResult;
function fiboEncrypt(message){
  var mess = message;
  for(i = 1; i < message.length ; i++){
    var mods = parseInt(fibonacci.iterate(i).number) % 26;
    var caesarValue = caesarShift(mess[i], mods);
    mess = mess.replaceAt(i , caesarValue);
  }
  return mess;
}



function fiboDecrypt(message){
  var mess = message;
  for(i = 1; i < message.length ; i++){
    var mods = parseInt(fibonacci.iterate(i).number) % 26;
    var caesarValue = caesarShift(mess[i], mods * -1);
    mess = mess.replaceAt(i , caesarValue);
  }
  return mess;
}
