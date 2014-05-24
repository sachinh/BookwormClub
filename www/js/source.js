/*
 * Global Variables
 *
 *
 *
 */

var orientationMode = "";

// to track if in new/update mode
var $isUpdate = "";

var $pgThreeInit = "";

var autoFocusSupported = -1;

var empty_flds ;

var connectionStatus = 'not_detected';

/*
 * Page Event Handlers
 *
 *
 *
 */


$(function () {
  // setup for orintation change
  window.addEventListener('orientationchange', doOnOrientationChange);
  // Initial execution if needed
  doOnOrientationChange();
  
  // on ready, retrieve all book reports
  getBookReports();
  //  setupBarCodeEvents();
  $("[data-role=header]").fixedtoolbar({ tapToggle: false });
  $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
  
  // Coded: Sachin Holla
  // On: 01/23/2014
  // Purpose: to fix the extra line in the non-header bar
  // Fixes issue: https://github.com/sachinh/BookwormClub/issues/28
  
  // try and trigger a refresh to see if the header bar problem is resolved
  $( '#badge' ).trigger( 'updatelayout' );
  //Code change ends: on 01.23.2014
  
  //MYCHANGE
  document.addEventListener("offline", onOffline, false);
  document.addEventListener("online", onOnline, false);
  
});

$( '#one' ).live( 'pageinit',function(event){
                 
                 // to create the popup on page load
                 console.log("just enterd the page load fn");
                 
                 // Change by Sachin on 01.19.2014
                 // Remove the section to do the popup dialog
                 /*
                 //now check if this is the first time EVER used
                 
                 var isFirstTime = "true";
                 isFirstTime = localStorage.isFirstTime ;

                 if (isFirstTime != undefined)
                    return;
                 
                 // this means its the first time
                 setTimeout( function(){
                            localStorage.setItem('isFirstTime',"false");
                            $.mobile.changePage("#dlgFirstTimeOnly", { role: "dialog", closeBtn: "none" });
                            //$("#popupFirstTime").popup("open");
                            }, 1000);
                 console.log("finished the popup stuff");
                 */
                 
                 });

$( '#dlgFirstTimeOnly' ).live( 'pageinit',function(event){
                 
                 // to create the popup on page load
                 console.log("just enterd the page load fn");
                 setTimeout( function(){ $("#dlgFirstTimeOnly").dialog("close"); }, 10000 );
                 console.log("finished the popup stuff");
                 
                 });

$( '#two' ).live( 'pageinit',function(event){
                 
                       // to create the popup on page load
                       console.log("just enterd the page load fn");
                       //setTimeout( function(){ $("#popupPanel").popup("open"); }, 1000 );
                       console.log("finished the popup stuff");
                       
                       });

$( '#two' ).live( 'pageinit',function(event){
                 // this is when the cordova piece should have loaded fine
                 autoFocusSupported = isAutoFocusSupported() ;
                 //alert(autoFocusSupported);
                 });


$("#two").swipeleft(function() {
                    $.mobile.changePage("#three", {
                                        allowSamePageTransition : true,
                                        transition: "flip"
                                        } );
                    });
$("#three").swiperight(function() {
                       $.mobile.changePage("#two", {
                                           allowSamePageTransition : true,
                                           transition: "flip"
                                           } );
                       });

$( '#three' ).live( 'pageinit',function(event){
                 
                 // to create the popup on page load
                 console.log("just enterd the page load fn");
                 //setTimeout( function(){ $("#popupPanelR").popup("open"); }, 1000 );
                 console.log("finished the popup stuff");
                 
                 });

// update the values accordingly
$('#three').live('pagecreate',function(event){
                 $pgThreeInit="complete";
                 });


$( "#popupFirstTime" ).on({
                      popupbeforeposition: function() {
                      var h = $( window ).height();
                      
                      $( "#popupFirstTime" ).css( "height", h );
                      }
                      });

$( "#popupPanel" ).on({
                      popupbeforeposition: function() {
                      var h = $( window ).height();
                      
                      $( "#popupPanel" ).css( "height", h );
                      }
                      });

$( "#popupPanelR" ).on({
                      popupbeforeposition: function() {
                      var h = $( window ).height();
                      
                      $( "#popupPanelR" ).css( "height", h );
                      }
                      });

$( "#popupFirstTime" ).bind({
                        popupafteropen: function(event, ui) {
                        console.log("popupFirstTime: after open");
                        setTimeout( function(){ $("#popupFirstTime").popup("close"); }, 3000 );
                        console.log("popupFirstTime: after setting timeout");
                        }
                        });

$( "#popupPanel" ).bind({
                        popupafteropen: function(event, ui) {
                        console.log("popupanel: after open");
                        setTimeout( function(){ $("#popupPanel").popup("close"); }, 3000 );
                        console.log("popuppanel: after setting timeout");
                        }
                        });

$( "#popupPanelR" ).bind({
                         popupafteropen: function(event, ui) {
                         console.log("popupanel: after open");
                         setTimeout( function(){ $("#popupPanelR").popup("close"); }, 3000 );
                         console.log("popuppanel: after setting timeout");
                         }
                         });


$( "#popupBadges" ).bind({
                         popupafteropen: function() {
                         
                         var userMessage = "Not detected";
                         userMessage = retrieveBadgeDescription();
                         $("#msgBadges").html(userMessage);
                         
                         }
                         
                         });

/*
 * Primary Button Event Handlers
 *
 */


$("#createBookReport").click(function() {
                             //now reset the values to the placeholders
                             
                             // check for the bookID
                             rowCount=0;
                             if (!isNaN(localStorage.rowCount)){
                             // this means the data store is populated
                             // only then try and parse the rowCount value
                             rowCount=parseInt(localStorage.rowCount);
                             }
                             else {
                             // this means there is no data store yet
                             rowCount=0
                             }
                             
                             //set the mode to be new
                             $isUpdate = "false";
                             
                             $("#imgCapturedImage").attr("src","img/placeholder.png");
                             $("#imgUserImage").attr("src","img/blankimage.png");
                             $("#bkID").val(rowCount);
                             
                             $("#bkName").val("");
                             $("#auName").val("");
                             $("#pages").val("");
                             $("#mainCharacters").val("");
                             // removing the plot summary for now
                             //reset the slider to off
                             $('#chkLike').val('No').slider('refresh');
                             // reset new fields too
                             $("#bkSetting").val("");
                             $("#bkConflict").val("");
                             $("#bkConclusion").val("");
                             $("#bkReasonWhy").val("");
                             //reset the ratings field too.
                             $("#lblAvgRating").html("");
                             
                             // change the header to be 'Book report Detail'
                             $("#hdrTitle2").text("New Book Report");
                             // also disable the Save report button
                             
                             // now disable the email button
                             $(".emailBkReport").closest('.ui-btn').hide();
                             $(".deleteBkReport").closest('.ui-btn').hide();
                             
                             });

$('.deleteBkReport').click(function(event) {
                           // delete the report
                           console.log("in delete report click");
                           
                           // now look for the id and lets make sure its not the same as the last record
                           $bookID = $('#bkID').val();
                           $rowCount = localStorage.rowCount;
                           console.log("ID: " + $bookID + ", rowCount= " + $rowCount);
                           
                           //prefix 'bkReport' to the id value since that is how it is stored in the detail page-field
                           if ($bookID != "")
                           $bookID = "bkReport" + $bookID ;
                           console.log("bkReport ID: " + $bookID );
                           
                           // now retrieve the bkreport from storage
                           var bkReport = localStorage.getItem($bookID);
                           console.log('deleteBkReport object: ', bkReport);
                           
                           //extract the actual values
                           if (bkReport == null) {
                           // this means there is no saved data for this ID
                           
                           // Coded: Sachin Holla
                           // On: 01/23/2014
                           // Purpose: to use consistent popups for user facing messages
                           // Fixes issue: https://github.com/sachinh/BookwormClub/issues/33
                           
                           //navigator.notification.alert('To delete, pl. save Book Report first.', null, 'New Book Report');
                           
                           // now get the ID of the button click
                           var delBtnID = $(this).attr("id");
                           
                           if (delBtnID == 'deleteScreen2'){
                           // set the user message in the appropriate popup and display popup
                           $('#popupUserScreen2').attr('data-position-to','window');
                           $('#userMessage2').html("<p><b>Invalid Action:</b><br/>You can only delete a previously saved Book Report.");
                           $('#popupUserScreen2').popup( "open" );
                           }
                           else if (delBtnID == 'deleteScreen3'){
                           // set the user message in the appropriate popup and display popup
                           $('#popupUserScreen3').attr('data-position-to','window');
                           $('#userMessage3').html("<p><b>Invalid Action:</b><br/>You can only delete a previously saved Book Report.");
                           $('#popupUserScreen3').popup( "open" );
                           
                           }
                           else {
                           navigator.notification.alert('MSG-01: There is an error, pl. report this to the developer');
                           }
                           // Code Change end: on 01/23/2014
                           
                           return ;
                           }
                           else {
                           // remove the item
                           localStorage.removeItem($bookID);
                           //
                           console.log("all done with the removal so now should eb able to go back to the first screen");
                           //return to the main page with a refresh first
                           getBookReports();
                           
                           // change the actual page
                           $.mobile.changePage( "#one", {
                                               allowSamePageTransition : true,
                                               transition: "flip"
                                               } );
                           // all done here
                           }
                           });

function showBookReportPDFAlertDismissed(){
    
    //alert('in callback fn');
    // use the value stored in the global variable
    // create the PDF
    createPDF(emailBookReportID);
    //alert("after createpdf fn");
    
}

$('.emailReport').live('click', function(event) {
                       // email the report from the list screen
                       console.log("email report clicked");
                       console.log("id= " + $(this).attr("id"));
                       
                       /*
                        * Change made by Sachin on 03/22/2014
                        * Purpose: to add in PDF creation and display functions
                        *
                        */
                       emailBookReportID = $(this).attr("id");
                       
                       navigator.notification.alert(
                                                    'See The Book Report before sending the email out',  // message
                                                    showBookReportPDFAlertDismissed,         // callback
                                                    'Email your Book Report',            // title
                                                    'View Book Report'                  // buttonName
                                                    );
                       
                       // first create the PDF
                       //createPDF($(this).attr("id"));
                       
                       //alert('second');
                       // now display the PDF
                       //displayPDF('/Users/sachinholla/Library/Application Support/iPhone Simulator/7.0.3/Applications/E1066E6D-BC08-47B9-A8C0-9F854C704731/Documents/test.pdf');
                       /*
                        * End Changes
                        */
                       //emailBookReport($(this).attr("id"));
                       console.log("finished the email setup");
                       
                       });

// again for the Save button don't function id but class instead
$('.save-btn').click(function(event) {
                     console.log ("in Save click");
                     //check for empty fields
                     checkForEmptyFields();
                     if (empty_flds!=""){
                     //alert("Required Fields Missing: Please fill in " + empty_flds);
                     
                     // now implement the popup
                     $('#popupUserScreen2').attr('data-position-to','#auName');
                     $('#userMessage2').html("<p><b>Required Fields Missing:</b><br/>Please fill in <i>" + empty_flds + "</i>");
                     $('#popupUserScreen2').popup( "open" );
                     
                     return 0;
                     }
                     
                     console.log("past the empty fields check");
                     
                     // setup info from fields
                     var bookID=$("#bkID").val();
                     var bookName=$("#bkName").val();
                     var authorName=$("#auName").val();
                     var noOfPages=$.trim($("#pages").val());
                     if (isNaN(noOfPages))
                     noOfPages=0;
                     else
                     {
                     if (noOfPages<=0)
                     noOfPages=0;
                     }
                     
                     var mainCharactersinPlot=$("#mainCharacters").val();
                     // removing the plot summary for now
                     var boolLiked=$("#chkLike").val();
                     // now get the new fields too
                     var bookSetting=$("#bkSetting").val();
                     var bookConflict=$("#bkConflict").val();
                     var bookConclusion=$("#bkConclusion").val();
                     var likedReason=$("#bkReasonWhy").val();
                     // lets also store the book cover from the barcode scan, if available
                     var capturedImage = $("#imgCapturedImage").attr("src");
                     // lets store the user image too
                     var userImage = $("#imgUserImage").attr("src");
                     // lets store the avg ratings too - will be hepful for retrieval and such
                     var bkRating = $("#lblAvgRating").html();
                     // now we are going to set these values in the localstorage
                     //lets check if there exists a data store or not
                     console.log("no of pages: " + noOfPages);
                     // now save the new 'record'
                     
                     //try and create the object dynamically
                     var bkReport = new Object;
                     bkReport.id = bookID;
                     bkReport.book = bookName;
                     bkReport.author = authorName;
                     bkReport.pages = noOfPages;
                     bkReport.characters = mainCharactersinPlot;
                     // removing the plot summary for now
                     bkReport.liked = boolLiked;
                     //add new fields too
                     bkReport.setting = bookSetting;
                     bkReport.conflict = bookConflict;
                     bkReport.conclusion = bookConclusion;
                     bkReport.likedReason = likedReason;
                     bkReport.cover = capturedImage;
                     bkReport.userdrawing = userImage;
                     //set the ratings too
                     bkReport.rating = bkRating;
                     
                     //add the created timestamp for new records
                     console.log ('In Save: Value of isUpdate flag: ' + $isUpdate);
                     if ($isUpdate=="false") {
                        console.log ('In Save: this is a new record');
                        // now add the created timestamp into the object
                        bkReport.created = timeStamp();
                        // also add the created user too
                        var userName = "";
                        userName = $("#userName").html();
                        console.log ('In Save: this is the user name: ' + userName);
                        bkReport.createdBy = userName;
                     }
                     
                     console.log('In Save fn: bkReport: ' , bkReport);
                     console.log("in Save fn: isSave= " + $isUpdate);
                     if ($isUpdate=="true") {
                     // remove the old item and then add the new one
                     localStorage.removeItem('bkReport'+bookID);
                     console.log("in save fn: finished removeing the old item: bkReport"+bookID);
                     localStorage.setItem('bkReport'+bookID, JSON.stringify(bkReport));
                     console.log("in save fn: finished adding the updated item: bkReport"+bookID);
                     }
                     else
                     localStorage.setItem('bkReport'+bookID, JSON.stringify(bkReport));
                     
                     // dow the rowcount business only if a new record
                     if ($isUpdate=="false") {
                     //increment rowcount
                     rowCount=parseInt(bookID)+1;
                     localStorage.setItem('rowCount', rowCount);
                     }
                     
                     // data store populated now
                     console.log('bkReport' + bookID + ': ', JSON.parse(localStorage.getItem('bkReport'+bookID)));
                     console.log('RowCount: ' + localStorage.rowCount);
                     
                     // now refresh and return
                     
                     //now reset the values to the placeholders
                     // check for the bookID
                     rowCount=0;
                     if (localStorage.rowCount){
                     // this means the data store is populated
                     // only then try and parse the rowCount value
                     rowCount=parseInt(localStorage.rowCount);
                     }
                     
                     $("#imgCapturedImage").attr("src","img/placeholder.png");
                     $("#imgUserImage").attr("src","img/blankimage.png");
                     
                     $("#bkID").val(rowCount);
                     
                     $("#bkName").val("");
                     $("#auName").val("");
                     $("#pages").val("");
                     $("#mainCharacters").val("");
                     // removing the plot summary for now
                     //reset the slider to off with a check for the third page
                     if ($pgThreeInit=="")
                     $('#chkLike').val('No');
                     else
                     $('#chkLike').val('No').slider('refresh');
                     
                     // reset the new fields too
                     $("#bkSetting").val("");
                     $("#bkConflict").val("");
                     $("#bkConclusion").val("");
                     $("#bkReasonWhy").val("");
                     // reset the ratings field too
                     $("#lblAvgRating").html("");
                     
                     //return to the main page with a refresh first
                     getBookReports();
                     
                     // change the actual page
                     $.mobile.changePage( "#one", {
                                         allowSamePageTransition : true,
                                         transition: "flip"
                                         } );
                     
                     // nothing more to do here
                     
                     });

$('.emailBkReport').click(function(event) {
                          console.log("in the email button click from the detail screen");
                          $strBookID= $("#bkID").val();
                          
                          if ($strBookID != "") {
                          //prefix 'bkReport' to the id value since that is how it is stored in the detail page-field
                          $strBookID = "bkReport" + $strBookID ;
                          console.log("strBookID: " + $strBookID);
                          
                          // Coded: Sachin Holla
                          // On: 01/23/2014
                          // Purpose: to use consistent popups for user facing messages
                          // Fixes issue: https://github.com/sachinh/BookwormClub/issues/33
                          // retrieve the button ID here and pass on to helper function
                          var emailBtnID = $(this).attr("id") ;
                          //alert(emailBtnID);
                          
                          // now call the email routine
                          emailBookReport($strBookID, emailBtnID);
                          // Code change end: 01/23/2014
                          }
                          else
                          navigator.notification.alert("MSG-03: Invalid Book Report. This should never occur, pl. report this to the developer");
                          });

$('.sendFeedback').click(function(event) {
                         // send an email to the developer
                         feedbackSubject = "Feedback on Bookworm Club App";
                         feedbackBody = "Hi,<br/>I'm a current user of your app. Here are some thoughts on your Bookworm Club App:<br/>" +
                         "<b>Love:</b><br/><br/>" +
                         "<b>Hate:</b><br/><br/>" +
                         "<p>And here's what I would really really like:<br/><br/>" +
                         "Thanks" ;
                         
                         // Coded: Sachin Holla On: 01/23/2014
                         // Purpose: to use a custom email account for app feedback
                         // Fixes issue: https://github.com/sachinh/BookwormClub/issues/51
                         developerEmail = "bookwormclubapp" + "@" + "gmail.com" ;
                         
                         sendEmail(feedbackSubject, feedbackBody, developerEmail) ;
                         });

/*
 * Other Input Event Handlers
 *
 */

$('.bookReportItem').live('click', function(event) {
                          // POA: extract the id and populate the fields and then change the page
                          // first extract the id
                          console.log('value of this id: ' + $(this).attr("id"));
                          // now extract the values from the storage and set the values to the fields in page2
                          // start finding the objects
                          var bkReport = localStorage.getItem($(this).attr("id"));
                          console.log('bkReport object: ', bkReport);
                          //extract the actual values
                          if (bkReport == null) {
                          console.log('invalid object ' );
                          }
                          else {
                          //set the mode to be update
                          $isUpdate = "true";
                          // now try and do a dump on the console
                          bkReport = JSON.parse(bkReport);
                          // get the id
                          $idValue=bkReport.id;
                          console.log("localstorage has ID: " + $idValue );
                          if(isNaN($idValue)) {
                          // never should really happen but its more of a legacy issue probably
                          strIndexedBookID=$(this).attr("id");
                          
                          console.log("the stored ID in HTML is: " + strIndexedBookID);
                          ipostBkReport = 8; // ID is stored as "bkReport"
                          console.log(strIndexedBookID.substring(8))
                          iIndexedBookID = parseInt(strIndexedBookID.substring(ipostBkReport));
                          console.log("the new ID is: " + iIndexedBookID);
                          // now set the value of the new ID
                          $idValue = iIndexedBookID;
                          }
                          console.log('id: '+ $idValue);
                          console.log('book: '+ bkReport.book);
                          console.log('author: '+ bkReport.author);
                          console.log('pages: '+ bkReport.pages);
                          
                          //now set the values in the detail page
                          $("#bkID").val($idValue);// no putting in bkreport prefix
                          $("#bkName").val(bkReport.book);
                          $("#auName").val(bkReport.author);
                          $("#pages").val(bkReport.pages);
                          $("#mainCharacters").val(bkReport.characters);
                          // removing the plot summary for now
                          console.log("liked: " + bkReport.liked);
                          console.log("pgThreeInit" + $pgThreeInit);
                          
                          if (bkReport.liked=="Yes"){
                          console.log("in the yes block for liked");
                          
                          //set the value for the slider button to ON
                          //check if page two has been launched
                          if ($pgThreeInit=="") {
                          console.log("pg3 has not been init");
                          $('#chkLike').val('Yes');
                          console.log("after setting the slider - yes");
                          }
                          else {
                          console.log("pg3 has been init");
                          $('#chkLike').val('Yes');
                          $('#chkLike').slider('refresh');
                          console.log("after setting the slider - yes");
                          }
                          }
                          else {
                          console.log("in the no block for liked");
                          
                          //set the value for the slider button to OFF
                          //check if page two has been launched
                          if ($pgThreeInit=="")
                          $('#chkLike').val('No');
                          else
                          $('#chkLike').val('No').slider('refresh');
                          }
                          console.log("finished setting the liked slider");
                          //now update the new fields too
                          $("#bkSetting").val(bkReport.setting);
                          $("#bkConflict").val(bkReport.conflict);
                          $("#bkConclusion").val(bkReport.conclusion);
                          $("#bkReasonWhy").val(bkReport.likedReason);
                          // now set the cover-image too
                          $imgBookCover = bkReport.cover;
                          console.log("scanned image: " + $imgBookCover);
                          
                          if ($imgBookCover=="")
                          $imgBookCover = "img/placeholder.png" ;
                          $("#imgCapturedImage").attr("src", $imgBookCover);
                          
                          // now set the user-image too
                          $imgUserImage = bkReport.userdrawing;
                          console.log("scanned user image: " + $imgUserImage);
                          
                          if (($imgUserImage=="") || ($imgUserImage==undefined))
                          $imgUserImage = "img/blankimage.png" ;
                          $("#imgUserImage").attr("src", $imgUserImage);
                          
                          //now set the ratings value too
                          $bookRating = bkReport.rating;
                          if ($bookRating == undefined)
                          $bookRating = "";
                          $("#lblAvgRating").html($bookRating);
                          
                          // change the header to be 'Book report Detail'
                          $("#hdrTitle2").text("Book Report Detail");
                          // also disable/hide the Save report button
                          $(".emailBkReport").closest('.ui-btn').show();
                          $(".deleteBkReport").closest('.ui-btn').show();
                          
                          console.log("just before changing the page");
                          console.log("bkID: " + $("#bkID").val());
                          //now navigate to the detail page
                          $.mobile.changePage( "#two", { 
                                              allowSamePageTransition : true,
                                              transition: "flip"
                                              } );
                          
                          // done	
                          }
                          });

$('.helpPopup').click(function(event) {
                      var helpFieldID = $(this).attr('id') ;
                      var helpMessage = "<p>Dynamic HTML!</p>";
                      var pageHelp = "three";
                      
                      if (helpFieldID == "helpTextarea")
                        helpMessage = "<p>Textarea help message which can go on and on and then some ...</p>";
                      else if (helpFieldID == "helpMainCharacters")
                        helpMessage = "<b>Main Characters</b><p>Who are the main characters in the book ?</p>";
                      else if (helpFieldID == "helpSetting")
                        helpMessage = "<b>Setting</b><p>Where did this story take place?<br/>Name and describe the place where the story happened.</p>";
                      else if (helpFieldID == "helpConflict")
                        helpMessage = "<b>Conflict</b><p>What was the action in the story?<br/>What gave the story a beginning,middle, and end?</p>";
                      else if (helpFieldID == "helpConclusion")
                        helpMessage = "<b>Conclusion</b><p>How did the story end?<br/>Was it funny, sad, or something else?</p>";
                      else if (helpFieldID == "helpReasonWhy")
                        helpMessage = "<b>Reason to like/dislike book</b><p>Why did you like the book or <br/>why did you not like the book?</p>";
                      else if (helpFieldID == "helpBookName") {
                        helpMessage = "<b>Book Name</b><p>What is the name of the Book ?</p>";
                        pageHelp = "two";
                      }
                      else if (helpFieldID == "helpAuthorName") {
                      helpMessage = "<b>Author Name</b><p>What is the name of the Author ?</p>";
                      pageHelp = "two";
                      }
                      else if (helpFieldID == "helpNumPages") {
                      helpMessage = "<b>Pages</b><p>How many Pages ?</p>";
                      pageHelp = "two";
                      }
                      // Coded: Sachin Holla
                      // On: 01/23/2014
                      // Purpose: to use consistent popups for user facing messages
                      // Fixes issue: https://github.com/sachinh/BookwormClub/issues/39
                      else if (helpFieldID == "helpSaveSketch") {
                      helpMessage = "<b>Save Sketch</b><p>Use your iPad camera to capture your sketch. <br/><br/>Sketches can be your drawing of the book cover, plot or your favourite part in the book.</p>";
                      }
                      // Code Change end: on 01/23/2014
                      
                      if (pageHelp == "two") {
                        $("#msgHelpPg2").html(helpMessage);
                        $("#helpPopupDialogPg2").popup("open", { transition: 'pop', positionTo: 'origin' } );
                      }
                      else {
                        $("#msgHelpPg3").html(helpMessage);
                        $("#helpPopupDialogPg3").popup("open", { transition: 'pop', positionTo: 'origin' } );
                      }

                      });


$('.mlInput').blur(function(e) {
                   inputStr = $(this).val() ;
                   if (inputStr == "")
                   return ;
                   wordsCounted = countWords(inputStr) ;
                   if (wordsCounted<=10) {
                   
                   // Coded: Sachin Holla
                   // On: 01/23/2014
                   // Purpose: to use consistent popups for user facing messages
                   // Fixes issue: https://github.com/sachinh/BookwormClub/issues/33
                   
                   var fldID = $(this).attr('id');
                   if (fldID !=''){
                   $('#popupUserScreen3').attr('data-position-to',$(this).attr('id'));
                   }
                   $('#userMessage3').html("<p><b>Insufficient Input:</b><br/>You have entered 10 words or less. Pl. add to your answer.");
                   $('#popupUserScreen3').popup( "open" );
                   
                   //navigator.notification.alert('You have entered 10 words or less. Pl. add to your answer.', null, 'Answer Length');
                   // Code Change end: on 01/23/2014
                   
                   return false;
                   }
                   });

/*
$("#lnkDialogOpen").click(function() {
                          alert('in privacyclick');
                          if (connectionStatus == 'online'){
                            //open dialog
                          $("#dialog").dialog( "open");
                          
                          }
                          else
                            alert('No Network Connectivity. This feature is not available currently!');


});
*/

$("#scan-button").click(function() {
                        // setup to handle the barcode scanning
                        
                        if (!autoFocusSupported) {
                        
                        // Coded: Sachin Holla
                        // On: 01/23/2014
                        // Purpose: to use consistent popups for user facing messages
                        // Fixes issue: https://github.com/sachinh/BookwormClub/issues/33
                        $('#popupUserScreen2').attr('data-position-to','#scan-button');
                        $('#userMessage2').html("<p><b>No Auto Focus Camera detected:</b><br/>Barcode scanning will not work");
                        $('#popupUserScreen2').popup( "open" );
                        return;
                        
                        //navigator.notification.alert("Barcode scanning may not work", null, "No Auto Focus Camera detected");
                        
                        // Code Change end: on 01/23/2014
                        }
                        clickScan();
                        });

/*
 *
 * Coded: Sachin Holla
 * On: 01/23/2014
 * Purpose: This enforces only numeric values in the pages field
 * Fixes issue: https://github.com/sachinh/BookwormClub/issues/30
 * Corner Case: How to prevent paste into the field ?
 *
 */

$('#pages').keypress(function(e) {
                     var a = [];
                     var k = e.which;
                     
                     for (i = 48; i < 58; i++)
                     a.push(i);
                     
                     if (!(a.indexOf(k)>=0))
                     e.preventDefault();
                     
                     });


/*
 * Helper Functions
 *
 */

// Launch the browser window
function startBrowser(url){
    //alert ('in browser with url: ' +url );
    if (connectionStatus == 'online'){
        //alert ('valid connectuon');
        window.open(url, '_blank', 'location=yes');
    }
    else
        navigator.notification.alert('MSG-04: No Network Connectivity. This feature is not available currently!');

}

// Handle the offline event
//
function onOffline() {
    //    alert('offline now');
    connectionStatus = 'offline' ;
    navigator.notification.alert('MSG-05: No Network Connectivity. Some features may not work correctly!');
}

// Handle the offline event
//
function onOnline() {
    //  alert('online now');
    connectionStatus = 'online' ;
    //alert('connection status: ' + connectionStatus);
}

function countWords(strInput){
    s = strInput;
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    wrdCount = s.split(' ').length ;
    return wrdCount ;
}


function doOnOrientationChange()
{
    switch(window.orientation)
    {
        case -90:
        case 90:
            orientationMode = 'landscape';
            $('#btnBWClubText').html('About Bookworm Club');
            break;
        default:
            orientationMode = 'portrait';
            $('#btnBWClubText').html('About App');
            break;
    }
}


function getBookReports() {

	console.log('in getbookreports: rowCount: ' + localStorage.rowCount);
    var trueNumOfBkReports = 0 ;
	if (!localStorage.rowCount) {
		//alert("appindex: this means the data store is NOT populated");
    }
	else {
		// now read the row count and process
		rowCount=parseInt(localStorage.rowCount);
        
		if(rowCount){
			$objName='bkReport';
			var $bkReports=""; 

			// set up a for loop to go thru all row counts - beware of the nulls
			for (var i=0;i<rowCount;i++)
			{
				// start finding the objects
				var testObject = localStorage.getItem($objName+i);
				//now build the list items

				if (testObject == null) {
						console.log('invalid object for rowCount: ' + i );
					}
				else {
						console.log('valid object for rowCount: ' + i );
                        //increase the truebkreports count
                        trueNumOfBkReports = trueNumOfBkReports + 1;
                    
						// now try and do a dump on the console
						testObject = JSON.parse(testObject);
						console.log('bkReport' + i + ': ', testObject);
						console.log('book: '+ testObject.book);
						console.log('author: '+ testObject.author);
						console.log('pages: '+ testObject.pages);

						$bkReports += '\n<li><a class="bookReportItem" href="#" ' ;
						//get the book name
						// get the id
						$idValue=testObject.id;
						if(isNaN($idValue))
							$idValue=i;
                        $bkReports += " id=bkReport" + $idValue + " >" ;
                    
                        // get the image for the list
                        var $imgBookCover = "";
                        $imgBookCover = testObject.cover;
                        if ( ($imgBookCover=="") || ($imgBookCover==undefined) )
                            $imgBookCover = "img/placeholder.png" ;
                        $bkReports += '<img src="' + $imgBookCover + '" />';

                        //now add the book name as h3 tag and author as p font
                        $bkReports += "<h3>" + testObject.book + "</h3><p>" + testObject.author + "</p>" ;
                        // add another anchor to do the buttons stuff
                        $bkReports += '</a><a href="#" class="emailReport" ' + " id=bkReport" + $idValue +
                                  ' data-rel="dialog" data-transition="slideup" data-icon="envelope"' + " >";
                    
                        // close off the item
						$bkReports += '</a></li>\n' ;
                        console.log("bkreports: " + $bkReports);
                    
						// done
				}
			}//end for loop
			
            // now update the badge accordingly
            updateAwards(trueNumOfBkReports);
            
			// now refresh the list
			$("#lstReports").html($bkReports);
			$("#lstReports").listview("refresh");
			
		}// end if check

	}	
	
}

// update the badges and awards
function updateAwards( numOfBkReports) {
    if (numOfBkReports>0) {
        console.log ("The true Number of book reports is: " + numOfBkReports);
        
        //update the number of points
        factorPoints = 100 ;
        numPoints = factorPoints + (numOfBkReports*factorPoints);
        $("#userPoints").html(numPoints);
        
        //dep on the range of book reports stored, change the badge accordingly
        if (numOfBkReports < 5) {
            // set it to starter badge
            $("#badge").buttonMarkup({ icon: 'leaf' });
            // do we need to refresh the button ??
        }
        else if (numOfBkReports < 10) {
            // set it to expert
            $("#badge").buttonMarkup({ icon: 'eye-open' });
            
        }
        else if ( numOfBkReports < 15) {
            // set it to rockstar
            $("#badge").buttonMarkup({ icon: 'fire' });
            
        }
        else if ( numOfBkReports < 20) {
            // set it to rockstar
            $("#badge").buttonMarkup({ icon: 'trophy' });
            
        }
        else {
            // set it to bookworm
            $("#badge").buttonMarkup({ icon: 'book' });
        }
    }
    // Coded: Sachin Holla On: 01/24/2014
    // Purpose: to account for deletions and hence a value of 0 book reports
    // Fixes issue: https://github.com/sachinh/BookwormClub/issues/49
    else {
        // needs to be set to 000 to account for deletes
        $("#userPoints").html('000');
        // set it to starter badge
        $("#badge").buttonMarkup({ icon: 'leaf' });
    }
    // End of Code Change
}

function isAutoFocusSupported(){
    console.log("entered the isAutoFocus supported fn");
    
    // info on iOS models @ http://theiphonewiki.com/wiki/Models
    
    var devModel = device.model ;
    var iPad2String = "iPad2";
    
    console.log("Device Model is: " + devModel);
    
    if ( devModel.indexOf(iPad2String) >= 0) {
        var iPadVersion = parseInt(devModel.substring(6)); // model is in the format ipad2,x
        console.log("Device Model is: " + devModel);
        console.log("iPad Version is: " + iPadVersion);
        
        if (iPadVersion >=5 ) {
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        console.log("no ipad2 found");
    }
    
    console.log('ipad autofocus must be supported');
    return 1;
}

function retrieveBadgeDescription(){
    // just arrived
    
    var iconType = $("#badge").attr("data-icon");
    
    var userMessage = "None Yet" ;
    
    if (iconType == "leaf")
        userMessage = "<h3>Congratulations on starting!</h3>Welcome to the fun of Book Reports.";
    else if (iconType == "eye-open")
        userMessage = "<h2>Watch out, everyone, we have a reader here!</h2>You have created at least 5 Book Reports.";
    else if (iconType == "fire")
        userMessage = "<h2>You're on Fire!</h2>You have created at least 10 Book Reports.";
    else if (iconType == "trophy")
        userMessage = "<h2>You are a Champion!</h2>You have created at least 15 Book Reports.";
    else if (iconType == "book")
        userMessage = "<h2>Congratulations, You are an Official Bookworm!</h2>You have created at least 20 Book Reports.";
    
    return userMessage;
    
}

function checkForEmptyFields() {
    empty_flds = "";
    $(".required").each(function() {
                        if(!$.trim($(this).val())) {
                        // get the field description and it to the emptyflds value
                        if ($(this).attr("id") == "bkName")
                        empty_flds += "Book Name";
                        else if ($(this).attr("id") == "auName") {
                        if (empty_flds != "")
                        empty_flds += ",";
                        empty_flds += "Author Name";
                        }
                        //all done
                        }
                        });
    
    return empty_flds;
}

/*
 * BarCode Scanner related helper functions
 *
 */

function clickScan() {
    window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
}


//------------------------------------------------------------------------------
function scannerSuccess(result) {
    var strResult = "";
    strResult = JSON.stringify(result);
    console.log("value: " + strResult);
    // next the goal is to extract the barcode
    $barCode = "";
    $barCode = result.text;
    console.log("barcode: " + $barCode);
    // invoke the function to retrieve bookcovers
    getBookCover($barCode);
    
}

//------------------------------------------------------------------------------
function scannerFailure(message) {
    console.log("scannerFailure: message: " + message);
    console.log("value: " + JSON.stringify(message));
}

// function to retrieve barcode and populate book cover , etc.
function getBookCover($barCode) {
    // now set a temp var with a default ISBN - later will convert the fn to accept this as a parameter
    if ($barCode=="")
        return;
    
    var $stemURL = "http://www.goodreads.com/search?q=";
    // ideally this should be built up individually and then url encoded
    var $otherVars = "&search%5Bfield%5D=all&format=xml&key=rkmLrBjpOaqiRtJpFt1Fg";
    var $completeURL = "";
    $completeURL = $stemURL + $barCode + $otherVars ;

    console.log("getbookcover: URL: " + $completeURL);
    
    $.ajax({
           type: "GET",
           url: $completeURL,
           dataType: "xml",
           success: parseXml
           });
    
}

function parseXml(xml) {
    console.log("parsexml: the XML object: ", xml);
    console.log("in parseXML: " + xml);
    
    avgRatings = $(xml).find("average_rating").text();
    console.log ("avg ratings: " + avgRatings);
    //now one last level to get to the actual best-book tag
    $('best_book',xml).each(function(l) {
                            
                            title = $(this).find("title").text();
                            imageURL = $(this).find("image_url").text();
                            smallImageURL = $(this).find("small_image_url").text();
                            author = $(this).find("name").text();
                            
                            console.log("book info: " + title + imageURL + smallImageURL + author + avgRatings);
                            setBookBio(title,imageURL,smallImageURL,author,avgRatings);
                            
                            });				
    
    // done
    
    console.log("all done here in the parseXML fn");
    
}

function setBookBio(bkTitle, imgBookCover, imgSmallBookCover, auName, avgRatings) {
    console.log("setbookbioinfo: Title: " + bkTitle);
    console.log("setbookbioinfo: imgBookCover: " + imgBookCover);
    console.log("setbookbioinfo: imgSmallBookCover: " + imgSmallBookCover);
    console.log("setbookbioinfo: auName: " + auName);
    console.log("setbookbioinfo: avgRatings: " + avgRatings);
    
    // set the title and author fields
    $("#bkName").val(bkTitle);
    $("#auName").val(auName);
    
    // set the book cover
    if (imgBookCover!="") {
        // set the new image to this cover
        $("#imgCapturedImage").attr("src",imgBookCover);
    }
    else if ( imgSmallBookCover != "") {
        // set the new image to this cover (small)
        $("#imgCapturedImage").attr("src",imgSmallBookCover);
    }
    
    // set the ratings
    $("#lblAvgRating").html(avgRatings);
    
    // all done
    console.log ("done setting the book bio");
}

function setupBarCodeVars()
{
    scanButton = document.getElementById("scan-button");
    resultSpan = document.getElementById("scan-result");
}


/* When this function is called, PhoneGap has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */
function setupBarCodeEvents()
{
    // do your thing!
    
    scanButton.addEventListener("click", clickScan, false);
    createButton.addEventListener("click", clickCreate, false);
}

/*
 * Email Helper Functions
 *
 */


function emailBookReport(bkReportID,btnID) {
    // setup the content for the email
    // perhaps we want to popup a dialog that allows user to pick the email ID's --- TBD
    console.log("in the emailbookreport fn: BkReportID: " + bkReportID);
    var $strSubject = "My Book Report";
    var $strBody = "";
    
    // now retrieve the bkreport from storage
    var emailBkReport = localStorage.getItem(bkReportID);
    console.log('emailBkReport object: ', emailBkReport);

    //extract the actual values
    if (emailBkReport == null) {
        // this means there is no saved data for this ID

        // Coded: Sachin Holla
        // On: 01/23/2014
        // Purpose: to use consistent popups for user facing messages
        // Fixes issue: https://github.com/sachinh/BookwormClub/issues/33

        // navigator.notification.alert('To email, pl. save Book Report first.', null, 'New Book Report');
        
        if (btnID == 'btnEmailScreen2'){
            // set the user message in the appropriate popup and display popup
            $('#popupUserScreen2').attr('data-position-to','window');
            $('#userMessage2').html("<p><b>Invalid Action:</b><br/>You can only email a previously saved Book Report.");
            $('#popupUserScreen2').popup( "open" );
        }
        else if (btnID == 'btnEmailScreen3'){
            // set the user message in the appropriate popup and display popup
            $('#popupUserScreen3').attr('data-position-to','window');
            $('#userMessage3').html("<p><b>Invalid Action:</b><br/>You can only email a previously saved Book Report.");
            $('#popupUserScreen3').popup( "open" );
            
        }
        else {
            navigator.notification.alert('MSG-02: There is an error, pl. report this to the developer');
        }
        // Code Change End: 01/23/2014
        
        return ;
    }
    else {
        console.log("this is valid object");
        // now try and do a dump on the console
        emailBkReport = JSON.parse(emailBkReport);
        // get the id
        $idValue=emailBkReport.id;
        if(isNaN($idValue))
            $idValue=0;
        console.log('id: '+ $idValue);
        console.log('book: '+ emailBkReport.book);
        console.log('author: '+ emailBkReport.author);
        console.log('pages: '+ emailBkReport.pages);
        
        // just update the body string with the barebones values and we can format later
        $strBody += "<b>Book:</b><br /> " +emailBkReport.book + "<br />" ;
        $strSubject += " on " + emailBkReport.book;
        $strBody += "<b>Author:</b><br /> " +emailBkReport.author + "<br />";
        $strBody += "<b>Pages:</b><br /> " +emailBkReport.pages + "<br /><hr>";
        
        $strBody += "Main Characters: " +emailBkReport.characters + "<br />";
        $strBody += "Setting: " +emailBkReport.setting + "<br />";
        $strBody += "Conflict: " +emailBkReport.conflict + "<br />";
        $strBody += "Conclusion: " +emailBkReport.conclusion + "<br />";
        $strBody += "Liked the book: " +emailBkReport.liked + "<br />" ;
        $strBody += " And Why: " +emailBkReport.likedReason + "<br />";
        
        // done
    }
 
    // startup the email engine
    
    window.plugins.emailComposer.showEmailComposerWithCallback(
                                function(result){
                                    console.log('value of return is: ',result);
                                    },
                                $strSubject,
                                $strBody,
                                ["someone@somewhere.com"],
                                [],
                                [],
                                true);
    
}

function sendEmail(subjectOfEmail, bodyOfEmail,emailAddress) {
    // startup the email engine
    
    window.plugins.emailComposer.showEmailComposerWithCallback(
                                                               function(result){
                                                               console.log('value of return is: ',result);
                                                               },
                                                               subjectOfEmail,
                                                               bodyOfEmail,
                                                               [emailAddress],
                                                               [],
                                                               [],
                                                               true);

}

/*
 * Camera Capture Helper Functions
 *
 */

// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        console.log(document.getElementById("imgUserImage").getAttribute("src"));
        //set the new value
        document.getElementById("imgUserImage").setAttribute("src",mediaFiles[i].fullPath);
    }
}

// Called if something bad happens.
//
function captureError(error) {
    var msg = 'An error occurred during capture. Error Code ' + error.code;

    // Coded: Sachin Holla
    // On: 01/23/2014
    // Purpose: to use consistent popups for user facing messages
    // Fixes issue: https://github.com/sachinh/BookwormClub/issues/33
    // retrieve the button ID here and pass on to helper function

    $('#popupUserScreen3').attr('data-position-to','window');
    $('#userMessage3').html("<p><b>Camera Capture Error:</b><br/>" + msg);
    $('#popupUserScreen3').popup( "open" );
    
    //navigator.notification.alert(msg, null, 'Uh oh!');
    // Code Change end: on 01/23/2014
}

// A button will call this function
//
function captureImage() {
    console.log("in btn click");
    // Launch device camera application,
    // allowing user to capture up to 2 images
    navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 2});
}

// Upload files to server
function uploadFile(mediaFile) {
    var ft = new FileTransfer(),
    path = mediaFile.fullPath,
    name = mediaFile.name;
    
    ft.upload(path,
              "http://localhost/upload.php",
              function(result) {
              console.log('Upload success: ' + result.responseCode);
              console.log(result.bytesSent + ' bytes sent');
              },
              function(error) {
              console.log('Error uploading file ' + path + ': ' + error.code);
              },
              { fileName: name });
}

/*
 *
 * PDF Helper Functions
 *
 *
 */

// Coded: Sachin Holla
// On: 03/22/2014
// Purpose: to create a PDF of the Book Report
// Implements feature: https://github.com/sachinh/BookwormClub/issues/63

var docPDF, offsetX, offsetY, currentPage=1 ;



function writePDFTitle(strText){
    
    var noLineWidth = 34;
    var verticalIncrement = 12;
    var pgLimit = 265;
    // this function is to calculate the entire line length and wrap if needed
    
    //first split the string into words separated by space
    var iWords=0,strOutput="", strSentence, strWords = strText.split(" ");
    
    console.log ('Original title is: ' + strText);
    console.log ('titles array is: ' + strWords);
    
    //wrap to next line if no. of characters is more than 80
    do {

        while (iWords < strWords.length){
            
            console.log ('output: ' + strOutput);
            
            if (strOutput == ""){
                strOutput = strWords[iWords];
            }
            else{
                
                //add in the words and check if the string is less than limit
                
                var lengthWord = strWords[iWords].length;
                
                var totalLength = 0;
                totalLength = strOutput.length + lengthWord + 1 ;
                
                if ( totalLength > noLineWidth){
                    console.log ('limited title: ' + strOutput);
                    docPDF.text(10,offsetY,strOutput);
                    offsetY = offsetY + verticalIncrement;
                    strOutput = strWords[iWords];
                    console.log ('output: ' + strOutput);
                }
                else
                    strOutput += " " + strWords[iWords];
                
            }
            
            //increment the array index
            iWords += 1;
            
            console.log ('iWord Counter: ' + iWords);
            console.log ('No of words: ' + strWords.length);
            
        }
        //alert ('final limited sentence: ' + strOutput);
        console.log ('final limited title: ' + strOutput);
        if (strOutput.length < noLineWidth/2)
            docPDF.text(noLineWidth-strOutput.length/2,offsetY,strOutput);
        else
            docPDF.text(10,offsetY,strOutput);
        offsetY = offsetY + verticalIncrement;
        
        return;
        
    } while (1);
    
}

function writePDFText(strText,fontStyle){
    //alert('in writepdf');
    
    var noLineWidth = 75;
    var verticalIncrement = 7;
    var pgLimit = 265;
    // this function is to calculate the entire line length and wrap if needed
    
    //first split the string into words separated by space
    var iWords=0,strOutput="", strSentence, strWords = strText.split(" ");
    
    console.log ('Original string is: ' + strText);
    console.log ('words array is: ' + strWords);
    
    //wrap to next line if no. of characters is more than 80
    do {
        // chck if a new page needs to be added
        if (offsetY >= pgLimit-5){
            
            // now add the footer text
            docPDF.setFontType("italic");
            docPDF.setFontSize(10);
            docPDF.text(offsetX+155,offsetY,'(contd. on next page ...)');
            //reset for other text
            docPDF.setFontType("normal");
            docPDF.setFontSize(16);

            // add the footer before going onto the next page
            addFooter(currentPage);
            
            // add a new page
            docPDF.addPage();
            currentPage += 1;
            offsetY = 20;
            // set up the header too
            addHeader();
            
        }

        while (iWords < strWords.length){
            
            console.log ('output: ' + strOutput);
            
            if (strOutput == ""){
                strOutput = strWords[iWords];
            }
            else{
                
                //add in the words and check if the string is less than limit
                
                var lengthWord = strWords[iWords].length;
                
                var totalLength = 0;
                totalLength = strOutput.length + lengthWord + 1 ;
                
                if ( totalLength > noLineWidth){
                    //alert ('limited sentence: ' + strOutput);
                    console.log ('limited sentence: ' + strOutput);
                    
                    if (fontStyle == 'bold'){
                        docPDF.setFontType(fontStyle);
                        docPDF.text(offsetX,offsetY,strOutput);
                        docPDF.setFontType("normal");
                    }
                    else
                        docPDF.text(offsetX,offsetY,strOutput);
                    
                    offsetY = offsetY + verticalIncrement;
                    strOutput = strWords[iWords];
                    console.log ('output: ' + strOutput);
                }
                else
                    strOutput += " " + strWords[iWords];
                
            }
            
            //increment the array index
            iWords += 1;
            
            console.log ('iWord Counter: ' + iWords);
            console.log ('No of words: ' + strWords.length);
            
        }
        //alert ('final limited sentence: ' + strOutput);
        console.log ('final limited sentence: ' + strOutput);
        //docPDF.text(offsetX,offsetY,strOutput);
        
        if (fontStyle == 'bold'){
            docPDF.setFontType(fontStyle);
            docPDF.text(offsetX,offsetY,strOutput);
            docPDF.setFontType("normal");
        }
        else
            docPDF.text(offsetX,offsetY,strOutput);

        offsetY = offsetY + verticalIncrement;
        
        return;
        
    } while (1);
    
}

function generatePDFcontent(bookReportID){
    // this function will create the PDF of the book report
    
    // now get the bookreport content
    var bookReport = getBookReportContent(bookReportID);
    
    docPDF = new jsPDF();
    
    // Margins:
	//docPDF.setDrawColor(0, 255, 0)
    //.setLineWidth(150);
    
    /*
     * set up the book report layout by adding pages with some basic info
     */

    // provide a simple header
    //addHeader(); --- no header for title page

    //docPDF.setDrawColor(255,0,0);
    docPDF.setFillColor(128,0,128);
    docPDF.rect(5, 5, 200, 275,'F'); // filled red square with black borders
    
    // draw a line after the image
    docPDF.setLineWidth(1.0);
    docPDF.setDrawColor(255,0,0);
    docPDF.line(5, 125, 205, 125);
    
    // now lets create the book report name
    var bkReportTitle, bkReportCreatedOn, bkReportCreatedBy;
    if (bookReport.book != '')
        bkReportTitle = bookReport.book;
    else
        bkReportTitle = '<Book Name>';
    
    // now gather the meta data for the created date and user too
    console.log ('In PDF generate: Value of created: ' + bookReport.created);
    console.log ('In PDF generate: Value of CreatedBy: ' + bookReport.CreatedBy);
    
    if (bookReport.created != undefined)
        bkReportCreatedOn = 'Created On: ' + bookReport.created;
    else
        bkReportCreatedOn = 'Created On: <today>';

    if (bookReport.createdBy != undefined)
        bkReportCreatedBy = 'Created By: ' + bookReport.createdBy;
    else
        bkReportCreatedBy = 'Created By: <BookWorm>';
    
    // now blit the title and meta data on the screen
    docPDF.setFontSize(32);
    docPDF.text(60, 135, 'Book Report on');
    docPDF.setFontType("bold");
    offsetX = 50;
    offsetY = 150;
    writePDFTitle(bkReportTitle);
    docPDF.setFontSize(16);
    docPDF.setFontType("normal");
    
    offsetY += 15;
    docPDF.text(10, offsetY, bkReportCreatedBy);
    offsetY += 10;
    docPDF.text(10, offsetY, bkReportCreatedOn);
    
    addFooter(currentPage);
    
    // add a new page
    docPDF.addPage();
    currentPage +=1 ;
    
    // provide a simple header
    addHeader();

    // draw a line after the image
    docPDF.setLineWidth(0.5);
    docPDF.setDrawColor(255,0,0);
    docPDF.line(5, 125, 205, 125);

    // now create fields for book bio
    offsetX = 10;
    offsetY = 135;
    
    //docPDF.setFontType("bold");
    writePDFText('Book: ',"bold");
    
    //docPDF.setFontType("normal");
    writePDFText(bookReport.book);
    
    offsetY += 2;
    //docPDF.setFontType("bold");
    writePDFText('Author: ',"bold");

    //docPDF.setFontType("normal");
    writePDFText(bookReport.author);

    offsetY += 2;
    //docPDF.setFontType("bold");
    writePDFText('No. of Pages: ',"bold");
    
    //docPDF.setFontType("normal");
    writePDFText(bookReport.pages);
    
    offsetY += 2;
    //docPDF.setFontType("bold");
    writePDFText('For more info: ',"bold");
    //docPDF.setFontType("normal");
    
    // now draw another line
    docPDF.line(5, offsetY, 205, offsetY);
    //add in the other fields
    offsetX = 10;
    offsetY += 10;
    
    //docPDF.setFontType("bold");
    writePDFText('Main Characters: ',"bold");
    //docPDF.setFontType("normal");
    writePDFText(bookReport.characters);
    offsetY += 10;

    //docPDF.setFontType("bold");
    writePDFText('Setting: ',"bold");
    //docPDF.setFontType("normal");
    writePDFText(bookReport.setting);
    offsetY += 10;
    
    //docPDF.setFontType("bold");
    writePDFText('Conflict: ',"bold");
    //docPDF.setFontType("normal");
    writePDFText(bookReport.conflict);
    offsetY += 10;

    //docPDF.setFontType("bold");
    writePDFText('Conclusion: ',"bold");
    //docPDF.setFontType("normal");
    writePDFText(bookReport.conclusion);
    offsetY += 10;
    
    //docPDF.setFontType("bold");
    writePDFText('Liked The Book: ',"bold");
    //docPDF.setFontType("normal");
    offsetY -= 7;
    offsetX = 55;
    writePDFText(bookReport.liked);

    offsetX = 10;
    //docPDF.setFontType("bold");
    writePDFText('And Why: ',"bold");
    //docPDF.setFontType("normal");
    writePDFText(bookReport.likedReason);

    addFooter(currentPage);

    var pdfContent = docPDF.output();
    
    return pdfContent ;

}

// generic function to add a footer
function addHeader(){
    
    // now add the footer text
    docPDF.setFontType("italic");
    docPDF.setFontSize(10);
    docPDF.text(100, 5, 'My Book Report');

    // create a footer line
    docPDF.setLineWidth(0.05);
    docPDF.setDrawColor(128,128,128);
    docPDF.line(5, 8, 205, 8);

    //reset for other text
    docPDF.setFontType("normal");
    docPDF.setFontSize(16);
    
}

// generic function to add a footer
function addFooter(page){
    // create a footer line
    docPDF.setLineWidth(0.05);
    docPDF.setDrawColor(128,128,128);
    docPDF.line(5, 285, 205, 285);
    
    // now add the footer text
    docPDF.setFontType("italic");
    docPDF.setFontSize(10);
    docPDF.text(5, 290, '(c) Bookworm Club App 2014');
    //docPDF.text(100, 290, '<Book Report Title>');
    docPDF.text(190, 290, 'Page '+page);
    
    //reset for other text
    docPDF.setFontType("normal");
    docPDF.setFontSize(16);
    
}

function createPDF(bkReportID) {
    //alert('in createPDF function with ID: ' + bkReportID);
    
    var pdfOutput = generatePDFcontent(bkReportID);
    //alert( pdfOutput );
    
    //NEXT SAVE IT TO THE DEVICE'S LOCAL FILE SYSTEM
    //alert("Requesting the file system...");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
                             
                             //alert(fileSystem.name);
                             //alert(fileSystem.root.name);
                             console.log(fileSystem.root.fullPath);
                             var fileName = "BWC.pdf";
                             fileName = "BookReport-" + bkReportID + ".pdf";
                             //alert('FileName: ' + fileName);
                             
                             fileSystem.root.getFile(fileName, {create: true}, function(entry) {
                                                     var fileEntry = entry;
                                                     
                                                     entry.createWriter(function(writer) {
                                                                        writer.onwrite = function(evt) {
                                                                        console.log("Write Success");
                                                                        //save the full path of file
                                                                        var filePath = fileSystem.root.fullPath;
                                                                        filePath = filePath + "/" + fileName;
                                                                        console.log ('FullPath: ' + filePath);
                                                                        
                                                                        // now if the file was written, then display the PDF
                                                                        if (filePath != ''){
                                                                        console.log('Start showing the PDF: ' + filePath);
                                                                        //a nonempty path, means a valid file was ewritten.
                                                                        displayPDF(filePath);
                                                                        }
                                                                        else
                                                                        alert('No valid file was written');
                                                                        
                                                                        };
                                                                        
                                                                        console.log("Writing to File");
                                                                        writer.write( pdfOutput );
                                                                        }, function(error) {
                                                                        alert(error);
                                                                        });
                                                     
                                                     }, function(error){
                                                     alert(error);
                                                     });
                             },
                             function(event){
                             alert( 'Caught an error in the PDF writing: ' + evt.target.error.code );
                             });
}

function getBookReportContent(bkReportID) {
    console.log("in the getbookreport fn: BkReportID: " + bkReportID);
    
    // now retrieve the bkreport from storage
    var bkReport = localStorage.getItem(bkReportID);
    
    //extract the actual values
    if (bkReport != null) {
        console.log("this is valid object");
        // parse the sored content to decrypt content
        bkReport = JSON.parse(bkReport);
        // get the id
        $idValue=bkReport.id;
        if(isNaN($idValue))
            $idValue=0;

        return bkReport ;

    }
    
}

var emailBookReportID = -1;
var bookReportPath = 'not set path';

function displayPDF(docPath){
    //var ref = window.open('http://apache.org', '_blank', 'location=yes');
    //        var ref = window.open(encodeURI('/Users/sachinholla/Library/Application Support/iPhone Simulator/7.0.3/Applications/E1066E6D-BC08-47B9-A8C0-9F854C704731/Documents/test.pdf'), '_blank', 'location=yes');
    //alert('document path: ' + docPath);
    //alert('uriencoded document path: ' + encodeURI(docPath) );
    
    var iIndex1 =docPath.indexOf("bkReport");
    var iIndex2 =docPath.indexOf(".pdf");
    //alert("the index of bkreport is : "+iIndex1);
    emailBookReportID = docPath.substring(iIndex1,iIndex2);
    //alert('the bookreport id is: ' + emailBookReportID);
    bookReportPath = docPath;
    
    var ref = window.open(encodeURI(docPath), '_blank', 'location=yes');
    //var ref = window.open(encodeURI('Documents/test.pdf'), '_blank', 'location=yes');
    
    ref.addEventListener('loadstart', function(event) {
                         //alert('start: ' + event.url);
                         });
    ref.addEventListener('loadstop', function(event) {
                         //alert('stop: ' + event.url);
                         });
    ref.addEventListener('loaderror', function(event) { alert('error: ' + event.message); });
    ref.addEventListener('exit', function(event) {
                         //alert(event.type);
                         //alert('Just got out of the display pdf screen - now launch email screen');
                         //alert('bkreportid being passed is: ' + emailBookReportID);
                         
                         // now setup a confirm dialog for delay and also to validate email flow
                         navigator.notification.confirm(
                                                        'Would you like to go ahead and send the email now ?',  // message
                                                        onConfirm,              // callback to invoke with index of button pressed
                                                        'Email your Book Report',            // title
                                                        'Cancel Email,Send Email Now'          // buttonLabels
                                                        );
                         
                         //emailBookReportAsPDF(emailBookReportID);
                         });
}

// process the confirmation dialog result
function onConfirm(button) {
    //alert('You selected button ' + button);
    if (button==2){
        // now do the actual email
        emailBookReportAsPDF(emailBookReportID);
    }
    else {
        // do nothing and control will return the start point - list or detail view
    }
}

function emailBookReportAsPDF(bkReportID,btnID) {
    // setup the content for the email
    console.log("in the emailBookReportAsPDF fn: BkReportID: " + bkReportID);
    var $strSubject = "My Book Report";
    var $strBody = "";
    
    // now retrieve the bkreport from storage
    var emailBkReport = localStorage.getItem(bkReportID);
    emailBkReport = JSON.parse(emailBkReport);
    
    //extract the actual values
    if (emailBkReport == null) {
        // this means there is no saved data for this ID
        
        if (btnID == 'btnEmailScreen2'){
            // set the user message in the appropriate popup and display popup
            $('#popupUserScreen2').attr('data-position-to','window');
            $('#userMessage2').html("<p><b>Invalid Action:</b><br/>You can only email a previously saved Book Report.");
            $('#popupUserScreen2').popup( "open" );
        }
        else if (btnID == 'btnEmailScreen3'){
            // set the user message in the appropriate popup and display popup
            $('#popupUserScreen3').attr('data-position-to','window');
            $('#userMessage3').html("<p><b>Invalid Action:</b><br/>You can only email a previously saved Book Report.");
            $('#popupUserScreen3').popup( "open" );
            
        }
        else {
            navigator.notification.alert('MSG-XX: There is an error, pl. report this to the developer');
        }
        // Code Change End: 01/23/2014
        
        return ;
    }
    else {
        console.log("this is a valid object");

        $strBody += "Hi,<br/><br/>I have created and attached a Book Report on the book: <b>" +emailBkReport.book + "</b><br />" ;
        $strBody += "<br/>I hope you enjoy reading.<br/><br/>";
        $strSubject += " on " + emailBkReport.book;
        // done
    }
    
    //alert("Subject: "+ $strSubject);
    //alert("Body: "+ $strBody);
    // startup the email engine
    
    var $toEmailAddress = "someone@somewhere.com";
    $toEmailAddress = "bookwormclubapp@gmail.com";
    
    window.plugins.emailComposer.showEmailComposerWithCallback(
                                                               function(result){
                                                               console.log('value of return is: ',result);
                                                               },
                                                               $strSubject,
                                                               $strBody,
                                                               [$toEmailAddress],
                                                               [],
                                                               [],
                                                               true,
                                                               [bookReportPath]);
    
}

/**
 * Return a timestamp with the format "m/d/yy h:MM:ss TT"
 * @type {Date}
 * Credit to: https://gist.github.com/hurjas/2660489
 */

function timeStamp() {
    // Create a date object with the current time
    var now = new Date();
    
    // Create an array with the current month, day and time
    var date = [ now.getMonth() + 1, now.getDate(), now.getFullYear() ];
    
    // Create an array with the current hour, minute and second
    var time = [ now.getHours(), now.getMinutes(), now.getSeconds() ];
    
    // Determine AM or PM suffix based on the hour
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";
    
    // Convert hour from military time
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    
    // If hour is 0, set it to 12
    time[0] = time[0] || 12;
    
    // If seconds and minutes are less than 10, add a zero
    for ( var i = 1; i < 3; i++ ) {
        if ( time[i] < 10 ) {
            time[i] = "0" + time[i];
        }
    }
    
    // Return the formatted string
    return date.join("/") + " " + time.join(":") + " " + suffix;
}

