'use strict';
//___________IMG_CONSTRUCTOR__________________
function Images(name) {
  this.name = name;
  this.source = 'img/' + this.name + '.jpg';
  this.vote = 0;//count when img picked
  this.view = 0;//count when img shown
  Images.all.push(this);
}

Images.all = [];
Images.allNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Images.lastShown = [];//store previous shown img
Images.clickCount = 0;//count not exceed 25

for(var i = 0; i < Images.allNames.length; i++){
  new Images(Images.allNames[i]);
}//create 20 img objects

Images.randomIndexHolder = [];

function randomImage1(e){
  console.log('Last shown img index: ' + Images.lastShown);
  if(Images.clickCount < 25){
    // Images.imgSection = document.getElementById('imgs');//sections that contains images
    // Images.imgSection.innerHTML = '';
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
    }//END of for loop of index number
    Images.lastShown = Images.randomIndexHolder;

    document.getElementById('img_1').src = Images.all[Images.randomIndexHolder[0]].source;
    document.getElementById('img_1').alt = Images.all[Images.randomIndexHolder[0]].name;
    Images.all[Images.randomIndexHolder[0]].view += 1;
    Images.all[Images.lastShown[0]].vote += 1;
    console.log('This is: ' + Images.all[Images.randomIndexHolder[0]].name + '. Its view is: ' + Images.all[Images.randomIndexHolder[0]].view + '. Its vote is: ' + Images.all[Images.randomIndexHolder[0]].vote);

    document.getElementById('img_2').src = Images.all[Images.randomIndexHolder[1]].source;
    document.getElementById('img_2').alt = Images.all[Images.randomIndexHolder[1]].name;
    Images.all[Images.randomIndexHolder[1]].view += 1;
    console.log('This is: ' + Images.all[Images.randomIndexHolder[1]].name + '. Its view is: ' + Images.all[Images.randomIndexHolder[1]].view + '. Its vote is: ' + Images.all[Images.randomIndexHolder[1]].vote);

    document.getElementById('img_3').src = Images.all[Images.randomIndexHolder[2]].source;
    document.getElementById('img_3').alt = Images.all[Images.randomIndexHolder[2]].name;
    Images.all[Images.randomIndexHolder[2]].view += 1;
    console.log('This is: ' + Images.all[Images.randomIndexHolder[2]].name + '. Its view is: ' + Images.all[Images.randomIndexHolder[2]].view + '. Its vote is: ' + Images.all[Images.randomIndexHolder[2]].vote);

    Images.clickCount ++;
    console.log(Images.clickCount);
    console.log('Currently showing: ' + Images.randomIndexHolder);
  } else {
    document.getElementById('img_1').removeEventListener('click', randomImage1);
    document.getElementById('img_2').removeEventListener('click', randomImage2);
    document.getElementById('img_3').removeEventListener('click', randomImage3);
  }
}

randomImage1();

// while(Images.clickCount < 5){
//   var classSelector = document.querySelectorAll('.displayed_imgs');
//   for(var n = 0; n < classSelector.length; n++){
//     classSelector[n].addEventListener('click', randomImage);
//     console.log(n);
//   };
// }

document.getElementById('img_1').addEventListener('click', randomImage1);
document.getElementById('img_2').addEventListener('click', randomImage1);
document.getElementById('img_3').addEventListener('click', randomImage1);
