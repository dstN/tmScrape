var startDate = 1957;
var endDate = new Date().getFullYear();


var tmData = $.get("https://www.transfermarkt.de/transfers/transferrekorde/statistik/top/plus/0/galerie/0?saison_id=1957");

console.log(tmData);
