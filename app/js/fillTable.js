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