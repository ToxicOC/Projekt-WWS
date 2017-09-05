var scores = document.getElementsByClassName('score');
var sum = 0, num = 0;
for (var i = 0; i < scores.length - 1; i++) {
  console.log(i);
  sum += parseFloat(scores[i].innerText);
}
num = sum / scores.length;
console.log(num);
