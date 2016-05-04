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
			addInlet: function(id) {
				//Temporary data value
				var t = this;
				//Get DOM reference
				var r = document.getElementById(id);
				//Add event listener to input of DOM
				r.oninput = function(e) {
					t.update(e.target.value);
				}
				//Push input reference into array of inputs
				this.inlets.push(r);
				//Update data value
				this.update(this.value);
			},
			addOutlet: function(id, callback) {
				//Get DOM reference
				var e = document.getElementById(id)
				//Build outlet variable with dom reference, and outlet callback
				var out = {
					dom:e,
					callback:callback
				};
				//Push output reference
				this.outlets.push(out);
				//Updata data value
				this.update(this.value);
			}
		}
	}
};