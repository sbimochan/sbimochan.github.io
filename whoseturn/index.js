let date = new Date();
let day = date.getDay(); //0-6
function findTurn(day){
  if(day == 0 || day ===6){
    return 4;
  }else{
    return turn = day%4;
  }
}
const names = ['Sushan','Bimochan', 'Sachit', 'Chumlung','Holiday']

let x = findTurn(day);
// console.log(names[x]);
document.getElementById('name').innerHTML = names[x];