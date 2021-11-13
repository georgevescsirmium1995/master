// Add mobile tables
[...document.querySelectorAll('#data>table')].forEach(table => {
    addMobileTable(table)
})
function addMobileTable(table) {
    // const target = document.querySelectorAll('')
    const [header, ...rows] = table.rows
    rows.forEach(row => {
        table.after(makeMobileTable(header, row))
    })
}
function makeMobileTable(header, row) {
    const table = document.createElement('table')
    table.classList.add('mobile') 

    Array.from(header.cells).forEach((th_element, indx) => {
        table.insertRow().append(
            th_element.cloneNode(true), 
            row.cells[indx].cloneNode(true)
        )
    })
    return table
}

// Handle Hamburger toggle
document.getElementById('hamburger-toggle').addEventListener('click', event => {
    const toggle = event.target
    

    toggle.value = toggle.value === "Off" ? "On" : "Off"
    toggleHamburgerMenu(toggle.value)
})
function toggleHamburgerMenu(toggle) {
    const menu = document.querySelector('.menu.mobile')
    const userPanel = document.getElementById('user-panel')
    const sidePanel = document.getElementById('side-panel')
    menu.dataset.toggle = toggle
    if(toggle === "On"){
        menu.style.backgroundPosition = '-80% 0';
        userPanel.style.transform = 'translateX(0)'
        sidePanel.style.transform = 'translateX(0%)'
    }
    if(toggle === "Off"){
        menu.style.backgroundPosition = 'center';
        userPanel.style.transform = 'translateX(100%)'
        sidePanel.style.transform = 'translateX(100%)'
    }
}

// Set current date
const setDate = (() => {
    const today = new Date()
    const date = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`
    document.querySelectorAll('.current-date').forEach((date_elm) => {
        date_elm.innerHTML = date
    })
})();


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
