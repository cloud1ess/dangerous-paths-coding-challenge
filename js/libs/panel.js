var Panel = (function () {

	function Panel(parent, canvas, mouseEnabled) {
		this.parent = parent;
		this.pos = {x: 0, y: 0};
		this.realPos = {x: 0, y: 0};
		this.rotation = 0;
		this.hidden = false;
		this.toDraw = [];
		this.children = [];
		this.eventCallbacks = {};
		this.mouseHitBox;
		this.mouseEnabled = {mousedown: false, mouseup: false, mousemove: false, mousewheel: false};

		if (parent) {
			parent.addChild(this);
			this.canvas = parent.canvas;

		} else {
			typeof canvas === 'string' ? this.canvasElement = document.getElementById(canvas) : this.canvasElement = canvas;
			if (mouseEnabled) {
				this.canvasElement.addEventListener('mousedown', this.globalMouseHandle.bind(this), false);
				this.canvasElement.addEventListener('mouseup', this.globalMouseHandle.bind(this), false);
				this.canvasElement.addEventListener('mousemove', this.globalMouseHandle.bind(this), false);
				this.canvasElement.addEventListener('mousewheel', this.globalMouseHandle.bind(this), false);
				this.canvasElement.addEventListener('mouseout', this.globalMouseHandle.bind(this), false);
			}

			this.canvas = this.canvasElement.getContext("2d");
		}
	}

	Panel.prototype.addChild = function (panel) {
		this.children.push(panel);
	}

	Panel.prototype.removeChild = function (panel) {
		var i = this.children.length;
		while (i >= 0) {
			if (panel === this.children[i]) {
				this.children.splice(i, 1);
				i = 0;
			}
			i--;
		}
	}

	Panel.prototype.removeAllChildren = function () {
		var i = this.children.length - 1;
		while (i >= 0) {
			this.children[i].tearDown(true);
			this.children.splice(i, 1);
			i--;
		}
	}

	// ------ Mouse ------

	Panel.prototype.enableMouse = function (box, down, up, move, wheel, out) {
		this.mouseHitBox = box;
		this.mouseEnabled.mousedown = down;
		this.mouseEnabled.mouseup = up;
		this.mouseEnabled.mousemove = move;
		this.mouseEnabled.mousewheel = wheel;
		this.mouseEnabled.mouseout = out;
	}

	Panel.prototype.globalMouseHandle = function (evt) {
		var rect = this.canvasElement.getBoundingClientRect();
		var data = {
			handled: false,
			type: evt.type,
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};

		if (evt.type === 'mousewheel') {
			data.scroll = evt.wheelDelta;

		}
		this.sinkMouseEvent(data);
	}

	Panel.prototype.sinkMouseEvent = function (evt) {
		var i = this.children.length - 1;

		while (i >= 0 && !evt.handled) {
			this.children[i].sinkMouseEvent(evt);
			i--;
		}
		if (!evt.handled && this.mouseEnabled[evt.type]) {
			if (MathUtils.pointInRect(evt.x, evt.y, this.realPos.x + this.mouseHitBox.x1, this.realPos.y + this.mouseHitBox.y1, this.realPos.x + this.mouseHitBox.x2, this.realPos + this.mouseHitBox.y2)) {
				this.fireEvent(evt, false);
			}
		}
	}

	// ------ Render ------

	Panel.prototype.render = function () {
		var i = 0, toRender, data;

		if (!this.parent) {
			this.canvasElement.width = this.canvasElement.width;
			this.canvas.fillStyle = "rgba(255, 255, 255, 0)";
			this.canvas.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
		}

		if (!this.hidden) {

			while (i < this.toDraw.length) {
				toRender = this.toDraw[i];
				data = toRender.data;
				data.x = data.origX + this.realPos.x;
				data.y = data.origY + this.realPos.y;
				if (data.from && data.to) {
					data.from.x = data.from.x + this.realPos.x;
					data.from.y = data.from.y + this.realPos.y;
					data.to.x = data.to.x + this.realPos.x;
					data.to.y = data.to.y + this.realPos.y;
				}
				data.rotation = data.origRot + this.rotation;

				toRender.render(this.canvas, data);
				i++;
			}

			this._renderChildren();
		}
	}

	Panel.prototype._renderChildren = function () {
		var i = 0;

		while (i < this.children.length) {
			this.children[i].render();
			i++;
		}
	}

	// ------ Drawing ------

	Panel.prototype.clear = function () {
		this.toDraw.length = 0;

		var i = 0;
		while (i < this.children.length) {
			this.children[i].clear();
			i++;
		}
	}

	Panel.prototype.drawLine = function (data) {
		this._addToDrawList(CanvasRender.line, data);
	}
	Panel.prototype.drawRect = function (data) {
		this._addToDrawList(CanvasRender.rect, data);
	}
	Panel.prototype.drawStrokeRect = function (data) {
		this._addToDrawList(CanvasRender.strokeRect, data);
	}
	Panel.prototype.drawCircle = function (data) {
		this._addToDrawList(CanvasRender.circle, data);
	}
	Panel.prototype.drawPath = function (data) {
		this._addToDrawList(CanvasRender.path, data);
	}
	Panel.prototype.drawImage = function (data) {
		this._addToDrawList(CanvasRender.image, data);
	}
	Panel.prototype.drawText = function (data) {
		this._addToDrawList(CanvasRender.text, data);
	}
	Panel.prototype.drawSprite = function (data) {
		this._addToDrawList(CanvasRender.sprite, data);
	}
	Panel.prototype.drawImageData = function (data) {
		this._addToDrawList(CanvasRender.imageData, data);
	}

	Panel.prototype._addToDrawList = function (renderFunc, data) {
		data.origX = data.x || 0;
		data.origY = data.y || 0;
		data.origRot = data.rotation || 0;

		this.toDraw.push({render: renderFunc, data: data});
	}

	Panel.prototype.playSprite = function (id) {
		var i = this.toDraw.length - 1;

		while (i >= 0) {
			if (this.toDraw[i].data.id === id) {
				this.toDraw[i].data.playing = true;
			}
			i--;
		}
	}

	// ------ Positioning ------

	Panel.prototype.setPos = function (pos) {
		this.pos.x = pos.x;
		this.pos.y = pos.y;

		if (this.parent) {
			this.updateRealPos(this.parent.realPos);
		} else {
			this.updateRealPos({x: 0, y: 0});
		}
	}

	Panel.prototype.updateRealPos = function (pos) {
		this.realPos.x = pos.x + this.pos.x;
		this.realPos.y = pos.y + this.pos.y;

		var i = this.children.length - 1;

		while (i >= 0) {
			this.children[i].updateRealPos(this.realPos);
			i--;
		}
	}

	Panel.prototype.setRotation = function (rot) {
		this.rotation = rot;
	}

	// ------ Events ------

	Panel.prototype.fireEvent = function (event, bubble) {
		var i;

		if (this.eventCallbacks[event.type]) {
			i = this.eventCallbacks[event.type].length - 1;

			while (i >= 0) {
				this.eventCallbacks[event.type][i](event);
				i--;
			}

		} else if (parent && bubble) {
			parent.fireEvent(event);
		}
	}

	Panel.prototype.addEventCallback = function (type, callback) {
		if (!this.eventCallbacks[type]) {
			this.eventCallbacks[type] = [];
		}
		this.eventCallbacks[type].push(callback);
	}

	Panel.prototype.tearDown = function (removeFromParent) {
		this.toDraw.length = 0;
		this.eventCallbacks = null;
		this.canvas = null

		var i = this.children.length - 1;

		while (i >= 0) {
			this.children[i].tearDown(false);
			this.children.splice(i, 1);
			i--;
		}
		this.children.length = 0;
		if (this.parent && removeFromParent) this.parent.removeChild(this);
		this.parent = null;
	}

	return Panel;

})();
