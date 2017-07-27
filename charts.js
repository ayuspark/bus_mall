'use strict';
//___________GET ALL VOTES ARRAY__________________
function allVoteArray(){
  Images.allVotes = [];
  for(var i = 0; i < Images.all.length; i++){
    Images.allVotes.push(Images.all[i].vote);
  }
  return Images.allVotes;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//USERS CHART, UPDATE DURING IMG CHOOSING             +
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//___________CONFIGURE BAR COLOR_________________________________
var hoverBarColor = new Array(Images.all.length).fill('#405d27');
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
          label: 'Current User Vote',
          data: Images.allVotes,
          backgroundColor: barColor,
          hoverBackgroundColor: hoverBarColor,
          borderWidth: 1,
        }],
    },
    options: {
      // responsive: false,
      animation: {duration: 1000, easing: 'easeOutBounce'}
    },
  });//END of CHART ARGUMENT
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
//FINAL CHART                                           +
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++
function finalChart() {
  document.getElementById('final_chart_section').style.display = 'block';
  // allVoteArray();
  var ctx = document.getElementById('final_chart').getContext('2d');
  new Chart(ctx,{
    type: 'bar',
    data: {
      labels: Images.allNames,
      datasets: [
        {
          label: 'All Vote Chart',
          data: lsFinalVote,
          backgroundColor: 'rgba(62, 68, 68, 1)',
          hoverBackgroundColor: hoverBarColor,
          borderWidth: 1,
        }],
    },
    options: {
      animation: {duration: 1000, easing: 'easeOutBounce'}
    },
  });//END of CHART ARGUMENT
}

document.getElementById('chart_btn').addEventListener('click', drawBarChart);
document.getElementById('final_chart_btn').addEventListener('click', finalChart);
