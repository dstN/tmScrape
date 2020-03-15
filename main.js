var startDate = 1956; // first year a transfer fee was recorded on transfermarkt.com
var endDate = new Date().getFullYear(); // current Year
var getUrl = "https://www.transfermarkt.com/transfers/transferrekorde/statistik/top/saison_id/"; // ADD Year after saison_id/

for (i=startDate; i <= 1960; i++) { // iterate until current year - change to endDate in production mode
  $.get(getUrl + i, function(data){ // get the page of current year
    $(".loader").html(data);
    var tableRows = $(".loader").find(".items>tbody>tr");
    tableRows.each(function(){
      var innerHTML = $(this).html();
      var rank = $(this).find(">td:first-of-type").text();
      var picture = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td:first-of-type>img").attr("src");
      var playerLink = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("href");
      var playerID = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("id");
      var playerName = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").text();
      var position = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:last-of-type>td").text();
      var year = $(this).find(">td:nth-of-type(3)>a").text();
      var nationalities = $(this).find(">td:nth-of-type(4)>img");
      if(nationalities.length===2){
        var nationalityOne = nationalities.eq(0).attr("alt");
        var nationalityTwo = nationalities.eq(1).attr("alt");
        var flagOne = nationalities.eq(0).attr("src");
        var flagTwo = nationalities.eq(1).attr("src");
      }
      else {
        var nationalityOne = nationalities.attr("alt");
        var flagOne = nationalities.attr("src");
        var nationalityTwo = "none";
        var flagTwo = "none";
      }
      var joinedClub = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:first-of-type>td:last-of-type>a").text();
      var joinedClubLink = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:first-of-type>td:last-of-type>a").attr("href");
      var clubEmblem = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:first-of-type>td:first-of-type>a>img").attr("src");
      var leagueNationality = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:last-of-type>td:first-of-type>img").attr("alt");
      var leagueNationalityFlag = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:last-of-type>td:first-of-type>img").attr("src");
      var transferFee = $(this).find(">td:last-of-type>a").text();



      //$(".table>table>tbody").append("<tr>"+innerHTML+"</tr>");

      var playerObj = {
        rank: rank,
        picture: picture,
        playerLink: "https://www.transfermarkt.com" + playerLink,
        playerName: playerName,
        position: position,
        year: year,
        nationalityOne: nationalityOne,
        nationalityTwo: nationalityTwo,
        flagOne: flagOne,
        flagTwo: flagTwo,
        joinedClub: joinedClub,
        joinedClubLink: "https://www.transfermarkt.com" + joinedClubLink,
        clubEmblem: clubEmblem,
        leagueNationality: leagueNationality,
        leagueNationalityFlag: leagueNationalityFlag,
        transferFee: transferFee
      };
      var playerJSON = JSON.stringify(playerObj);
      $(".json").append("<p id='"+playerID+"'>"+playerJSON+"</p>");
    });
  });
}
