console.log( 'js' );
var currentKoala = 0;

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    var nameIn = $('#nameIn').val();
    var ageIn = $('#ageIn').val();
    var sexIn = $('#sexIn').val();
    var readyForTransferIn = $('#readyForTransferIn').val();
    var notesIn = $('#notesIn').val();
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: nameIn,
      age: ageIn,
      sex: sexIn,
      readyForTransfer: readyForTransferIn,
      notes: notesIn,
    };
    console.log('object to send', objectToSend);
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
  //start edit process
  $('#editButton').on('click', function () {
    //get edits
    var nameEditIn = $('#nameEditIn').val();
    var ageEditIn = $('#ageEditIn').val();
    var sexEditIn = $('#sexEditIn').val();
    var readyForTransferEditIn = $('#readyForTransferEditIn').val();
    var notesEditIn = $('#notesEditIn').val();
    console.log(nameEditIn, ageEditIn, sexEditIn, readyForTransferEditIn);

  });//end editButton
  $('body').on('click', '#selectKoala', function () {
    console.log('in button click');
    currentKoala = $(this).attr('data');
    console.log(currentKoala);
  });
}); // end doc ready

var getKoalas = function(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/getKoalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      displayKoalas(data);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
};// end getKoalas

var saveKoala = function( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/addKoala',
    type: 'post',
    data: newKoala,
    success: function( data ){
      console.log( 'save some koalas: ', data.success );
      if (data.success){alert('Koala successfully added!');}
      getKoalas();
    } // end success
  }); //end ajax

};

var displayKoalas = function (koalas) {
  $('#viewKoalas').html('');
  for (var i = 0; i < koalas.length; i++) {
    var nameDisplay = koalas[i].name;
    var sexDisplay = koalas[i].sex;
    var ageDisplay = koalas[i].age;
    var readyForTransferDisplay = koalas[i].readyfortransfer;
    var notesDisplay = koalas[i].notes;
    console.log('display: ', nameDisplay, sexDisplay, ageDisplay, readyForTransferDisplay, notesDisplay);

    $('#viewKoalas').append('<p>Name: ' + nameDisplay + "</p><button data=" + i + " id='selectKoala'>Select</button><p>Sex: " + sexDisplay + "</p><p>Age: " + ageDisplay + "</p><p>Ready for Transfer: " + readyForTransferDisplay + '</p><p>Noes: ' + notesDisplay + "</p><br>");
  }
};
