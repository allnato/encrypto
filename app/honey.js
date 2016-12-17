// /[A-Z]|[a-z]/.test('g')
// $('.letter-container input').each(function(i, obj){
// console.log($(this).val() + " " + i);
// });
//
//

var arrayRotation = require('npm-array-rotation');

const dictionary = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
'R','S','T','U','V','W','X','Y','Z');

var userDict = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
'R','S','T','U','V','W','X','Y','Z');

var shiftDict = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
'R','S','T','U','V','W','X','Y','Z');

// Edit Button is clicked
$('#honeyEdit').click(function(event) {
  // Remove apply changes btn's disabled attr.
  $('#honeyApply').removeAttr('disabled');
  // Remove all readonly on input
  $('.letter-container input').removeAttr('readonly');
});

// Apply button is clicked
$('#honeyApply').click(function(event) {
  if(!checkDictIfEmpty()){
    $('.err-dict').css('display', 'block');
    return;
  }
  $('.err-dict').css('display', 'none');
  // Add readonly attr. in inputs.
  $('.letter-container input').attr('readonly', 'readonly');
  // Add disabled attr. in apply btn.
  $('#honeyApply').attr('disabled', 'disabled');


  // Add user changes in dictionary.
  $('.letter-container input').each(function(i, obj){
    userDict[i] = $(this).val();
  });

});

// Encrypt Button is clicked
$('#honeyEncrypt').click(function(event) {
  honeyEncrypt();
});

// Decrypt Button is clicked
$('#honeyDecrypt').click(function(event) {
  honeyDecrypt();
});

function checkDictIfEmpty(){
  var isEmpty = true;
  $('.letter-container input').each(function(i, obj){
    if($(this).val().trim() == ''){
      isEmpty = false;
    }
  });

  return isEmpty;
}

function honeyEncrypt(){
  var encryptMessage = $('#eHoneyText').val();
  console.log(encryptMessage);
  // Shift user dictionary
  shiftDict = arrayRotation.rotate(dictionary, parseInt($('#honeyShift').val()));
  // Check if dictionary is enabled
  if($('#dictToggle').prop('checked')){
    shiftDict = arrayRotation.rotate(userDict, parseInt($('#honeyShift').val()));
    console.log(encryptMessage);
  }
  // Dictionary & Shift
  encryptMessage = buildDictionary(encryptMessage)
  console.log(encryptMessage);
  // Base64
  encryptMessage = Buffer(encryptMessage).toString('base64');
  console.log(encryptMessage);
  // Hex
  encryptMessage = Buffer(encryptMessage).toString('hex');
  console.log(encryptMessage);
  // XOR
  encryptMessage = encryptXOR(encryptMessage);
  console.log(encryptMessage);
  // Base64
  encryptMessage = Buffer(encryptMessage).toString('base64');
  console.log(encryptMessage);
  $('#dHoneyText').val(encryptMessage);
}

function honeyDecrypt(){
  var decryptMessage = $('#dHoneyText').val();
  console.log(decryptMessage);
  // Base64
  decryptMessage = Buffer(decryptMessage, 'base64').toString();
  console.log(decryptMessage);
  // XOR
  decryptMessage = decryptXOR(decryptMessage);
  console.log(decryptMessage);
  // Hex
  decryptMessage = Buffer(decryptMessage, 'hex').toString();
  console.log(decryptMessage);
  // Base64
  decryptMessage = Buffer(decryptMessage, 'base64').toString();
  console.log(decryptMessage);

  // Dictionary & Shift
  if($('#dictToggle').prop('checked')){
    decryptMessage = decryptDictionary(decryptMessage);
    console.log(decryptMessage);
  } else {
    decryptMessage = shiftDecrypt(decryptMessage);
    console.log(decryptMessage);
  }
  $('#eHoneyText').val(decryptMessage);
}

function buildDictionary(message){
  var buffer = "";
  console.log(message.length);
  for(i = 0; i < message.length; i++){
    // Check if alphanumeric
    if(/\w/.test(message[i])){
      // Check if numeric
      if(/[0-9]/.test(message[i])){
        buffer += shiftDict[message[i].charCodeAt(0) - 48];
      }
      // Char is an alphabet
      else {
        // Char is in lowercase
        if(/[a-z]/.test(message[i])){
          buffer += shiftDict[message[i].toUpperCase().charCodeAt(0) - 55].toLowerCase();
        } else {
          buffer += shiftDict[message[i].toUpperCase().charCodeAt(0) - 55].toUpperCase();
        }
      }
    }else {
      buffer += message[i];
    }

  }

  return buffer;
}

function decryptDictionary(message){
  var buffer = "";
  var index;
  shiftDict = arrayRotation.rotateLeft(userDict, parseInt($('#honeyShift').val()));
  for(i = 0; i < message.length ; i++){
    index = shiftDict.indexOf(message[i].toUpperCase());
    if(index == -1){
      index = shiftDict.indexOf(message[i].toLowerCase());
    }
    if(index > -1){
      if(message[i] == message[i].toLowerCase()){
        buffer += dictionary[index].toLowerCase();
      } else {
        buffer += dictionary[index].toUpperCase();
      }
    } else {
      buffer += message[i];
    }
  }
  return buffer;

}

function shiftDecrypt(message){
  var buffer = "";
  var index;
  shiftDict = arrayRotation.rotate(dictionary, parseInt($('#honeyShift').val()));
  for(i = 0; i < message.length ; i++){
    index = shiftDict.indexOf(message[i].toUpperCase());
    if(index > -1){
      if(message[i] == message[i].toLowerCase()){
        buffer += dictionary[index].toLowerCase();
      } else {
        buffer += dictionary[index].toUpperCase();
      }
    } else {
      buffer += message[i];
    }
  }
  return buffer;
}
