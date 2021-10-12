function is_integer(number)
{
    if (Number.isInteger(number) && number>=0) return true;
    return false;
}

function is_valid_date(dateString) {
    var patt = new RegExp(/^([0-2][0-9]{3})\-(0[1-9]|1[0-2])\-([0-2][0-9]|3[0-1]) ([0-1][0-9]|2[0-3]):([0-5][0-9])\:([0-5][0-9])( ([\-\+]([0-1][0-9])\:00))?$/);
    return patt.test(dateString);
}

var html_new_line = "<br/>";
var html_li_open = "<li>";
var html_li_closed = "</li>";
var html_ul_open = "<ul class=\"error-message-edit\">";
var html_ul_closed = "</ul>";

$( document ).ready(function() {

    // init datepicker

    $("#single_date").datepicker(
        {
            dateFormat: "yy-mm-dd"
        }
    );

    $("#date_from").datepicker(
        {
            dateFormat: "yy-mm-dd"
        }
    );

    $("#date_to").datepicker(
        {
            dateFormat: "yy-mm-dd"
        }
    );

    // register button clicks

    $("#user-panel-label").click(function(){
        $("#edit-user-password-modal").css("display","block");
    }); 

    $("#user-btn-cancel").click(function(){
        $("#edit-user-password-modal").css("display","none");
    }); 

    $("#edit-btn-cancel").click(function(){
        $("#edit-record-modal").css("display","none");
    }); 

    $("#select-eng-button").click(function(){
        $("#select-eng").trigger('submit');
    });
    $("#select-srb-button").click(function(){
        $("#select-srb").trigger('submit');
    });
    $("#select-ger-button").click(function(){
        $("#select-ger").trigger('submit');
    });
});


// delete record function

function delete_record(id)
{ 
    confirmation( $("#delete_record_dialog_message").val(), $("#delete_record_dialog_title").val(), $("#delete_record_dialog_confirm").val(), $("#delete_record_dialog_cancel").val() )
    .then( function( answer ) 
        {
        
        }
    );
}

// edit record function

function edit_record(id)
{
    $("#edit-record-modal").css("display","block");
}

// javascript confirmation dialog (Yes / No)

function confirmation( question, title, confirm, cancel) {
    var defer = $.Deferred();
    $( '<div></div>' )
    .html( question )
    .dialog( {
      autoOpen    : true,
      modal       : true,
      title       : title,
      dialogClass : "no-close",
      buttons : [
          {
            text : confirm,
            click : function () {
                defer.resolve( true );
                $( this ).dialog( 'close' );
            }
          },
          {
            text : cancel,
            click : function () {
                defer.resolve( false );
                $( this ).dialog( 'close' );
            }
        }
      ],
      open        : function( event, ui ) {
                      $( '.no-close .ui-dialog-titlebar-close' )
                      .css( 'display', 'none' );
                    },
      close       : function () {
                      $( this ).dialog( 'destroy' ).remove();
                    }
    } );
    return defer.promise();
  }

// javascript confirmation dialog (OK)

  function information( information, title, confirm, width) {
    var defer = $.Deferred();
    $( '<div></div>' )
    .html( information )
    .dialog( {
      width       : width,
      autoOpen    : true,
      modal       : true,
      title       : title,
      dialogClass : "no-close",
      buttons : [
        {
          text : confirm,
          click : function () {
              defer.resolve( true );
              $( this ).dialog( 'close' );
          }
        }
    ],
      open        : function( event, ui ) {
                      $( '.no-close .ui-dialog-titlebar-close' )
                      .css( 'display', 'none' );
                    },
      close       : function () {
                      $( this ).dialog( 'destroy' ).remove();
                    }
    } );
    return defer.promise();
}
