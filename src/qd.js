var QD = {
	Data: function(val) {
		return {
			value: val,
			inlets: [],
			outlets: [],
			// ==== Update ==== //
			// -- Param (v) : New value to be set
			// -- Desc	  	: Update value of QD object and trigger all outlets, and reflect changes in inlets
			update: function(v) {
				//Update internal value
				this.value = v;
				
				//Update all outlets
				for(var i=0; i<this.outlets.length; i++) {
					this.outlets[i].callback(this.value, this.outlets[i].dom);
				}

				//Update all inlets
				for(var i=0; i<this.inlets.length; i++) {
					this.inlets[i].value = this.value;
				}
			},
			// ==== Inlet ==== //
			// -- Param (doms_str) 	: Name of DOM element(s)
			// -- Desc				: Create one or more inlets
			inlet: function(doms_str) {
				var doms = QD.Select(doms_str);
				if(doms.constructor !== Array) {
					QD.CreateInlet(this, doms);
				} else {
					for(var i = 0; i < doms.length; ++i) {
						QD.CreateInlet(this, doms[i]);
					}
				}
				return this;
			},
			// ==== Outlet ==== //
			// -- Param (doms_str) 	: Name of DOM element(s)
			// -- Param (callback) 	: Function to run on value update
			// -- Desc				: Creates one or more outlets
			outlet: function(doms_str, callback) {
				var doms = QD.Select(doms_str);
				if(doms.constructor !== Array) {
					QD.CreateOutlet(this, doms, callback);
				} else {
					for(var i = 0; i < doms.length; ++i) {
						QD.CreateOutlet(this, doms[i], callback);
					}
				}
				return this;
			}
		}
	},
	// ==== CreateInlet ==== //
	// -- Param (qd)	 	: QD object
	// -- Param (dom)	 	: HTML DOM reference. Used to link event listeners
	// -- Desc	  			: Adds "input" event listener to dom, pushes dom to qd inlets. Updates qd object.
	CreateInlet: function(qd, dom) {
		//Temporary data value
		var t = qd;
		//Add event listener to input of DOM
		dom.addEventListener("input", function(e) {
			t.update(e.target.value);
		});
		//Push input reference into array of inputs
		qd.inlets.push(dom);
		//Update data value
		qd.update(qd.value);
	},
	// ==== CreateOutlet ==== //
	// -- Param (qd)	 	: QD object
	// -- Param (dom)	 	: HTML DOM reference. Used to link event listeners
	// -- Param (callback) 	: Callback function 
	// -- Desc	  			: Creates outlet object of dom and callback and store in qd object. Updates qd object.
	CreateOutlet: function(qd, dom, callback) {
		//Build outlet variable with dom reference, and outlet callback
		var out = {
			dom:dom,
			callback:callback
		};
		//Push output reference
		qd.outlets.push(out);
		//Updata data value
		qd.update(qd.value);
	},
	// ==== Select ==== //
	// -- Param (id)	 	: String name of dom element
	// -- Desc	  			: Tries to get element by String name.
	// -- Return 			: Can return one or more dom objects, or undefined if not found.
	Select: function(id) {
		var e = undefined;

		//Try all dom accessors
		if(e == undefined)
			e = document.getElementById(id);
		if(e == undefined)
			e = document.getElementById(id);
		if(e == undefined)
			e = document.getElementsByClassName(id);
		if(e == undefined)
			e = document.getElementsByName(id);
		if(e == undefined)
			e = document.getElementsByTagName(id);
		return e;
	},
	Preset: {
		// -- Callback preset to present data in HTML
		HTML: function(v, d) {
			d.innerHTML = v;
		},
		// -- Callback preset to present data in attribute (attr)
		Attribute: function(attr) {
			return function(v, d) {
				d.setAttribute(attr, v);
			}
		}
	}
};