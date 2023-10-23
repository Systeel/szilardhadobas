class ImageSlot {
	constructor(o) {
		var self = this;
		this.id = o.id;
		this.pos = {x:0, y:0};
		this.link = o.link;
		this.tempImg = (new Image());
		this.tempImg.src = o.temp || "img/landing_load_tile.png";
		this.img = (new Image());
		this.width = o.width || -1;
		this.height = o.height || -1;
		this.scale = o.scale || 1;
		this.baseWidth = o.baseWidth;
		this.loaded = false;
		this.tempImg.onload = function(e) {
			if (self.width == -1) {
				self.width = self.tempImg.width;
			}
			if (self.height == -1) {
				self.height = self.tempImg.height;
			}
		};
		this.img.onload = function(e){
			if (self.width == -1) {
				self.width = self.img.width;
			}
			if (self.height == -1) {
				self.height = self.img.height;
			}
			self.loaded = true;
		}
		this.error = this.img.onerror = function(e){
			self.loaded = false;
		}		
	}

	loadImage(link) {
		if (link != undefined) {
			this.link = link;
		}
		this.img.src = this.link;
	}
	
	draw(ctx) {
		if (this.loaded) {
			ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width*this.scale, this.height*this.scale);
		} else {
			ctx.drawImage(this.tempImg, this.pos.x, this.pos.y, this.width*this.scale, this.height*this.scale);
		}
	}
	
	isHit(x, y) {
		if ((y >= this.pos.y) && (y <= (this.pos.y + this.img.height * this.scale))) {
			const bw = this.baseWidth * this.scale;
			const w = this.width * this.scale;
			const h = this.img.height * this.scale;
			const dx = (h-y+this.pos.y)*(w-bw)/h;
			if ((x >= dx + this.pos.x) && (x <= this.pos.x + bw + dx)) return true;
		}
		return false;
	}
	
}