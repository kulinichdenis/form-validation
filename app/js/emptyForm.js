var vars = require('./variable');

function delSuccessValidation(vars) {
	vars.value = ''
	vars.parentElement.classList.remove('has-success', 'has-feedback');	
	vars.nextSibling.nextSibling.classList.add('hide-element');
}

function emptyForm() {
	delSuccessValidation(vars.name);
	delSuccessValidation(vars.email);
	delSuccessValidation(vars.date);
	delSuccessValidation(vars.phone);
}

module.exports = emptyForm

