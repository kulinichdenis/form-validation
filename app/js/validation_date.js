var vars = require('./variable') 
var validDate = require('./validDate');

function checkDate(date) {
	vars.date.parentElement.classList.add('has-feedback');
	vars.date.nextSibling.nextSibling.classList.remove('hide-element');
	if(validDate(date)) {
		vars.date.parentElement.classList.add('has-success');
		vars.date.parentElement.classList.remove('has-error');
	} else {
		vars.date.parentElement.classList.add('has-error');
	}
}

function validation_date() {
	vars.dateHelp.classList.remove('error');
	vars.date.addEventListener('input', function(e){
		checkDate(e.target.value)
	})

	vars.date.onchange = function(e) {
		checkDate(e.target.value)
	}
}

module.exports = validation_date