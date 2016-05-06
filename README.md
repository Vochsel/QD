# QD
Quick Data is a small JavaScript library which focuses on providing a quick and fast bridge between data inputs, and data outputs. 

### Overview

 - Inlets provide input functionality. Currently any html input element can be used.
 - Outlets provide output functionality. Any DOM element can be linked by id, and class.
 - The javascript object also holds the base data value which can be used on the JavaScript side.

### Features

#### Inlets
```javascript
var do = QD.Data(10).inlet("someID");
do.inlet("someClass")
```

#### Outlets
```javascript
var do = QD.Data(10).outlet("someID", callback);
do.outlet("someClass", function(v, d) {
	//v : updated value
	//d : dom associated
	d.innerHTML = v;
});
```

This library is being continuously updated. Feedback, and or suggestions are welcome

Created by Ben Skinner
