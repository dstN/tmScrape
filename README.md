# tmScrape
local web scraping of the (max first 25 entries) transfer records from transfermarkt.com
# usage
Just clone/download the repository and open index.html in your browser.

Wait until "Scraping done!" appears and click on "Copy to clipboard"

It takes a moment until it copies everything. If it's done copying you get an alert.

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
* League
* League Link
* Transfer Fee
* Transfer Fee Tooltip
* Transfer history link

# license
MIT License

Copyright (c) 2020 Dustin Tramm

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
