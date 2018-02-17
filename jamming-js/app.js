(function () {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyCKqmjZUw-oUw2rCNag8XVRQc2S-fPcz8w",
    authDomain: "jammingjs-52efa.firebaseapp.com",
    databaseURL: "https://jammingjs-52efa.firebaseio.com",
    projectId: "jammingjs-52efa",
    storageBucket: "jammingjs-52efa.appspot.com",
    messagingSenderId: "690797988767"
  };
  firebase.initializeApp(config);
})();
const preObject = document.getElementById('composeName');
const songListDiv = document.getElementById('songList');
// create reference
const dbRefObject = firebase.database().ref().child('composition');

// sync object changes with on menthod
// snap is data snapshot 
dbRefObject.on('value', snap => {
  const numOfSong = snap.numChildren()
  if( numOfSong !==0){
    for(let i= 0; i< numOfSong; i++){
      var newSong = document.createElement('button');
      newSong.innerHTML = Object.keys(snap.val())[i];
      newSong.value = snap.val();
      linebreak = document.createElement("br");
      newSong.appendChild(linebreak);
      songListDiv.appendChild(newSong);
     
    }
  }
});
// dbRefObject.on('value', snap => preObject.innerHTML = Object.keys(snap.val()));

