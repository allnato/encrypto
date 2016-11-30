$('#caesarEncrypt').click(function(event) {
  var encryptMessage = $('#eTextArea').val().trim();
  var shiftVal = $('#shift').val().trim();

  if(encryptMessage == ""){
    caesarAlert("Please enter a text you want to encrypt.");
    return;
  }

  if(shiftVal == ""){
    caesarAlert("Please enter a shift value.");
    return;
  }

  $('#dTextArea').val(caesarShift(encryptMessage, parseInt(shiftVal)));
});

$('#caesarDecrypt').click(function(event) {
  var encryptMessage = $('#dTextArea').val().trim();
  var shiftVal = $('#shift').val().trim();

  if(encryptMessage == ""){
    caesarAlert("Please enter an encrypted message.");
    return;
  }

  if(shiftVal == ""){
    caesarAlert("Please enter a shift value.");
    return;
  }

  $('#eTextArea').val(caesarShift(encryptMessage, parseInt(shiftVal) * -1));
});

function caesarAlert(message){
  $('#caesarAlertContainer').empty();
  $('#caesarAlertContainer')
  .html(
    "<div class='alert alert-danger alert-dismissible text-center' role='alert' id='alertCaesar'>" +
      "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
      "<span aria-hidden='true'>&times;</span></button>" +
      "<strong>" + message + "</strong>" +
    "</div>"
  )
}
