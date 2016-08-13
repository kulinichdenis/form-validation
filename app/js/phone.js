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