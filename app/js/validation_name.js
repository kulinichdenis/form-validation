var vars = require('./variable');

function validation() {	
	vars.name.addEventListener('input', function(e) {
		vars.name.nextSibling.nextSibling.classList.remove('hide-element');
		vars.nameHelp.classList.remove('error');
		if (e.target.value.length >= 2) {
			vars.name.parentElement.classList.remove('has-error');
			vars.name.parentElement.classList.add('has-success');
			vars.name.parentElement.classList.add('has-feedback');
		} else {
			vars.name.parentElement.classList.add('has-error');	
		}
	})
}

module.exports = validation;	