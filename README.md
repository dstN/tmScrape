# tmScrape
local web scraping of the (max first 25 entries) transfer records from transfermarkt.com
# usage
just clone/download the repository and open index.html in your browser.

Wait until your browser doesn't load anymore.

Add this line of code to your console-drawer:

``` $(".before>p").not(":last-of-type").append("<span>,</span"); ```
# format
every player comes in a json-object. with following data within:
* Rank within his Transfer-Year
* Picture of the Player (Link from transfermarkt.com)
* Link to the Players Profile on transfermarkt.com
* Player Name
* Players Position
* Year of the transfer
* Link to the year of the transfer
* Nationalit(ies)(y)
* Nationality-Flag(s)
* The joined Club
* Link to the joined Club
* Emblem of the joined Club
* League Nationality
* League Nationality Flag
* League league
* League Link
* Transfer Fee
* Transfer Fee Tooltip
* Transfer history link
