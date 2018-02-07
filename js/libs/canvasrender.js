var CanvasRender = {
	line: function (canvas, data) {
		if (!data.thickness) data.thickness = 2;
		if (!data.colour) data.colour = '#000000';

		canvas.lineWidth = data.thickness;
		canvas.strokeStyle = data.colour;
		canvas.beginPath();
		canvas.moveTo(data.from.x, data.from.y);
		canvas.lineTo(data.to.x, data.to.y);
		canvas.stroke();
	},

	rect: function (canvas, data) {
		if (!data.colour) data.colour = '#000000';
		canvas.fillStyle = data.colour;
		canvas.fillRect(data.x, data.y, data.wid, data.hei);
	},

	strokeRect: function (canvas, data) {
		canvas.strokeStyle = data.colour || '#000000';
		canvas.lineWidth= data.lineWidth || 1;
		canvas.strokeRect(data.x, data.y, data.wid, data.hei);
	},

	circle: function (canvas, data) {
		if (!data.colour) data.colour = '#000000';
		canvas.fillStyle = data.colour;
		canvas.beginPath();
		canvas.arc(data.x, data.y, data.radius, 0, 2 * Math.PI);
		canvas.stroke();
		canvas.fill();
	},

	image: function (canvas, data) {

		if (data.rotation != 0) {
			// rotate 45º image "imgSprite", based on its rotation axis located at x=20,y=30 and draw it on context "ctx" of the canvas on coordinates x=200,y=100
			//rotateAndPaintImage ( ctx, imgSprite, 45*TO_RADIANS, 200, 100, 20, 30 );
			canvas.translate(data.x - data.origX, data.y - data.origY);
			canvas.rotate(data.rotation);
			if (data.sx && data.sy) {
				canvas.drawImage(data.img, data.sx, data.sy, data.sWid, data.sHei, data.origX, data.origY, data.wid, data.hei);

			} else if (data.wid && data.hei) {
				canvas.drawImage(data.img, data.origX, data.origY, data.wid, data.hei);

			} else {
				canvas.drawImage(data.img, data.origX, data.origY);
			}
			canvas.rotate(-data.rotation);
			canvas.translate(-data.x + data.origX, -data.y + data.origY);

		} else {

			if (data.sx && data.sy) {
				canvas.drawImage(data.img, data.sx, data.sy, data.sWid, data.sHei, data.x, data.y, data.wid, data.hei);
			} else if (data.wid && data.hei) {
				canvas.drawImage(data.img, data.x, data.y, data.wid, data.hei);
			} else {
				canvas.drawImage(data.img, data.x, data.y);
			}
		}
	},

	text: function (canvas, data) {
		canvas.font = data.font;
		canvas.fillStyle = data.colour;
		canvas.fillText(data.text, data.x, data.y);
	},

	sprite: function (canvas, data) {
		if (data.playing) {
			data.frameTimer--;
			if (data.frameTimer <= 0) {
				data.frameTimer = data.frameRate;
				data.currentFrame++
				if (data.currentFrame >= data.frames.length) {
					data.currentFrame = 0;
					data.playing = data.autoPlay;
				}
			}
		}
		var xFrame = data.frames[data.currentFrame] * data.wid;

		if (data.rotation != 0) {
			canvas.translate(data.x - data.origX, data.y - data.origY);
			canvas.rotate(data.rotation);

			if (data.outputWid && data.outputHei) {
				canvas.drawImage(data.img, xFrame, 0, data.wid, data.hei, data.origX, data.origY, data.outputWid, data.outputHei);
			} else {
				canvas.drawImage(data.img, xFrame, 0, data.wid, data.hei, data.origX, data.origY, data.wid, data.hei);
			}

			canvas.rotate(-data.rotation);
			canvas.translate(-data.x + data.origX, -data.y + data.origY);

		} else {
			if (data.outputWid && data.outputHei) {
				canvas.drawImage(data.img, xFrame, 0, data.wid, data.hei, data.x, data.y, data.outputWid, data.outputHei);
			} else {
				canvas.drawImage(data.img, xFrame, 0, data.wid, data.hei, data.x, data.y, data.wid, data.hei);
			}

		}
	},

	path: function (canvas, data) {
		var path = data.path, i = 1;

		canvas.beginPath();
		canvas.strokeStyle = data.lineColour || data.colour;
		canvas.lineWidth = data.thickness || 1;
    if (data.colour) canvas.fillStyle = data.colour;
		canvas.moveTo(path[0].x, path[0].y);

		while (i < path.length) {
			canvas.lineTo(path[i].x, path[i].y);
			i++;
		}
    if (data.colour || data.closePath) canvas.closePath();
		canvas.stroke();
    if (data.colour) canvas.fill();
	},

	imageData: function (canvas, data) {
		var ctx = canvas.canvas;
		ctx.putImageData(data.imgData, data.x, data.y, data.x, data.y, data.wid, data.hei);
	}
}
