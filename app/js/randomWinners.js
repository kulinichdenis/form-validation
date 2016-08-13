var deleteWinner = require('./deleteWinner');
var vars = require('./variable');

function randomIntFromInterval(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function randomWinners() {
	var table = JSON.parse(localStorage.getItem('table'));
	var winners = JSON.parse(localStorage.getItem('winners')) || [];
	var winner;
	var newWinner = false;

	if (table && winners && table.length != winners.length) { 
		winner = randomIntFromInterval(1, table.length);
	} else {
		return
	}
	
	while (!newWinner) {	
		if(winners.length === 0) {
			break;
		}
		for(var i = 0; i < winners.length; i++) {
			if (winners[i].id === winner) {
				winner = randomIntFromInterval(1, table.length);
				newWinner = false;
				break;	
			} else {
				newWinner = true;
			}
		}
	}

	var span = document.createElement('span');
	span.classList.add('token'); 
	
	for (var j = 0; j < table.length; j++) {
		if(table[j].id === winner) {
			span.appendChild(document.createTextNode(table[j].name));
			span.setAttribute('id', winner);
			var closer = document.createElement('span');
			closer.addEventListener('click', function(){
				deleteWinner(parseInt(span.getAttribute('id'), 10));
				vars.tokenfield.removeChild(span);
			})

			closer.classList.add('closer');
			closer.appendChild(document.createTextNode('x'));
			span.appendChild(closer);
			winners.push(table[j]);
			
			localStorage.setItem('winners', JSON.stringify(winners));
		}
	}

	vars.tokenfield.insertBefore(span, vars.tokenfield.firstChild);
}

module.exports = randomWinners