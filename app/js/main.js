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


