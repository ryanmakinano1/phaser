Game.Preloader = function(game){
	this.preloadBar = null;

};

Game.Preloader.prototype = {
	preload:function(){
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY,'preloaderBar');

		this.preloadBar.anchor.setTo(0.5,0.5);
		this.time.advanceTiming = true;
		this.load.setPreloadSprite(this.preloadBar);
	
//LOAD ALL ASSETS


		this.load.tilemap('map','assets/level1.json',null,Phaser.Tilemap.TILED_JSON);
		this.load.image('tileset','assets/tileset.png');

		this.load.spritesheet('player','assets/player.png',24,26);
		this.load.spritesheet('buttons', 'assets/buttons.png',193,71);

		this.load.image('titlescreen','assets/titlescreen.png');
		this.load.image('button','assets/button.png');

	},




	create:function(){
		this.state.start('MainMenu');
	}



};