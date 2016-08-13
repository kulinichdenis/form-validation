function deleteWinners(item) {
	var winners = JSON.parse(localStorage.getItem('winners'));
	
	if (winners) {

		localStorage.setItem('winners', JSON.stringify(winners.filter(function(winner){
			return winner.id != item;
		})));
	}
}

module.exports = deleteWinners