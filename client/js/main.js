$( document ).ready(function() {

    $.get( "/api", function( data ) {
      console.log(data);
      // for (var i=0; i<data.length; i++) {
      //   var link = "<a href='http://portland.craigslist.org"+ data[i].link +"'>"+ data[i].text +"</a>";
      //   $("<li>"+data[i].time+" "+link+"</li>").appendTo($('#jobListPortland'));
      // }
    });

});
