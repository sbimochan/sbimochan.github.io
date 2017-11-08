function Pokemon() {
  //Public variables
  this.name = "";
  this.health = 0;
  this.armor = 0;
  this.moves = [];
  var that = this;
  console.log("From class", this);
  //Public functions
  this.init = function(props) {
    that.name = props.name;
    that.health = props.health;
    that.armor = props.armor;
    this.moves = props.moves;
  };
  this.useAbility = function(id, pokemon) {
    var move = this.moves[0];
    pokemon.health = pokemon.health - move.damage;
    console.log(that.name + " used " + move.name);
  }
  var logProps = function() {
    console.log("From private", this);
    console.log("LOGGING", that.name, that.health, that.armor);
  }
}
var pikachu = new Pokemon();
pikachu.init({
  name: 'Pikachu',
  health: 500,
  armor: 5,
  moves: [{
    id: 1, name: 'Thunder', damage: 50
  },{
    id: 2, name: 'Dance', damage: 0
  }]
});
var raichu = new Pokemon();
raichu.init({
  name: 'Raichu',
  health: 600,
  armor: 2,
  moves: [{
    id: 1, name: 'ThunderBolt', damage: 50
  },{
    id: 2, name: 'Dance', damage: 0
  }]
});
pikachu.useAbility(1, raichu);