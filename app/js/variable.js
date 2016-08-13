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