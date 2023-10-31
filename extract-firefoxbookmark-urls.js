// this program will pick up firefox backup file to extract the bookmark urls in the "FOCUS MUDAH" and "FOCUS iProperty" folder
// the program will only process the backup file in today's date, example bookmarks-2023-01-03.json
const date = new Date();
const year = date.getFullYear();
let month = date.getMonth() + 1;
month = month < 10 ? "0" + month : month;
let day = date.getDate();
day = day < 10 ? "0" + day : day;

// get current date in the format of yyyy-mm-dd
const dateFormat = `${year}-${month}-${day}`;

// firefox bookmark backup file will be in the format of bookmarks-yyyy-mm-dd.json
const fileFormat = `bookmarks-${dateFormat}.json`;

const bookmarks = require(`./${fileFormat}`);

const rootChildList = bookmarks.children;

// "Oher Bookmarks" folder
const otherBookmarks = rootChildList.filter((x) => x.title == "unfiled")[0];

// "FOCUS MUDAH" folder
const focusMudahFolder = otherBookmarks.children.filter(
  (x) => x.title == "FOCUS MUDAH"
)[0];

// "FOCUS iPROPERTY" folder
const focusIpropertyFolder = otherBookmarks.children.filter(
  (x) => x.title == "FOCUS iPROPERTY"
)[0];

let urls = [];
focusMudahFolder.children.forEach((x) => urls.push(x.uri));
focusIpropertyFolder.children.forEach((x) => urls.push(x.uri));

require("fs").writeFileSync(
  "./urls.json",

  JSON.stringify(urls),

  function (err) {
    if (err) {
      console.error(err);
    }
  }
);

console.log("finishing running extract-firefoxbookmark-urls.js");
