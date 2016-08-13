var vars = require('./variable');

function validation_email() {
	vars.email.addEventListener('input', function(e){

		vars.email.nextSibling.nextSibling.classList.remove('hide-element');
		vars.emailHelp.classList.remove('error');

		if (/[^@]+@[^@.]+\.[^@.]+/.test(e.target.value)) {
			vars.email.parentElement.classList.remove('has-error');
			vars.email.parentElement.classList.add('has-success');
			vars.email.parentElement.classList.add('has-feedback');
		} else {
			vars.email.parentElement.classList.add('has-error');	
		}
	})
}

module.exports = validation_email;	