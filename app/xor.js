var encryptXOR = function(message){
  // Holds the encrypted Message;
  var stringBuffer = '';
  if(message.length == 1){
    return message;
  }

  for(i = 0; i < message.length - 1 ; i++){
    var newChar = message[i].charCodeAt(0) ^ message[i + 1].charCodeAt(0);
    stringBuffer += String.fromCharCode(newChar);
  }

  stringBuffer += message[message.length - 1];

  return stringBuffer;
}

var decryptXOR = function(message){
  // Holds the encrypted Message;
  var stringBuffer = '';
  if(message.length == 1){
    return message;
  }

  var msgArray = new Array(message.length - 1);
  stringBuffer = message[message.length - 1];
  msgArray[message.length - 1] = message[message.length - 1];
  for(i = message.length - 2; i >=0; i--){
    var newChar = message[i].charCodeAt(0) ^ msgArray[i + 1].charCodeAt(0);
    stringBuffer += String.fromCharCode(newChar);
    msgArray[i] = String.fromCharCode(newChar);
  }

  return stringBuffer.split("").reverse().join("");
}
