'use strict';


function TouchEventHandler(){
	
	this.position = {x:0,y:0};
	this.velocity = {x:0,y:0};
	this.delta = {x:0,y:0,t:0};
	this.step = {x:0,y:0,t:0};
	this.timestamp = null;
	
}

TouchEventHandler.prototype = {
	getPointerPosition:function(evt){
		if (!evt.touches){
			return {x:evt.pageX,y:evt.pageY,t:evt.timeStamp};
		} else {
			return {x:evt.touches[0].pageX, y:evt.touches[0].pageY,t:evt.timeStamp};
		}
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
				
		return this;
	}
};


function RotateButton(element, opts){
	this.element = element;
	this.value = 0;
	this.rotation = 0;
	this.last_rotation = 0;
	this.init();
}

RotateButton.prototype = {
	init:function(){
		
		this.dragging = false;
		this._touch = new TouchEventHandler();
		this._handleTouchStart = function(evt){
			document.addEventListener('mousemove', this._handleTouchMove );
			document.addEventListener('mouseup', this._handleTouchEnd );
			document.addEventListener('touchmove', this._handleTouchMove );
			document.addEventListener('touchend', this._handleTouchEnd );

			this.dragging = true;
			this._touch.reset(evt);
			this.last_rotation = this.getAngle();

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
			document.removeEventListener('mousemove', this._handleTouchMove );
			document.removeEventListener('mouseup', this._handleTouchEnd );
			document.removeEventListener('touchmove', this._handleTouchMove );
			document.removeEventListener('touchend', this._handleTouchEnd );
		}.bind(this);


		this.position = this.element.getBoundingClientRect();

		this.element.addEventListener('mousedown', this._handleTouchStart );
		this.element.addEventListener('touchstart', this._handleTouchStart );
	},

	setStyle:function(){
      var style = 'rotate3d(0,0,1,'+this.rotation+'rad)';
      this.element.style.mozTransform = style;
      this.element.style.oTransform = style;
      this.element.style.webkitTransform = style;
      this.element.style.msTransform = style;
      this.element.style.transform = style;		
	},

	getAngle:function(){
		var cy = this.position.top + this.position.height/2;
		var cx = this.position.left + this.position.width/2;

		var dx = this._touch.position.x - cx;
		var dy = this._touch.position.y - cy;

		var da = Math.atan2(dy,dx);
		return da;		
	},

	onupdate:function(){

	},

	update:function(){
		var da = this.getAngle();
		var step = da - this.last_rotation;
		
		var l_angle = this.rotation/Math.PI/2;
		
		this.rotation += step;

		if (step !== 0){
			this.onupdate();
		}
				
		var angle = this.rotation/Math.PI/2;
		if (angle < 0) angle += 1;
		if (l_angle < 0) l_angle += 1;
		this.value = angle;
		
/*
		var diff = angle - l_angle;
		if (diff > 0.9){
			diff = 1-diff;
		}

		if (diff < -0.9){
			diff = diff+1;
		}

		this.value += diff;

	*/
		e.innerHTML = 'val:'+ this.value +'<br/>df:'+'<br/>angle:' + angle + '<br/> step' + step;		
		this.last_rotation = da;
		this.setStyle();
	},
};
		var e = document.getElementById('dev');	
