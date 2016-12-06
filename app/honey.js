// /[A-Z]|[a-z]/.test('g')

const dictionary = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

// Edit Button is clicked
$('#honeyEdit').click(function(event) {
  // Remove apply changes btn's disabled attr.
  $('#honeyApply').removeAttr('disabled');
  // Remove all readonly on input
  $('.letter-container input').removeAttr('readonly');
});

$('#honeyApply').click(function(event) {
  // Add readonly attr. in inputs.
  $('.letter-container input').attr('readonly', 'readonly');
  // Add disabled attr. in apply btn.
  $('#honeyApply').attr('disabled', 'disabled');
});
