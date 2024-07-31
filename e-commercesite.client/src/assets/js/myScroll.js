$(document).ready(function() {
  $('tbody').scroll(function(e) { //detect a scroll event on the tbody
  	/*
    Setting the thead left value to the negative valule of tbody.scrollLeft will make it track the movement
    of the tbody element. Setting an elements left value to that of the tbody.scrollLeft left makes it maintain 			it's relative position at the left of the table.    
    */
    $('thead').css("left", -$("tbody").scrollLeft()); //fix the thead relative to the body scrolling
    $('thead th:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
    $('thead th:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
    $('thead th:nth-child(3)').css("left", $("tbody").scrollLeft()); //fix the first cell of the header
    $('tbody td:nth-child(1)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
    $('tbody td:nth-child(2)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
    $('tbody td:nth-child(3)').css("left", $("tbody").scrollLeft()); //fix the first column of tdbody
  });
});
