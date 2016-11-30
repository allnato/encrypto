$('#hexEncrypt').click(function(event) {
  $('#hexAlertContainer').empty();
  var encryptMessage = $('#eHexText').val().trim();

  if(encryptMessage == ""){
    hexAlert("Please enter a text you want to encrypt.");
    return;
  }

  $('#dHexText').val(Buffer(encryptMessage).toString('hex'));
});

$('#hexDecrypt').click(function(event) {
  $('#hexAlertContainer').empty();
  var encryptMessage = $('#dHexText').val().trim();

  if(encryptMessage == ""){
    hexAlert("Please enter an encrypted message.");
    return;
  }

  try{
    $('#eHexText').val(Buffer(encryptMessage, 'hex').toString());
  }catch(err){
    hexAlert('Invalid Hex String')
  }
});

function hexAlert(message){
  $('#hexAlertContainer').empty();
  $('#hexAlertContainer')
  .html(
    "<div class='alert alert-danger alert-dismissible text-center' role='alert' id='alertCaesar'>" +
      "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
      "<span aria-hidden='true'>&times;</span></button>" +
      "<strong>" + message + "</strong>" +
    "</div>"
  )
}
