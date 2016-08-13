var curcorPosition = require('./cursorPosition');
var setCaretToPos = require('./setCaretToPos');	
var phone = require('./phone');
var vars = require('./variable');

function validation_phone() {
	vars.phone.value = '(___)___-__-__';
	vars.phone.addEventListener('input', function(e){
		var stringForChange = e.target.value.replace(/[^0-9]/g, '');
		e.target.value = phone(stringForChange);
		setCaretToPos(vars.phone, curcorPosition(stringForChange));
		vars.phone.nextSibling.nextSibling.classList.remove('hide-element');
		vars.phoneHelp.classList.remove('error')
		if(stringForChange.length >= 10) {
			vars.phone.parentElement.classList.add('has-success');
			vars.phone.parentElement.classList.add('has-feedback');
			vars.phone.parentElement.classList.remove('has-error');
		} else {
			vars.phone.parentElement.classList.add('has-success');
			vars.phone.parentElement.classList.add('has-error');
		}
	});
}

module.exports = validation_phone