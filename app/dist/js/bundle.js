(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./deleteWinner":5,"./variable":18}],2:[function(require,module,exports){
var vars = require('./variable');
var randomWinners = require('./randomWinners');

function clickWinner() {
	vars.winner.addEventListener('click', function() {
		randomWinners();
	})
}

module.exports = clickWinner
},{"./randomWinners":10,"./variable":18}],3:[function(require,module,exports){
function curcorPosition(number) {
	var len = number.length;
	
	if(len === 0) {
		len = 1;
	} else if(len < 3){
		len += 1;			
	} else if(len === 3){
		len = 5;
	} else if(len > 3 && len < 6) {
		len += 2;
	} else if(len === 6) {
		len = 9;
	} else if(len > 6 && len < 8) {
		len += 3;
	} else if (len === 8) {
		len = 12;
	} else if (len > 8) {
		len += 4;
	}   
	return len; 
}

module.exports = curcorPosition
},{}],4:[function(require,module,exports){
function datepicker() {
	$('#date').fdatepicker({
		format: 'mm/dd/yyyy'
	})
}

module.exports = datepicker;
},{}],5:[function(require,module,exports){
function deleteWinners(item) {
	var winners = JSON.parse(localStorage.getItem('winners'));
	
	if (winners) {

		localStorage.setItem('winners', JSON.stringify(winners.filter(function(winner){
			return winner.id != item;
		})));
	}
}

module.exports = deleteWinners
},{}],6:[function(require,module,exports){
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


},{"./variable":18}],7:[function(require,module,exports){
function fillTable() {
	var tbody = document.querySelector('tbody');
	var table = JSON.parse(localStorage.getItem('table')) || [];
	 
	for (var i = tbody.children.length; i < table.length; i++) {
	  var tr = document.createElement('TR');
	  for(var key in table[i]) {
	    var td = document.createElement('TD')
	    td.appendChild(document.createTextNode(table[i][key]));
	  	tr.appendChild(td);
	  }
	  tbody.appendChild(tr);
	}
}

module.exports = fillTable;
},{}],8:[function(require,module,exports){
var name = require('./validation_name');
var date = require('./validation_date');
var email = require('./validation_email');
var phone = require('./validation_phone')

var submit = require('./submit_form');
var fillTable = require('./fillTable');
var datepicker = require('./datepicker');
var createWinner = require('./clickWinners');
var addWinner = require('./addWinner');

addWinner()
name();
email();
date();
phone();
submit();
fillTable();
createWinner();
datepicker();



},{"./addWinner":1,"./clickWinners":2,"./datepicker":4,"./fillTable":7,"./submit_form":12,"./validation_date":14,"./validation_email":15,"./validation_name":16,"./validation_phone":17}],9:[function(require,module,exports){
function phone(number){
	var str = '(';
	for (var i = 0; i < 10; i++) {
		if(i === 3) {
			str += ')'	
		} else if (i === 6) {
			str += '-'
		} else if (i === 8) {
			str += '-'
		}
		str += number[i] ? number[i] : '_';
	}
	return str;
}

module.exports = phone;
},{}],10:[function(require,module,exports){
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
},{"./deleteWinner":5,"./variable":18}],11:[function(require,module,exports){
function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	}
	else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	}
}

function setCaretToPos (input, pos) {
	setSelectionRange(input, pos, pos);
}

module.exports = setCaretToPos
},{}],12:[function(require,module,exports){
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



},{"./emptyForm":6,"./fillTable":7,"./variable":18}],13:[function(require,module,exports){
function isValidDate(str) {
	if(str=="" || str==null){return false;}									
	var validformat=/^\d{2}\/\d{2}\/\d{4}$/ 
	
	if (!validformat.test(str)) { 
		return false;
	} else { 
		var month=str.split("/")[0] 
		var day=str.split("/")[1] 
		var year=str.split("/")[2] 
		var dayobj = new Date(year, month-1, day) 
	
		if ((dayobj.getMonth()+1 != month)|| 
				(dayobj.getDate() != day)||
				(dayobj.getFullYear() != year)) 
		{
			return false;
		}	else {
			return true 
		} 
	}
}

module.exports = isValidDate
},{}],14:[function(require,module,exports){
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
},{"./validDate":13,"./variable":18}],15:[function(require,module,exports){
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
},{"./variable":18}],16:[function(require,module,exports){
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
},{"./variable":18}],17:[function(require,module,exports){
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
},{"./cursorPosition":3,"./phone":9,"./setCaretToPos":11,"./variable":18}],18:[function(require,module,exports){
var tokenfield = document.querySelector('.tokenfield');
var winnerButton = document.querySelector('#winnerButton');

var name = document.querySelector('#name');
var nameHelp = document.querySelector('#nameHelp');

var email = document.querySelector('#email');
var emailHelp = document.querySelector('#emailHelp');

var date = document.querySelector('#date');
var dateHelp = document.querySelector('#dateHelp');

var phone = document.querySelector('#phone');
var phoneHelp = document.querySelector('#phoneHelp');

var submitButton = document.querySelector('#saveButton');


module.exports = {
	name: name,
	nameHelp: nameHelp,
	date: date,
	dateHelp: dateHelp,
	email: email,
	emailHelp: emailHelp,
	phone: phone,
	phoneHelp: phoneHelp,
	winner: winnerButton,
	tokenfield: tokenfield,
	saveButton: saveButton
}
},{}]},{},[8]);
