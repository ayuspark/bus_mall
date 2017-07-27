'use strict';
//___________IMG_OBJ_CONSTRUCTOR__________________
function Images(name) {
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.vote = 0;//count when img gets picked
  this.view = 0;//count when img displays
  Images.all.push(this);
}

Images.all = [];
Images.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Images.allVotes = [];
Images.lastShown = [];//store previous shown img
Images.randomIndexHolder = [];
Images.clickCount = 0;//count not exceed 25
var lsFinalVote = new Array(20).fill(0);
var lsAll = [];
var lsClickCount = 0;

//___________FIRST LOAD IMG__________________
function loadImg() {
  for(var i = 0; i < 3; i++){
    var repeatIndex = false;
    var randomIndex = Math.floor(Math.random() * Images.all.length);
    if(Images.randomIndexHolder.includes(randomIndex)) {
      repeatIndex = true;
      i --;
    } else {
      Images.randomIndexHolder.push(randomIndex);
      // console.log(randomIndex);
    }
  }
  Images.lastShown = Images.randomIndexHolder;
  for(var n = 0; n < 3; n++){
    var id = 'img_' + n;
    console.log('ID: ' + id);
    document.getElementById(id).src = Images.all[Images.randomIndexHolder[n]].source;
    document.getElementById(id).alt = Images.all[Images.randomIndexHolder[n]].name;
    Images.all[Images.randomIndexHolder[n]].view += 1;
  }
}

//___________EVENT HANDLER FUNC__________________
function randomImage(e){
  if(!e.target.alt){
    alert('Can\'t you click on an image jesus...');
    return;
  }
  console.log('_________________Target alt is: ' + e.target.alt);
  console.log('Last shown img index: ' + Images.lastShown + ' ' + Images.all[Images.lastShown[0]].name + ', ' + Images.all[Images.lastShown[1]].name + ', ' + Images.all[Images.lastShown[2]].name);

  for(var i = 0; i < 3; i++){
    if(Images.all[Images.lastShown[i]].name === e.target.alt){
      Images.all[Images.lastShown[i]].vote += 1;
    }
  }

  if(Images.clickCount < 5){
    Images.randomIndexHolder = [];
    for(i = 0; i < 3; i++){
      var repeatIndex = false;
      var randomIndex = Math.floor(Math.random() * Images.all.length);
      if(Images.randomIndexHolder.includes(randomIndex) || Images.lastShown.includes(randomIndex)){
        repeatIndex = true;
        i --;
      } else {
        Images.randomIndexHolder.push(randomIndex);
      }
    }//END of random index creator loop

    for(var n = 0; n < 3; n++){
      var id = 'img_' + n;
      document.getElementById(id).src = Images.all[Images.randomIndexHolder[n]].source;
      document.getElementById(id).alt = Images.all[Images.randomIndexHolder[n]].name;
      Images.all[Images.randomIndexHolder[n]].view += 1;
      console.log('This is: ' + Images.all[Images.randomIndexHolder[n]].name + '. Its view is: ' + Images.all[Images.randomIndexHolder[n]].view + '. Its vote is: ' + Images.all[Images.randomIndexHolder[n]].vote);
    }

    Images.clickCount ++;
    lsClickCount = Images.clickCount;
    localStorage.setItem('lsClickCount', JSON.stringify(lsClickCount));

    lsAll = Images.all;
    localStorage.setItem('lsAll', JSON.stringify(lsAll));

    console.log('Click count is:' + Images.clickCount);
    console.log('Currently showing: ' + Images.randomIndexHolder);
    Images.lastShown = Images.randomIndexHolder;
  } else {
    document.getElementById('imgs').removeEventListener('click', randomImage);
    //___________ACTIVATE LOCAL STORAGE____________
    allVoteArray();
    lsFinalVote = Images.allVotes.map(function(count, index){
      return count + lsFinalVote[index];
    });
    localStorage.setItem('lsFinalVote', JSON.stringify(lsFinalVote));
  }
}

//___________RENDER LIST______________________________
function listRender(){
  document.getElementById('list_result').innerHTML = '';
  document.getElementById('charts').style.display = 'none';
  if(Images.clickCount >= 5){
    for(var m = 0; m < Images.all.length; m++){
      Images.liEl = document.createElement('li');
      Images.liEl.textContent = Images.all[m].name + ' is shown ' + Images.all[m].view + ' times, ' + 'and voted ' + Images.all[m].vote + ' times.';
      document.getElementById('list_result').style.display = 'block';
      document.getElementById('list_result').appendChild(Images.liEl);
    }
  } else {
    return alert('You haven\'t finished the study!');
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++
if(localStorage.getItem('lsFinalVote') !== null){
  lsFinalVote = JSON.parse(localStorage.getItem('lsFinalVote'));
}
if(localStorage.getItem('lsClickCount') !== null && JSON.parse(localStorage.getItem('lsClickCount')) < 5){
  Images.clickCount = JSON.parse(localStorage.getItem('lsClickCount'));
  Images.all = JSON.parse(localStorage.getItem('lsAll'));
  loadImg();
} else {
  for(var i = 0; i < Images.allNames.length; i++){
    new Images(Images.allNames[i]);
  }//create 20 img objects
  loadImg();
}

document.getElementById('list_result').style.display = 'none';
document.getElementById('charts').style.display = 'none';
document.getElementById('final_chart_section').style.display = 'none';
document.getElementById('imgs').addEventListener('click', randomImage);
document.getElementById('list_btn').addEventListener('click', listRender);
