var CSSClass = {
	add: function (idOrElement, className) {
		var element = typeof(idOrElement) === 'string'? document.getElementById(idOrElement) : idOrElement
		if ((" " + element.className + " ").indexOf(" " + className + " ") === -1) {
			element.className += " " + className;
		}
	},

	remove: function (idOrElement, className) {
		var element = typeof(idOrElement) === 'string'? document.getElementById(idOrElement) : idOrElement
		var allClasses = element.className;
		var index = (" " + allClasses + " ").indexOf(" " + className + " ");

		if (index !== -1) {
			element.className = allClasses.replace(className, '').replace('  ', ' ');
		}
	}
}
