$( '#one' ).live( 'pageinit',function(event){
                 
                 //alert("the first page has been created");
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

$( '#three' ).live( 'pageinit',function(event){
                 
                 // to create the popup on page load
                 console.log("just enterd the page load fn");
                 //setTimeout( function(){ $("#popupPanelR").popup("open"); }, 1000 );
                 console.log("finished the popup stuff");
                 
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

/*
$('#bwclubWebsite').click(function(event) {
                          //alert("the website link was clicked");
                          //cb.showWebPage('http://www.google.com');
                          // now start a browser session
                          //var ref = window.open('https://sites.google.com/site/mybookwormclub/home', '_blank', 'location=yes';

                      });
*/

$('.helpPopup').click(function(event) {
//                      alert("Help Button Clicked");
                      //alert("id: " + $(this).attr('id'));
                      var helpFieldID = $(this).attr('id') ;
                      var helpMessage = "<p>Dynamic HTML!</p>";
                      var pageHelp = "three";
                      
                      if (helpFieldID == "helpTextarea")
                        helpMessage = "<p>Textarea help message which can go on and on and then some ...</p>";
                      else if (helpFieldID == "helpMainCharacters")
                        helpMessage = "<p>Who are the main characters in the book ?</p>";
                      else if (helpFieldID == "helpSetting")
                        helpMessage = "<p>Where did this story take place?<br/>Name and describe the place where the story happened.</p>";
                      else if (helpFieldID == "helpConflict")
                        helpMessage = "<p>What was the action in the story?<br/>What gave the story a beginning,middle, and end?</p>";
                      else if (helpFieldID == "helpConclusion")
                        helpMessage = "<p>How did the story end?<br/>Was it funny, sad, or something else?</p>";
                      else if (helpFieldID == "helpReasonWhy")
                        helpMessage = "<p>Why did you like the book or <br/>why did you not like the book?</p>";
                      else if (helpFieldID == "helpBookName") {
                        helpMessage = "<p>What is the name of the Book ?</p>";
                        pageHelp = "two";
                      }
                      else if (helpFieldID == "helpAuthorName") {
                      helpMessage = "<p>What is the name of the Author ?</p>";
                      pageHelp = "two";
                      }
                      else if (helpFieldID == "helpNumPages") {
                      helpMessage = "<p>How many Pages ?</p>";
                      pageHelp = "two";
                      }
                      
                      if (pageHelp == "two") {
                          $("#msgHelpPg2").html(helpMessage);
                          $("#helpPopupDialogPg2").popup("open");
                      }
                      else {
                          $("#msgHelpPg3").html(helpMessage);
                          $("#helpPopupDialogPg3").popup("open");
                      }

                      });

function countWords(strInput){
    s = strInput;
    s = s.replace(/(^\s*)|(\s*$)/gi,"");
    s = s.replace(/[ ]{2,}/gi," ");
    s = s.replace(/\n /,"\n");
    wrdCount = s.split(' ').length ;
    return wrdCount ;
    //    alert( s.split('.').length );
}

$('.mlInput').blur(function(e) {
                   //alert('Handler for .blur() called.');
                   inputStr = $(this).val() ;
                   //alert("input string is: " + inputStr );
                   if (inputStr == "")
                    return ;
                   wordsCounted = countWords(inputStr) ;
                   //alert ("Words counted: " + wordsCounted );
                   if (wordsCounted<=10) {
                    //e.preventDefault();
                    navigator.notification.alert('You have entered 10 words or less. Pl. add to your answer.', null, 'Answer Length');
                    //$(this).focus();
                   return false;
                    //alert("Too short an answer. Pl. add to your answer.");
                   }
                   });

$(function () {
    //alert("jquery loaded");
    // call fn to list out all the items in the localstorage
    //processLocalStorage();
    // now clear the storage
    //localStorage.clear();
    //now call the display fn to validate for sure
    //processLocalStorage();
  
    //return;
  
    // setup for orintation change
    window.addEventListener('orientationchange', doOnOrientationChange);
    // Initial execution if needed
    doOnOrientationChange();
  
    /*
    //assuming the orientation mode has been detected, update the 'about BWClub' button text, if in portrait
    if (orientationMode=='portrait'){
        //alert($('#btnBWClubText').html());
        $('#btnBWClubText').html('About App');
        //alert($('#btnBWClubText').html());
    }
    else {
        //alert($('#btnBWClubText').html());
        $('#btnBWClubText').html('About Bookworm Club');
        //alert($('#btnBWClubText').html());
    }
    */
  
	// on ready, retrieve all book reports
	getBookReports();
    //  setupBarCodeEvents();
    $("[data-role=header]").fixedtoolbar({ tapToggle: false });
    $("[data-role=footer]").fixedtoolbar({ tapToggle: false });
    //call the privacy notice the first time
    //$("#lnkDialogOpen").click();
  
    // call function to adjsut for spaces - HACK
    //adjustSpacesForLandscape();
  
});

var orientationMode = "";

function doOnOrientationChange()
{
    switch(window.orientation)
    {
        case -90:
        case 90:
            //alert('landscape mode');
            orientationMode = 'landscape';
            $('#btnBWClubText').html('About Bookworm Club');
            break;
        default:
            //alert('portrait mode');
            orientationMode = 'portrait';
            $('#btnBWClubText').html('About App');
            break;
    }
}

function processLocalStorage() {
        // in function
    alert("in processlocalstorage");
    for(var i = 0; i < localStorage.length; i++)
    {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        alert("Key= "+key+", Value= "+value);
    }
    alert ("done showing all storage");
}

/*
var cb;

function setupChildBrowser() {
    var root = this;
    
    //alert("before childbrowser plugin");
    cb = window.plugins.childBrowser;
    //alert("after childbrowser plugin: " + cb);
    //console.log("after childbrowser plugin: " , cb);
    
    if (cb != null) {
        //alert(" there is a valid childbrowser plugin");
        cb.onLocationChange = function(loc){ root.locChanged(loc); };
        cb.onClose = function(){root.onCloseBrowser()};
        cb.onOpenExternal = function(){root.onOpenExternal();};
        //cb.showWebPage("http://google.com");
        //alert("all done with childbrowser plugin");
    }

}
function onCloseBrowser() {
    console.log("onCloseBrowser!");
}

function locChanged(loc) {
    console.log("locChanged!");
}

function onOpenExternal() {
    console.log("onOpenExternal!");
}
*/

/*
 $("#two").swipeleft(function() {
                    alert("will trigger pipup now");
                     //$.mobile.changePage("#three");
                     // testing the dialog popup stuff for now
                    $("#mypopup").popup();
                     });
*/

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

function getBookReports() {

	console.log('in getbookreports: rowCount: ' + localStorage.rowCount);
    var trueNumOfBkReports = 0 ;
	if (!localStorage.rowCount) {
		//alert("appindex: this means the data store is NOT populated");
        //do nothing in here
        //$dummy=0;
    }
	else {
        //alert("appindex: this means the data store IS populated");
		
		// now read the row count and process
		rowCount=parseInt(localStorage.rowCount);
        //alert("rowcount: " + rowCount);
        
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
            
			//alert("reports: " + $bkReports);
			// now refresh the list
			$("#lstReports").html($bkReports);
			$("#lstReports").listview("refresh");
			
			//alert("reviewed all reports");
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
            //                    alert("setting to sytarter");
            $("#badge").buttonMarkup({ icon: 'leaf' });
            // do we need to refresh the button ??
            //                  $("#badge").button("refresh");
            //$('#badge').attr('data-icon', 'check').find('.ui-icon').removeClass('ui-icon-delete').addClass('ui-icon-check');
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
}

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
                                navigator.notification.alert('To delete, pl. save Book Report first.', null, 'New Book Report');
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

$('.emailReport').live('click', function(event) {
                          // email the report
                          console.log("email report clicked");
                          console.log("id= " + $(this).attr("id"));
                          emailBookReport($(this).attr("id"));
                          console.log("finished the email setup");
                       
                       });

// to track if in new/update mode
var $isUpdate = "";

$('.bookReportItem').live('click', function(event) {
                          /*
                          //alert("in bookreportitem click: cb is " + cb);
                          if (cb == undefined) {
                          //alert("setting up the cb var");
                              // setup the childbrowse vars
                              setupChildBrowser();
                          }
                          */
                          
                          //alert("list item clicked");
            //event.preventDefault();
            // POA: extract the id and populate the fields and then change the page 
            // first extract the id
            //console.log('this object: ', $(this));
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
                          //if (parseInt(strIndexedBookID) > 0)
                        //$idValue=0;
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
					//$("#bkPlot").val(bkReport.summary);
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
                    //alert("user drawing: " + $imgUserImage);
                    $("#imgUserImage").attr("src", $imgUserImage);
                    
                    //now set the ratings value too
                    $bookRating = bkReport.rating;
                    if ($bookRating == undefined)
                          $bookRating = "";
                    $("#lblAvgRating").html($bookRating);
                          
					// change the header to be 'Book report Detail'
					$("#hdrTitle2").text("Book Report Detail");
					// also disable/hide the Save report button
					//$('#btnSave').closest('.ui-btn').hide();
                    $("#btnEmailReport").closest('.ui-btn').show();
					                          
                    console.log("just before changing the page");
                    console.log("bkID: " + $("#bkID").val());
                    //now navigate to the detail page
					$.mobile.changePage( "#two", { 
						allowSamePageTransition : true,
						transition: "flip"
						} );
										
					// done	
            	}
            //alert("list item clicked");
        });

var $pgThreeInit = "";
// update the values accordingly
$('#three').live('pagecreate',function(event){
  $pgThreeInit="complete";
  //alert('the second page has been initialized');
});

var autoFocusSupported = -1;

$( '#two' ).live( 'pageinit',function(event){
                 // this is when the cordova piece should have loaded fine
                 autoFocusSupported = isAutoFocusSupported() ;
                       });

function isAutoFocusSupported(){
    console.log("entered the isAutoFocus supported fn");
    
    // info on iOS models @ http://theiphonewiki.com/wiki/Models
    
    var devModel = device.model ;
    var iPad2String = "iPad2";
    
    if ( devModel.indexOf(iPad2String) >= 0) {
        var iPadVersion = parseInt(devModel.substring(6)); // model is in the format ipad2,x
        console.log("Device Model is: " + devModel);
        console.log("iPad Version is: " + iPadVersion);
        
        if (iPadVersion >=5 ) {
            //alert ("This is an iPad2 with an autofocus");
            return 1;
        }
        else {
            //alert ("This is an iPad2 with no autofocus");
            return 0;
        }
    }
    else {
        console.log("no ipad2 found");
    }
    
    return 0;
}

$(".badgeXXX").click(function() {
                        alert("in the badge click fn");
                  var userMessage = "Not detected";
                  userMessage = retrieveBadgeDescription();
                  alert("back in main badge click fn: " + userMessage);
                  
                  /*
                   var iconType = $("#badge").attr("data-icon");
                  //var iconType = $(this).attr("data-icon");
                  alert("the data icon on the badge is: " + iconType);
                  
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
                  */
                  
                  //navigator.notification.alert(userMessage, null, "Badges Explained");
                  $("#msgBadges").html(userMessage);
                  $("#popupBadges").popup("open", { positionTo: "window", transition: "slidedown", tolerance: "0,0"});

                  //alert("done the click processing");
                        });

$( "#popupBadges" ).bind({
                         popupafteropen: function() {
                         //alert("just after opening the badges popup");
                         
                         var userMessage = "Not detected";
                         userMessage = retrieveBadgeDescription();
                         //alert("back in after open listener: " + userMessage);
                         $("#msgBadges").html(userMessage);
                         
                         //alert("all done in the badges retrieval")
                         }
                         
                         });

function retrieveBadgeDescription(){
    // just arrived
    //alert ("in retrieve badge description");
    
    var iconType = $("#badge").attr("data-icon");
    //var iconType = $(this).attr("data-icon");
    //alert("the data icon on the badge is: " + iconType);
    
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

    //alert("in badgedescription fn: "+userMessage);
    
    return userMessage;
    
}

$("#scan-button").click(function() {
                        // setup to handle the barcode scanning
                        //alert("in the barcode scanning fn");
                        if (!autoFocusSupported)
                            navigator.notification.alert("Barcode scanning may not work", null, "No Auto Focus Camera detected");
                        clickScan();
                        //alert("done the scan");
                        });

function clickScan() {
//    alert("in scan click");
    window.plugins.barcodeScanner.scan(scannerSuccess, scannerFailure);
}


//------------------------------------------------------------------------------
function scannerSuccess(result) {
    //alert("scannerSuccess: result: " + result);
    //var resultSpan = document.getElementById("scan-result");
    var strResult = "";
    strResult = JSON.stringify(result);
    //resultSpan.innerText = "success: " + JSON.stringify(result);
    console.log("value: " + strResult);
    //console.log("value2: " + resultSpan.innerText);
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
    //var resultSpan = document.getElementById("scan-result");
    //resultSpan.innerText = "failure: " + JSON.stringify(message);
    console.log("value: " + JSON.stringify(message));
}

// function to retrieve barcode and populate book cover , etc.
function getBookCover($barCode) {
    //alert ("in getbookcover");
    // now set a temp var with a default ISBN - later will convert the fn to accept this as a parameter
    if ($barCode=="")
//        $barCode = "9781591842231";
        return;
    
    var $stemURL = "http://www.goodreads.com/search?q=";
    // ideally this should be built up individually and then url encoded
    var $otherVars = "&search%5Bfield%5D=all&format=xml&key=rkmLrBjpOaqiRtJpFt1Fg";
    var $completeURL = "";
    //alert("stemURL: " + $stemURL);
    //alert("barCode: " + $barCode);
    //alert("otherVars: " + $otherVars);
    //alert("before-completeURL: " + $completeURL);
    $completeURL = $stemURL + $barCode + $otherVars ;
    //alert("after-completeURL: " + $completeURL);

    console.log("getbookcover: URL: " + $completeURL);

    //$completeURL = "goodreads.xml";
    //console.log("getbookcover: URL: " + $completeURL);
    
    $.ajax({
           type: "GET",
           url: $completeURL,
           dataType: "xml",
           success: parseXml
           });

/*
    $.ajax({
           type: "GET",
           url: "http://www.goodreads.com/search?q=9781591842231&search%5Bfield%5D=all&format=xml&key=rkmLrBjpOaqiRtJpFt1Fg",
           dataType: "xml",
           success: parseXml
           });
*/
    
}

$("#btnExp").click(function() {
                   alert("in experiment button click fn");
                   getBookCover("");
                   
/*
 window.plugins.emailComposer.showEmailComposerWithCallback(function(result){console.log('value of return is: ',result);},"Look at this photo","Take a look at <b>this<b/>:",["example@email.com", "johndoe@email.org"],[],[],true);
 */
                   
/*   $.ajax({
 type: "GET",
 url: "goodreads.xml",
 dataType: "xml",
 success: parseXml
 });
 */
                   
/*                   $.ajax({
                          type: "GET",
                          url: "http://www.goodreads.com/search?q=9781591842231&search%5Bfield%5D=all&format=xml&key=rkmLrBjpOaqiRtJpFt1Fg",
                          dataType: "xml",
                          success: parseXml
                          });
*/
                   
/*
 $.ajax({
 type: "GET",
 url: "http://isbndb.com/api/books.xml?access_key=YS6IG9F2&index1=isbn&value1=9781591842231",
 dataType: "xml",
 success: parseXml
 });
 
 $.ajax({
 type: "GET",
 url: "students.xml",
 dataType: "xml",
 success: parseXml
 });
 */
                   
                   console.log("all done");
                   
                   });


function parseXml(xml) {
    console.log("parsexml: the XML object: ", xml);
    console.log("in parseXML: " + xml);
    
    avgRatings = $(xml).find("average_rating").text();
    console.log ("avg ratings: " + avgRatings);
    //now one last level to get to the actual best-book tag
    $('best_book',xml).each(function(l) {
                            //console.log("object this is: ", $(this));
                            
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

$("#createBookReport").click(function() {
	//alert("create button clicked");
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
	//$("#bkPlot").val("");
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
	//$('#btnSave').show().button('refresh');
                             
    // now disable the email button
    //$("#btnEmailReport").hide();
    //$("#btnEmailReport").addClass("ui-disabled");
    $("#btnEmailReport").closest('.ui-btn').hide();

});

// again for the Save button don't function id but class instead
//$("#btnSave").click(function() {
$('.save-btn').click(function(event) {
    console.log ("in Save click");
	//check for empty fields
	checkForEmptyFields();
	if (empty_flds!=""){
		alert("Required Fields Missing: Please fill in " + empty_flds);
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
	//var plotSummary=$("#bkPlot").val();
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
/*
	rowCount=0;	
	if (localStorage.rowCount){
		// this means the data store is populated
		// only then try and parse the rowCount value
		rowCount=parseInt(localStorage.rowCount);		
	}
*/

                     console.log("no of pages: " + noOfPages);
	// now save the new 'record'
	
	//try and create the object dynamically
	var bkReport = new Object;
	//bkReport.id = rowCount;
    bkReport.id = bookID;
	bkReport.book = bookName;
	bkReport.author = authorName;
	bkReport.pages = noOfPages;
	bkReport.characters = mainCharactersinPlot;
	// removing the plot summary for now 
	//bkReport.summary = plotSummary;
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
	// alert("Book Report for " + bookName + " successfully saved.");
	//$( "#clickpopup" ).click();
	
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
	//$("#bkPlot").val("");
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
 
var empty_flds ;   
//$('.required').blur(function() {
function checkForEmptyFields() {
    empty_flds = "";
    $(".required").each(function() {
        if(!$.trim($(this).val())) {
            //empty_flds++;
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

/*
    if (empty_flds) {
        alert("some empty fields");
    } else {
		//alert("no empty fields");
    }
*/
    return empty_flds;
}

// don't do this by id but class instead
//$("#btnEmailReport").click(function() {
$('.emailBkReport').click(function(event) {
    console.log("in the email button click from the detail screen");
    $strBookID= $("#bkID").val();
    
    if ($strBookID != "") {
        //prefix 'bkReport' to the id value since that is how it is stored in the detail page-field
        $strBookID = "bkReport" + $strBookID ;
        console.log("strBookID: " + $strBookID);
        
        // now call the email routine
        emailBookReport($strBookID);
    }
    else
        alert("Invalid Book Report - should never occur");
});

function emailBookReport(bkReportID) {
    //alert("in email button click fn");
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
        navigator.notification.alert('To email, pl. save Book Report first.', null, 'New Book Report');
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
    //alert("all done");
                           
}

$('.sendFeedback').click(function(event) {
                         //alert("in sendfeedback");
                         
                         // send an email to the developer
                         feedbackSubject = "Feedback on Bookworm Club App";
                         feedbackBody = "Hi,<br/>I'm a current user of your app. Here are some thoughts on your Bookworm Club App:<br/>" +
                                        "<b>Love:</b><br/><br/>" +
                                        "<b>Hate:</b><br/><br/>" +
                                        "<p>And here's what I would really really like:<br/><br/>" +
                                        "Thanks" ;
                         developerEmail = "nospamsachin" + "@" + "gmail.com" ;
                         
                         sendEmail(feedbackSubject, feedbackBody, developerEmail) ;
                          });


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
// Called when capture operation is finished
//
function captureSuccess(mediaFiles) {
    //alert("in capture success");
    var i, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        //uploadFile(mediaFiles[i]);
        //alert("captured image name: " + mediaFiles[i].name + ", full path is: " + mediaFiles[i].fullPath);
        console.log(document.getElementById("imgUserImage").getAttribute("src"));
        //set the new value
        document.getElementById("imgUserImage").setAttribute("src",mediaFiles[i].fullPath);
    }
}

// Called if something bad happens.
//
function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
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

function setupBarCodeVars()
{
    //document.addEventListener("deviceready", onDeviceReady, false);
    alert("the setup vars was called");
    
    scanButton = document.getElementById("scan-button");
    resultSpan = document.getElementById("scan-result");
    
    //alert("scan button is: " + scanButton);
    //alert("scan result is: " + resultSpan);
}


/* When this function is called, PhoneGap has been initialized and is ready to roll */
/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
 see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
 for more details -jm */
function setupBarCodeEvents()
{
    alert("in setup of events");
    // do your thing!
    //navigator.notification.alert("PhoneGap is working");
    
    scanButton.addEventListener("click", clickScan, false);
    createButton.addEventListener("click", clickCreate, false);
    alert("after adding event listeners");
}

