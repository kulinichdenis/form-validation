var vars = require('./variable');
var fillTable = require('./fillTable');
var emptyForm = require('./emptyForm');	

function submit() {
	vars.saveButton.addEventListener('click', function(){
		if(vars.name.value === '' || vars.name.parentElement.classList.contains('has-error')) {
			vars.nameHelp.classList.add('error');	
		} else if(vars.date.value === '') { 
			vars.dateHelp.classList.add('error');
		} else if(vars.email.value === '' || vars.email.parentElement.classList.contains('has-error')) { //проверка на клас
			vars.emailHelp.classList.add('error');
		} 
		else if(vars.phone.value === '(___)___-__-__' || vars.phone.parentElement.classList.contains('has-error')) { //проверка на клас
			vars.phoneHelp.classList.add('error');
		} else {
			var table = JSON.parse(localStorage.getItem('table')) || [];
			table.push({
				id: table.length + 1, 
				name: vars.name.value.trim(), 
				date: vars.date.value, 
				email: vars.email.value, 
				phone: vars.phone.value.trim()})
			localStorage.setItem('table', JSON.stringify(table));
			fillTable();
			emptyForm();
		}
	})
}

module.exports = submit;


