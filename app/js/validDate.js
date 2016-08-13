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