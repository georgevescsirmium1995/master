

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

    $(".user-panel-label").click(function(){
        $("#edit-user-password-modal").css("display","block");
    }); 

    $("#user-btn-cancel").click(function(){
        $("#edit-user-password-modal").css("display","none");
    }); 

    $("#edit-btn-cancel").click(function(){
        $("#edit-record-modal").css("display","none");
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
