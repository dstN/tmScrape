var startDate = 1956; // first year a transfer fee was recorded on transfermarkt.com
var endDate = new Date().getFullYear(); // current Year
var getUrl = "https://www.transfermarkt.com/transfers/transferrekorde/statistik/top/saison_id/"; // ADD Year after saison_id/

for (i=startDate; i <= 1960; i++) { // iterate until current year - change to endDate in production mode
  $.get(getUrl + i, function(data){ // get the page of current year
    $(".loader").html(data);
    var tableRows = $(".loader").find(".items>tbody>tr");
    tableRows.each(function(){
      var innerHTML = $(this).html();
      $(".table>table>tbody").append("<tr>"+innerHTML+"</tr>");
    });
  });
}
