var vars = require('./variable');
var randomWinners = require('./randomWinners');

function clickWinner() {
	vars.winner.addEventListener('click', function() {
		randomWinners();
	})
}

module.exports = clickWinner