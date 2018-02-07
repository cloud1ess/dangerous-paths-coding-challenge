var Utils = {
  chooseRandom : function (array) {
    return array[Math.floor(Math.random()*array.length)]
  },
  chooseRandomFromSparse : function (array) {
    var tempArray = [];
    array.forEach(function (value) {
      if (value) tempArray.push(value)
    })
    return this.chooseRandom(tempArray);
  },
  capitalise: function (str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
  },
  deepSearch: function (object, searchTerm) {
    var i, found;
    for (i in object) {
      if (object.hasOwnProperty(i)) {
        if (object[i] === searchTerm) {
          found = found || {}
          found[i] = searchTerm

        } else if (typeof object[i] === 'object' && object[i] !== null) {
          var result = this.deepSearch(object[i], searchTerm);
          if (result) {
            found = found || {}
            found[i] = result
          }
        }
      }
    }
    return found
  },
  copy: function (original, copied) {
		var i;
    copied = copied || (original.length || original.length === 0 ? [] : {});
		for (i in original) {
			if (original.hasOwnProperty(i)) {
				if (original[i] instanceof Image) {
					copied[i] = original[i];
				} else if (typeof original[i] === 'object' && original[i] !== null) {
					copied[i] = original[i].length || original[i].length === 0 ? [] : {};
					this.copy(original[i], copied[i]);
				} else {
					copied[i] = original[i];
				}
			}
		}
    return copied;
	},
  combine: function (a, b) {
    var combined = {};

    for (i in a) {
      if (a.hasOwnProperty(i)) {
        combined[i] = a[i]
      }
    }

    for (i in b) {
      if (b.hasOwnProperty(i)) {
        combined[i] = b[i]
      }
    }

    return combined
  },
  createElement: function (type, parent, classes) {
    var element = document.createElement(type);
    if (!parent) {
      parent = document.body
    }
    parent.appendChild(element);
    if (classes) {
      classes.forEach(function (cssClass) {
        CSSClass.add(element, cssClass);
      })
    }
    return element
  },
  replaceCharAt: function (string, index, replacement) {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
  }
}
