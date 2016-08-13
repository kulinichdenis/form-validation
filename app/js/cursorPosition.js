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