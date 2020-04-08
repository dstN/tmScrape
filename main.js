var startDate = 1956; // first year a transfer fee was recorded on transfermarkt.com
var endDate = new Date().getFullYear(); // current Year
var getUrl = "https://www.transfermarkt.com/transfers/transferrekorde/statistik/top/saison_id/"; // ADD Year after saison_id/
function ajaxCall(iterate){
  $.ajax({
    url: getUrl + iterate,
    type: 'GET',
    beforeSend: function() {
      $(".copy").prepend('<p class="loadingScrape">Scraping...</p>');
    },
    complete: function() {

    },
    success: function(data) {
      var currentYearString = '"'+iterate+'"';
      $(".json").append('<div class="'+iterate+' before">'+currentYearString+': [ </div>');
      $(".json").append('<div class="'+iterate+' after"></div>');
      var tableRows = $(data).find(".items>tbody>tr");
      tableRows.each(function() {
        var rank = $(this).find(">td:first-of-type").text(); // get rank within year
        var picture = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td:first-of-type>img").attr("src"); // get playerpicture
        var playerLink = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("href"); //get playerLink to transfermarkt.com
        var playerID = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("id"); // get playerID
        var playerName = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").text(); // get playerName
        var position = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:last-of-type>td").text(); // get players position
        var year = $("select[name='saison_id'] option[selected='selected']").val(); // get year of transfer
        var yearLink = getUrl + year; // get yearLink of transfer
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
        var feeFull = transferFee.replace("€", "");
        if(transferFee.indexOf('k') > -1) {
          feeFull = feeFull.replace('k', '');
          feeFull = feeFull * 1000
        }
        else if(transferFee.indexOf('m') > -1) {
          feeFull = feeFull.replace('m', '');
          feeFull = feeFull * 1000000
        };
        var transferHistoryLink = $(this).find(">td:last-of-type>a").attr("href"); // get transfer history link

        var playerObj =
        {
          rank: rank,
          picture: picture,
          playerLink: "https://www.transfermarkt.com" + playerLink,
          playerName: playerName,
          position: position,
          year: year,
          yearLink: yearLink,
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
          transferFee: feeFull,
          transferFeeToolTip: transferFee,
          transferHistoryLink: "https://www.transfermarkt.com" + transferHistoryLink
        };
        var playerJSON = JSON.stringify(playerObj); // object to JSON
        $("."+iterate+".before").append("<p id='"+playerID+"'>"+playerJSON+"</p>"); // parse json to browser
      });
      $("."+iterate+".after").append("<span>],</span>");

      if(iterate++ < endDate) {
        ajaxCall(iterate);
      }
      else {
        $(".before>p").not(":last-of-type").append("<span>,</span");
        $(".after:last-of-type").empty().append("<span>]</span>");
        var completeJSON = $(".table").text();
        var textarea = $("#copy");
        textarea.val(completeJSON);
        $(".loadingScrape").hide(400);
        $(".copy").prepend("<p>Scraping done!</p>");
        $(".copy button").show(400);
      }
    },
    error: function(error) {
      console.log("Error: "+error);
    }
  });
}
ajaxCall(startDate);

function copyFunction() {
  $(".copy #copy").show(400);
  var copy = $("#copy");
  copy.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
}
