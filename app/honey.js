// /[A-Z]|[a-z]/.test('g')
// $('.letter-container input').each(function(i, obj){
// console.log($(this).val() + " " + i);
// });
//
//

const dictionary = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
'R','S','T','U','V','W','X','Y','Z');

var userDict = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
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

function checkDictIfEmpty(){
  var isEmpty = true;
  $('.letter-container input').each(function(i, obj){
    if($(this).val().trim() == ''){
      isEmpty = false;
    }
  });

  return isEmpty;
}
