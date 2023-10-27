class TravelMap {
	constructor(canvas, ctx, container, o) {
		var self = this;
		this.canvas = canvas;
		this.ctx = ctx;
		this.container = container;
		this.bgimage = new Image();
		this.bgimage.src = o.bg_source;
		this.ready = false;
		this.bgimage.onload = function(e){			
			self.ready = true;
		}
		this.selectedFlag = -1;
		this.flags = [
		new FlagIcon({
			x:0.1251, y:0.4189,  s:35, color:"#4e3413", 
			title:"Animationmentor graduation trip (2013)",
			description: "In the summer of 2013 I had a chance to spend a few weeks in California to visit Siggraph, and participate the Animationmentor graduation ceremony. I also took an amazing roadtrip to the wilderness of Yosemite and Sequoia national parks.",
			href: {
				type: "imageDisplay",
				imageList: ['https://www.youtube.com/embed/FkkpiMWGhGw?si=7UAgh29T4lLs4H5C']
			}}),
		new FlagIcon({
			x:0.6215, y:0.4078,  s:35, color:"#4e3413", 
			title:"Zakynthos, Kefalonia vacation (2022)",
			description: "We chose to spend a few lovely days exploring the beautiful Ionian islands right next to Greece, and we didn't disappoint. Great food, weather and beaches.",
			href: {
				type: "imageDisplay",
				imageList: ['https://www.youtube.com/embed/9FfUMaYoa0E?si=yi5HsVXcec2uUiUo']
			}}),
		new FlagIcon({
			x:0.6015, y:0.378,  s:35, color:"#4e3413", 
			title:"Sailing in Croatia (2014)",
			description: "Nothing is better than gently rocking on the waves while sipping some nice wine. That was our pastime when my buddies and me rented a boat and sailed around Croatia. Of course we still had chance to dip in the water and try some local foods.",
			href: {
				type: "imageDisplay",
				imageList: ['https://www.youtube.com/embed/Q-BBXmpBCxc?si=zOoD2x4q9jUGs9Af']
			}}),
		new FlagIcon({
			x:0.5352, y:0.3228,  s:35, color:"#4e3413", 
			title:"Exploring Scotland (2018)",
			description: "The beauty of the highlands and coastlines of Scotland is incomparable with anything else, just like the taste of fine scotch and haggis. We spent a few nights there but I am sure that was not my last time because almost infinite amount of interesting mysteries waiting there.",
			href: {
				type: "imageDisplay",
				imageList: ['https://www.youtube.com/embed/ZqLZcIAIr1c?si=Y68zLmlfB0UOTjra']
			}}),
		new FlagIcon({
			x:0.54, y:0.3438,  s:35, color:"#4e3413", 
			title:"Searching for wild horses - New Forest, UK (2018)",
			description: "There's a place in the UK where you can bump into horses in the middle of the forest, just like back in the days. We spent an unbelievable weekend surrounded by them and it was crazy how friendly and curious creatures they are.",
			href: {
				type: "imageDisplay",
				imageList: ['https://www.youtube.com/embed/Cd2SiuFPfW8?si=WV_6UOpc-QFsh_Rq']
			}}),
		new FlagIcon({
			x:0.3561, y:0.3526,  s:35, color:"#4e3413", 
			title:"Niagara Falls, ON, Canada (2022)",
			description: "We took a roadtrip to the great falls near Toronto and was awed by the size of it. Didn't like the fair by this natural beauty though...",
			href: {
				type: "imageDisplay",
				imageList: ['https://www.youtube.com/embed/fY9zn1oIWIg?si=amAm3BWH6CwPIXDA']
			}}),
		new FlagIcon({
			x:0.683, y:0.4431,  s:35, color:"#4e3413", 
			title:"Diving in Sharm El Sheikh (2003)",
			description: "On my first trip to abroad. I immediately took serious as my buddy and me spend two weeks in Egypt and if we are there we learnt how to dive and spent all the time possible underwater. Of course we saved time for a quick trip to see the magnificent pyramids.",
			}),
		new FlagIcon({
			x:0.9492, y:0.4553,  s:35, color:"#4e3413", 
			title:"Visiting Taiwan (2005)",
			description: "I flought here to visit my dear friend and was lucky to be able to spend a month with her and her family. I love the country, the mountains, the night markets and the beaches.",
			}),
		new FlagIcon({
			x:0.5079, y:0.442,  s:35, color:"#4e3413", 
			title:"Volcano gazing at La Palma (2021)",
			description: "As we enjoyed the black beaches and the great Teide of Tenerife, we took a detour to visit the active volcano on the neighbouring island.",
			}),
		new FlagIcon({
			x:0.3273, y:0.4586,  s:35, color:"#4e3413", 
			title:"Christmas on the beach, Varadero (2022)",
			description: "This is not the ordinary way to spend the holidays for us, but apparently it's not unusual for others. The resort was all inclusive and the guest were regulars. The weather was not the best all the way but it was definitely a unique experience.",
			}),
		new FlagIcon({
			x:0.3993, y:0.3802,  s:35, color:"#4e3413", 
			title:"Easter in New York City (2023)",
			description: "The holidays were perfect opportunity to drive down to New York and explore the city a little bit. The weather was sunny and the streets were busy, just as we expected.",
			}),
		new FlagIcon({
			x:0.5383, y:0.4056,  s:35, color:"#4e3413", 
			title:"Kitesurf in Tarifa (2019)",
			description: "This week was great to learn the basics of kitesurfing but also very exhausting. Every day on the beach taming the wind swimming up and down in the water. The company was great just like the food.",
			href: {
				type: "imageDisplay",
				imageList: ['https://drive.google.com/uc?export=view&id=1IkA4J4YhbqKyxWnXqgrMSgs1C27sZyuJ','https://drive.google.com/uc?export=view&id=1s93BODuSTQpJjW2fnILFWYX8A_QlKdAk','https://drive.google.com/uc?export=view&id=1ldyIy97Ryym2KOiFwAY31p5kkBvENItp','https://drive.google.com/uc?export=view&id=1KIxis_NHdzmwJkZ0DtLKAeRmOZoNQuNb','https://drive.google.com/uc?export=view&id=10ETrKatFiDzrT3s4KavqX66nQGq9pJvp']
			}})
		];
		
		this.canvas.addEventListener('mousemove', (e) => {
			const rect = this.canvas.getBoundingClientRect();
			const canvasX = e.clientX - rect.left;
			const canvasY = e.clientY - rect.top;
			var flagHit = -1;
			for (var i = 0; i < this.flags.length; i++) {
				if (this.flags[i].getHit(this.canvas, canvasX, canvasY)) {
					if (flagHit == -1) {
						flagHit = i;
						this.flags[i].highlighted = true;
					} else {
						this.flags[i].highlighted = false;
					}
				} else {
					this.flags[i].highlighted = false;
				}
			}
			this.selectedFlag = flagHit;
			if (flagHit > -1) {
				if ((this.flags[this.selectedFlag].hasOwnProperty('href')) && (this.flags[this.selectedFlag].href.type != 'none')) {
					document.body.style.cursor = 'pointer';
				} else 
					document.body.style.cursor = 'auto';
			} else {
				document.body.style.cursor = 'auto';
			}
		});
		
		this.canvas.addEventListener('mousedown', (e) => {
			if (this.selectedFlag >= 0) {
				switch (this.flags[this.selectedFlag].href.type) {
					case "imageDisplay": openImageDisplay(this.flags[this.selectedFlag].href.imageList);
				}
			}
			const rect = this.canvas.getBoundingClientRect();
			const canvasX = e.clientX - rect.left;
			const canvasY = e.clientY - rect.top;
			console.log(canvasX/this.canvas.width, canvasY/this.canvas.height);
		});
		
	}
	
	initMap() {
		var cont_positionInfo = this.container.getBoundingClientRect();
		var cont_width = cont_positionInfo.width;
		var cont_height = cont_width * 0.724;
		this.canvas.width = cont_width;
		this.canvas.height = cont_height;	
		this.ready = true;		
		this.draw();
	}
	
	destroyMap() {
		this.canvas.width = 5;
		this.canvas.height = 5;		
		this.ready = false;
	}
	
	draw() {
		if (this.ready) {
			this.ctx.drawImage(this.bgimage, 0, 0, this.canvas.width, this.canvas.height);
			for (var i = 0; i < this.flags.length; i++) {
				this.flags[i].updatePhase();
				this.flags[i].drawShadow(this.ctx, this.canvas);
			}
			for (var i = 0; i < this.flags.length; i++) {
				this.flags[i].draw(this.ctx, this.canvas);
			}
			if (this.selectedFlag >= 0) 
				this.flags[this.selectedFlag].drawInfo(this.ctx, this.canvas);
			
		}
	}
}