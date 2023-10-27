class FlagIcon {
	constructor(o) {
		this.poleWidth = 0.05;
		this.poleShape = [[0,-1], [this.poleWidth,-1], [this.poleWidth,0], [0,0], [0,-1]];
		this.flagShape = [];
		this.x = o.x;
		this.y = o.y;
		this.size = o.s;
		this.phase = this.limitedRandom(0, Math.PI);
		this.windSpeed = this.limitedRandom(-0.7, -0.3);
		this.amp = 0.1;
		this.flength = 0.5;
		this.fheight = 0.4;
		this.color = o.color || "#000000";
		this.hlcolor = o.higlight || "#cd485d"
		this.highlighted = false;
		this.titleFont = {fontSize: 24, fontStyle: 'normal', fontWeight: 'bold', fontFamily: 'Voltaire'};		
		this.descFont = {fontSize: 16, fontStyle: 'italic', fontWeight: 'normal', fontFamily: 'Ubuntu'};		
		this.title = o.title || "Somewhere...";
		this.description = o.description || "Something happened";
		this.desc_padding = 3;
		this.href = o.href || {type: "none"};
	}

//draws the given shape to the screen. Input - DOMElement, int, int, float, array, bool, string, bool
	drawShape(ctx, x, y, size, iconShape, shadow, color, hl) {
		if (!shadow) {
			ctx.shadowBlur = 0;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
		}
		if (hl) {
			ctx.fillStyle = this.hlcolor;
		} else {
			ctx.fillStyle = color;
		}
		for (var i = 0; i < iconShape.length; i++) {
			ctx.beginPath();
			ctx.moveTo(x + iconShape[i][iconShape[i].length-1][0] * size, y + iconShape[i][iconShape[i].length-1][1] * size);
			for (var j = 0; j < iconShape[i].length; j++) {
				ctx.lineTo(x + iconShape[i][j][0] * size, y + iconShape[i][j][1] * size);
			}
			ctx.fill();		
		}
/*		if (hl) {
			ctx.shadowBlur = 0;
			ctx.shadowOffsetX = 0;
			ctx.shadowOffsetY = 0;
			ctx.strokeStyle = this.hlcolor;
			ctx.lineWidth = 1;		
			for (var i = 0; i < iconShape.length; i++) {
				ctx.beginPath();		
				ctx.moveTo(x + iconShape[i][iconShape[i].length-1][0] * size, y + iconShape[i][iconShape[i].length-1][1] * size);
				for (var j = 0; j < iconShape[i].length; j++) {
					ctx.lineTo(x + iconShape[i][j][0] * size, y + iconShape[i][j][1] * size);
				}
				ctx.stroke();		
			}
		}*/
	}	

	limitedRandom(_min, _max) {
		return (Math.random() * (_max - _min) + _min);
	}
	
	getHit(canvas, x, y) {
		const minx = canvas.width * this.x - this.size * (0.5-this.x + this.poleWidth);
		const maxx = minx + this.size * (this.flength + this.amp);
		const miny = canvas.height * this.y - this.size + this.size * this.amp;
		const maxy = miny + this.size * (this.fheight + this.amp);
		if ((x >= minx) && (x <= maxx) && (y >= miny) && (y <= maxy)) 
			return true;
		return false;
	}
	
	updatePhase() {
		this.flagShape = [[this.poleWidth,this.amp]];
		for (var i = 0; i < 9; i++) {
			var cx = (i / 9) * 2 * Math.PI;
			var cy = Math.sin(cx + this.phase) * this.amp * i / 9 + 0.1 - 1;
			cx = cx * this.flength / (2 * Math.PI) + this.poleWidth;
			this.flagShape.push([cx, cy]);
		}
		for (var i = 8; i >= 0; i--) {
			var cx = (i / 9) * 2 * Math.PI;
			var cy = Math.sin(cx + this.phase) * this.amp * i / 9 + 0.1  + this.fheight - 1;
			cx = cx * this.flength / (2 * Math.PI)+ this.poleWidth;
			this.flagShape.push([cx, cy]);
		}		
		this.flagShape.push(this.flagShape[0]);
		this.phase += this.windSpeed;
		if (this.phase < 0) {
			this.phase += (2 * Math.PI);
			this.windSpeed += this.limitedRandom(-0.1, 0.1);
			if (this.windSpeed < -0.7) this.windSpeed = -0.7;
			if (this.windSpeed > -0.3) this.windSpeed = -0.3;
		}		
	}
	
	drawShadow(ctx, canvas) {
		var shapeToDraw = [this.poleShape, this.flagShape];
		ctx.save();
		ctx.globalAlpha = 0.1;
		ctx.transform(1,0,0.3,1,canvas.width * this.x,canvas.height * this.y);
		ctx.transform(1,0,-0.5,0.75,0,0);
		this.drawShape(ctx, 0, 0, this.size, shapeToDraw, false, "#000000", false);
		ctx.transform(1,0,-0.05,1,0,0);
		this.drawShape(ctx, 0, 0, this.size, shapeToDraw, false, "#000000", false);
		ctx.transform(1,0,0,1.1,0,0);
		this.drawShape(ctx, 0, 0, this.size, shapeToDraw, false, "#000000", false);
		ctx.transform(1,0,-0.05,1,0,0);
		this.drawShape(ctx, 0, 0, this.size, shapeToDraw, false, "#000000", false);
		ctx.transform(1,0,-0.05,1,0,0);
		this.drawShape(ctx, 0, 0, this.size, shapeToDraw, false, "#000000", false);
		ctx.restore();
	}
	
	wrapText(ctx, text, maxWidth) {
		var words = text.split(" ");
		var lines = [];
		var currentLine = words[0];
		for (var i = 1; i < words.length; i++) {
			var word = words[i];
			var width = ctx.measureText(currentLine + " " + word).width;
			if (width < maxWidth) {
				currentLine += " " + word;
			} else {
				lines.push(currentLine);
				currentLine = word;
			}
		}
		lines.push(currentLine);
		return lines;
	}
	
	drawInfo(ctx, canvas) {
		ctx.font = this.titleFont.fontStyle + ' ' + this.titleFont.fontWeight + ' ' + this.titleFont.fontSize + 'px ' + this.titleFont.fontFamily;
		ctx.textBaseline = "bottom";
		const tw = ctx.measureText(this.title).width;
		var rightSide = true;
		if ((tw + canvas.width * this.x + this.size * this.flength + 35) > canvas.width) {
			rightSide = false;
		}
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowColor = "#FFFFFF";
//			ctx.shadowColor = "rgba(255, 255, 255, .75)";
		ctx.shadowBlur = 30;
		ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
		var startX = canvas.width * this.x + this.size * this.flength + 35;
		if (!rightSide) 
			startX = canvas.width * this.x + this.size * this.flength - 35 - tw
		ctx.fillRect(startX, canvas.height * this.y - this.size - 35 - this.titleFont.fontSize, tw, this.titleFont.fontSize);
		ctx.fillStyle = this.color;
		ctx.fillText(this.title, startX, canvas.height * this.y - this.size - 35);
		ctx.font = this.descFont.fontStyle + ' ' + this.descFont.fontWeight + ' ' + this.descFont.fontSize + 'px ' + this.descFont.fontFamily;
		var rows = this.wrapText(ctx, this.description, tw);
		ctx.textBaseline = "top";
		var dy = canvas.height * this.y - this.size - 35 + this.desc_padding;
		for (var i = 0; i < rows.length; i++) {
			ctx.fillStyle = "rgba(255, 255, 255, 0.3)";;
			ctx.fillRect(startX, dy, ctx.measureText(rows[i]).width, this.descFont.fontSize);
			ctx.fillStyle = this.color;
			ctx.fillText(rows[i], startX, dy);
			dy += (this.descFont.fontSize + this.desc_padding);
		}
		ctx.strokeStyle = this.color;
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowColor = "rgba(0, 0, 0, 0)";
		ctx.shadowBlur = 0;
		ctx.beginPath();
		if (rightSide) {
			ctx.moveTo(canvas.width * this.x + this.size * this.flength, canvas.height * this.y - this.size);
			ctx.lineTo(canvas.width * this.x + this.size * this.flength + 35, canvas.height * this.y - this.size - 35);
			ctx.lineTo(canvas.width * this.x + this.size * this.flength + 35 + tw, canvas.height * this.y - this.size - 35);
		} else {
			ctx.moveTo(canvas.width * this.x, canvas.height * this.y - this.size);
			ctx.lineTo(canvas.width * this.x - 35, canvas.height * this.y - this.size - 35);
			ctx.lineTo(canvas.width * this.x - 35 - tw, canvas.height * this.y - this.size - 35);
			
		}
		ctx.stroke();
	}
	
	draw(ctx, canvas) {
		var shapeToDraw = [this.poleShape, this.flagShape];
		ctx.save();
		ctx.transform(1,0,0.5-this.x,1,canvas.width * this.x,canvas.height * this.y);
		this.drawShape(ctx, 0, 0, this.size, shapeToDraw, false, this.color, this.highlighted);
		ctx.restore();
		//draw title and description
	}
}