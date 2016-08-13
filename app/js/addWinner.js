var vars = require('./variable');
var deleteWinner = require('./deleteWinner');

function addWinners() {
	var winners = JSON.parse(localStorage.getItem('winners')) || [];

	winners.forEach(function(winner) {
		var span = document.createElement('span');
		span.classList.add('token');
		var closer = document.createElement('span');
		closer.classList.add('closer');
		
		span.appendChild(document.createTextNode(winner.name));
		span.setAttribute('id', winner.id);
		closer.appendChild(document.createTextNode('x'));
		closer.addEventListener('click', function() {
			deleteWinner(parseInt(span.getAttribute('id'), 10));
			vars.tokenfield.removeChild(span);
		})
		span.appendChild(closer);
		vars.tokenfield.insertBefore(span, vars.tokenfield.firstChild)
	})
}

module.exports = addWinners