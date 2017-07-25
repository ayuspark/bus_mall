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
Images.lastShown = [];//store previous shown img
Images.randomIndexHolder = [];
Images.clickCount = 0;//count not exceed 25

for(var i = 0; i < Images.allNames.length; i++){
  new Images(Images.allNames[i]);
}//create 20 img objects

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
  }//END of for loop of index number
  Images.lastShown = Images.randomIndexHolder;

  for(var n = 0; n < 3; n++){
    var id = 'img_' + n;
    console.log('ID: '+ id)
    document.getElementById(id).src = Images.all[Images.randomIndexHolder[n]].source;
    document.getElementById(id).alt = Images.all[Images.randomIndexHolder[n]].name;
    Images.all[Images.randomIndexHolder[n]].view += 1;
  }
}

//___________EVENT HANDLER FUNC__________________
function randomImage(e){
  console.log('_________________Target alt is: ' + e.target.alt);
  console.log('Last shown img index: ' + Images.lastShown + ' ' + Images.all[Images.lastShown[0]].name + ', ' + Images.all[Images.lastShown[1]].name + ', ' + Images.all[Images.lastShown[2]].name);

  for(var i = 0; i < 3; i++){
    if(Images.all[Images.lastShown[i]].name === e.target.alt){
      Images.all[Images.lastShown[i]].vote += 1;
    }
  }

  if(Images.clickCount < 25){
    Images.randomIndexHolder = [];
    for(var i = 0; i < 3; i++){
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
    console.log('Click count is:' + Images.clickCount);
    console.log('Currently showing: ' + Images.randomIndexHolder);
    Images.lastShown = Images.randomIndexHolder;
  } else {
    document.getElementById('img_0').removeEventListener('click', randomImage);
    document.getElementById('img_1').removeEventListener('click', randomImage);
    document.getElementById('img_2').removeEventListener('click', randomImage);
    for(var i = 0; i < Images.all.length; i++){
      Images.liEl = document.createElement('li')
      Images.liEl.textContent = Images.all[i].name + ' is shown ' + Images.all[i].view + ' times, ' + 'and voted ' + Images.all[i].vote + ' times.';
      document.getElementById('result').appendChild(Images.liEl);
    }
  }
}

loadImg();

document.getElementById('img_0').addEventListener('click', randomImage);
document.getElementById('img_1').addEventListener('click', randomImage);
document.getElementById('img_2').addEventListener('click', randomImage);
