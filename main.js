/*
TRANSFERMARKT SCRAPER from dstN 
MIT License
Copyright (c) 2020 Dustin Tramm
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var startDate = 1956; // first year a transfer fee was recorded on transfermarkt.com
var endDate = new Date().getFullYear(); // current Year
var getUrl = "https://www.transfermarkt.com/transfers/transferrekorde/statistik/top/saison_id/"; // ADD Year after saison_id/
function ajaxCall(startyear, endyear){
  $.ajax({
    url: getUrl + startyear,
    type: 'GET',
    beforeSend: function() {
      $(".copy .loadingScrape").addClass("visible");
      $(".form").removeClass("visible");
    },
    complete: function() {

    },
    success: function(data) {
      var currentYearString = '"'+startyear+'"';
      $(".json").append('<div class="'+startyear+' before">'+currentYearString+': [ </div>');
      $(".json").append('<div class="'+startyear+' after"></div>');
      var tableRows = $(data).find(".items>tbody>tr");
      tableRows.each(function() {
        var rank = $(this).find(">td:first-of-type").text(); // get rank within year
        var picture = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td:first-of-type>img").attr("src"); // get playerpicture
        var playerLink = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("href"); //get playerLink to transfermarkt.com
        var playerID = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").attr("id"); // get playerID
        var playerName = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:first-of-type>td.hauptlink>a").text(); // get playerName
        var position = $(this).find(">td:nth-of-type(2)").find("table>tbody>tr:last-of-type>td").text(); // get players position
        var year = $(data).find("select[name='saison_id'] option[selected='selected']").val(); // get year of transfer
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
        $("."+startyear+".before").append("<p id='"+playerID+"'>"+playerJSON+"</p>"); // parse json to browser
      });
      $("."+startyear+".after").append("<span>],</span>");
      if(startyear++ < endyear) {
        ajaxCall(startyear, endyear);
      }
      else {
        $(".loadingScrape").removeClass("visible");
        $(".before>p").not(":last-of-type").append("<span>,</span");
        $(".after:last-of-type").empty().append("<span>]</span>");
        var completeJSON = $(".table").text();
        completeJSON = JSON.parse(completeJSON);
        completeJSON = JSON.stringify(completeJSON, undefined, 2);
        jsonoutput(syntaxHighlight(completeJSON));
        $(".copy .copyinner").addClass("visible");
        $(".copy .loadingScrape").addClass("doneScrape").removeClass("loadingScrape").text("Scraping done!");
      }
    },
    error: function(error) {
      console.log("Error: "+error);
    }
  });
}
function scrape() {
  $(".form span").remove();
  var startSelect = document.getElementById("startyear");
  var endSelect = document.getElementById("endyear");
  var startValue = startSelect.options[startSelect.selectedIndex].value;
  var endValue = endSelect.options[endSelect.selectedIndex].value;

  if(!startValue) {
    $('<span class="key">Error: Please select a starting year.</span>').insertBefore("#submitButton");
  }
  else if(!endValue) {
    $('<span class="key">Error: Please select an ending year.</span>').insertBefore("#submitButton");
  }
  else if(startValue > endValue) {
    $('<span class="key">Error: The starting year must be lower than the ending year.</span>').insertBefore("#submitButton");
  }
  else {
    ajaxCall(startValue, endValue);
  }
}
function copyFunction() {
  $("#copy").select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
}
function scrapeReset() {
  $(".table .json").empty();
  $(".copy pre").empty();
  $(".copyinner").removeClass("visible");
  $(".form").addClass("visible");
  $(".copy .doneScrape").addClass("loadingScrape").text("Scraping...");
}
function jsonoutput(input) {
  document.getElementById("copy").innerHTML = input;
}
function syntaxHighlight(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
