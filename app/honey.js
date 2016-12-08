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
  // Shift user dictionary
  shiftDict = arrayRotation.rotate(dictionary, parseInt($('#honeyShift').val()));
  // Check if dictionary is enabled
  if($('#dictToggle').prop('checked')){
    shiftDict = arrayRotation.rotate(userDict, parseInt($('#honeyShift').val()));
  }
  encryptMessage = buildDictionary(encryptMessage)
  console.log(encryptMessage);
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
