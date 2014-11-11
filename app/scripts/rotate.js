'use strict';


function TouchEventHandler(){
	
	this.position = {x:0,y:0};
	this.velocity = {x:0,y:0};
	this.delta = {x:0,y:0,t:0};
	this.step = {x:0,y:0,t:0};
	this.timestamp = null;
	this.angle = 0;
}

TouchEventHandler.prototype = {
	getPointerPosition:function(evt){
		return {x:evt.pageX,y:evt.pageY,t:evt.timeStamp};
	},
	reset:function(evt){
		var pos = this.getPointerPosition(evt);
		this.position.x = pos.x;
		this.position.y = pos.y;
		this.velocity.x = 0;
		this.velocity.y = 0;
		this.delta.x = 0;
		this.delta.y = 0;
		this.delta.t = 0;
		this.step.x = 0;
		this.step.y = 0;
		this.step.t = 0;
		this.timestamp = pos.t;
	},
	add:function(evt){
		var pos = this.getPointerPosition(evt);
		
		var dx = pos.x - this.position.x;
		var dy = pos.y - this.position.y;
		var dt =  pos.t - this.timestamp;

		this.position.x = pos.x;
		this.position.y = pos.y;
		this.velocity.x = dx/dt;
		this.velocity.y = dy/dt;
		this.step.t = dt;
		this.step.x = dx;
		this.step.y = dy;
		this.delta.x += dx;
		this.delta.y += dy;
		this.delta.t += dt;
		this.angle = Math.atan2(this.delta.y, this.delta.x);

		return this;
	}
};


function Rotateable(element){
	this.element = element[0];
	this.init();
}

Rotateable.prototype = {
	init:function(){
		
		this.dragging = false;
		this._touch = new TouchEventHandler();
		this._handleTouchStart = function(evt){			
			this.dragging = true;
			this._touch.reset(evt);
		}.bind(this);

		this._handleTouchMove = function(evt){
			if (this.dragging){
				evt.stopPropagation();
				evt.preventDefault();

				this._touch.add(evt);				
				this.update();
			}
		}.bind(this);

		this._handleTouchEnd = function(evt){
			this.dragging = false;
		}.bind(this);


		this.element.addEventListener('mousedown', this._handleTouchStart );
		document.addEventListener('mousemove', this._handleTouchMove );
		document.addEventListener('mouseup', this._handleTouchEnd );		
	},

	setStyle:function(){
      var style = 'rotate3d(0,0,1,'+this._touch.angle+'rad)';
      this.element.style.mozTransform = style;
      this.element.style.oTransform = style;
      this.element.style.webkitTransform = style;
      this.element.style.msTransform = style;
      this.element.style.transform = style;		
	},

	update:function(){		
		this.setStyle();
	},
};
