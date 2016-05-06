var QD = {
	Data: function(val) {
		return {
			value: val,
			inlets: [],
			outlets: [],
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
	CreateInlet: function(qd, dom) {
		//Temporary data value
		var t = qd;
		//Add event listener to input of DOM
		dom.oninput = function(e) {
			t.update(e.target.value);
		}
		//Push input reference into array of inputs
		qd.inlets.push(dom);
		//Update data value
		qd.update(qd.value);
	},
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
		HTML: function(v, d) {
			d.innerHTML = v;
		},
		Attribute: function(attr) {
			return function(v, d) {
				d.setAttribute(attr, v);
			}
		}
	}
};