let date = new Date();
var count = 0;
currY = date.getYear();
currM = date.getMonth();
currD = date.getDate();
let bkoday;
for (i = 1; i <= currD; i++) {
  b = new Date(currY + 1900, currM, i);
  bkoday = b.getDay();
  if (b.getDay() === 0 || b.getDay() === 6) {
    count++;
  }
}

const names = ['Sushan', 'Bimochan','Sachit', 'Chumlung'];
if (bkoday !== 0 && bkoday !== 6) {
  let turn = (currD - count) % 4;
  document.getElementById('name').innerHTML = names[turn];
} else {
  document.getElementById('name').innerHTML = 'HOLIDAY';
}
