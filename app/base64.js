$('#base64Encrypt').click(function(event) {
  $('#base64AlertContainer').empty();
  var encryptMessage = $('#eBase64Text').val().trim();

  if(encryptMessage == ""){
    base64Alert("Please enter a text you want to encrypt.");
    return;
  }

  $('#dBase64Text').val(Buffer(encryptMessage).toString('base64'));
});

$('#base64Decrypt').click(function(event) {
  $('#base64AlertContainer').empty();
  var encryptMessage = $('#dBase64Text').val().trim();

  if(encryptMessage == ""){
    base64Alert("Please enter an encrypted message.");
    return;
  }

  $('#eBase64Text').val(Buffer(encryptMessage, 'base64').toString());
});

function base64Alert(message){
  $('#base64AlertContainer').empty();
  $('#base64AlertContainer')
  .html(
    "<div class='alert alert-danger alert-dismissible text-center' role='alert' id='alertCaesar'>" +
      "<button type='button' class='close' data-dismiss='alert' aria-label='Close'>" +
      "<span aria-hidden='true'>&times;</span></button>" +
      "<strong>" + message + "</strong>" +
    "</div>"
  )
}
