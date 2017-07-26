'use strict';
//___________GET ALL VOTES ARRAY__________________
function allVoteArray(){
  Images.allVotes = [];
  for(var i = 0; i < Images.all.length; i++){
    Images.allVotes.push(Images.all[i].vote);
  }
  return Images.allVotes;
}

//___________CONFIGURE BAR COLOR_________________________________
var hoverBarColor = new Array(Images.all.length).fill('skyblue');
var barColor = [];
for(var i = 0; i < Images.all.length; i++){
  var r, g, b, a;
  r = Math.floor(Math.random() * 255);
  g = Math.floor(Math.random() * 255);
  b = Math.floor(Math.random() * 255);
  a = parseFloat( Math.random().toFixed(1));
  barColor[i] = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
}

function drawBarChart() {
  document.getElementById('list_result').style.display = 'none';
  document.getElementById('charts').style.display = 'block';
  allVoteArray();
  var ctx = document.getElementById('charts').getContext('2d');
  new Chart(ctx,{
    type: 'bar',
    data: {
      labels: Images.allNames,
      datasets: [
        {
          label: 'BusMall Product Vote Chart',
          data: Images.allVotes,
          backgroundColor: barColor,
          hoverBackgroundColor: hoverBarColor,
          borderWidth: 1,
        }],
    },
    options: {
      // responsive: false,
      animation: {duration: 9000, easing: 'easeOutBounce'}
    },
  });//END of CHART ARGUMENT
}

document.getElementById('chart_btn').addEventListener('click', drawBarChart);
