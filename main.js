var startDate = 1956; // first year a transfer fee was recorded on transfermarkt.com
var endDate = new Date().getFullYear(); // current Year
var getUrl = "https://www.transfermarkt.com/transfers/transferrekorde/statistik/top/saison_id/"; // ADD Year after saison_id/

for (i=startDate; i <= endDate; i++) { // iterate until current year - change to endDate in production mode
  $.get(getUrl + i, function(data){ // get the page of current year
    $(".loader").html(data); // load i-year into .loader-Element
    var tableRows = $(".loader").find(".items>tbody>tr"); // select every table-row (player)
    tableRows.each(function(){ // function for every player within table
      var rank = $(this).find(">td:first-of-type").text(); // get rank within year
      var picture = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td:first-of-type>img").attr("src"); // get playerpicture
      var playerLink = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("href"); //get playerLink to transfermarkt.com
      var playerID = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("id"); // get playerID
      var playerName = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").text(); // get playerName
      var position = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:last-of-type>td").text(); // get players position
      var year = $(this).find(">td:nth-of-type(3)>a").text(); // get year of transfer
      var yearLink = $(this).find(">td:nth-of-type(3)>a").attr("href"); // get yearLink of transfer
      var nationalities = $(this).find(">td:nth-of-type(4)>img"); // get nationalities
      if(nationalities.length===2){ // check if there are 2 nationaities
        var nationalityOne = nationalities.eq(0).attr("alt"); // get both nationalities
        var nationalityTwo = nationalities.eq(1).attr("alt");
        var flagOne = nationalities.eq(0).attr("src");
        var flagTwo = nationalities.eq(1).attr("src");
      }
      else {
        var nationalityOne = nationalities.attr("alt"); // get just first nationality
        var flagOne = nationalities.attr("src");
        var nationalityTwo = "none"; // default value for 2nd nationality
        var flagTwo = "none";
      }
      var joinedClub = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:first-of-type>td:last-of-type>a").text(); // get joinedClub
      var joinedClubLink = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:first-of-type>td:last-of-type>a").attr("href"); // get the transfermarkt.com link to the club
      var clubEmblem = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:first-of-type>td:first-of-type>a>img").attr("src"); // get emblem of clb
      var leagueNationality = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:last-of-type>td:first-of-type>img").attr("alt"); // get nationality of joined league
      var leagueNationalityFlag = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:last-of-type>td:first-of-type>img").attr("src"); // get flag of joined leagues nationality
      var leagueName = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:last-of-type>td:first-of-type>a").text(); // get leagueName of joined league
      var leagueLink = $(this).find(">td:nth-of-type(5)").find("table>tbody>tr:last-of-type>td:first-of-type>a").attr("href"); // get leagueLink of joined league
      var transferFee = $(this).find(">td:last-of-type>a").text(); // get transfer fee
      var transferHistoryLink = $(this).find(">td:last-of-type>a").attr("href"); // get transfer history link

      var playerObj = {
        rank: rank,
        picture: picture,
        playerLink: "https://www.transfermarkt.com" + playerLink,
        playerName: playerName,
        position: position,
        year: year,
        yearLink: "https://www.transfermarkt.com" + yearLink,
        nationalityOne: nationalityOne,
        nationalityTwo: nationalityTwo,
        flagOne: flagOne,
        flagTwo: flagTwo,
        joinedClub: joinedClub,
        joinedClubLink: "https://www.transfermarkt.com" + joinedClubLink,
        clubEmblem: clubEmblem,
        leagueNationality: leagueNationality,
        leagueNationalityFlag: leagueNationalityFlag,
        leagueName: leagueName,
        leagueLink: "https://www.transfermarkt.com" + leagueLink,
        transferFee: transferFee,
        transferHistoryLink: "https://www.transfermarkt.com" + transferHistoryLink
      };
      var playerJSON = JSON.stringify(playerObj); // object to JSON
      $(".json").append("<p id='"+playerID+"'>"+playerJSON+"</p>"); // parse json to browser
    });
  });
}
