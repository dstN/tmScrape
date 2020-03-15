var startDate = 1957; // first year a transfer fee was recorded on transfermarkt.com
var endDate = new Date().getFullYear(); // current Year
var getUrl = "https://www.transfermarkt.com/transfers/transferrekorde/statistik/top/saison_id/"; // ADD Year after saidson_id/

for (i=startDate; i <= endDate; i++) { // iterate until current year
  var tmData = $.get(getUrl + i); // get the page of current year
  console.log(tmData); 
}
