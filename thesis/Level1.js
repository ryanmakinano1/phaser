Game.Level1 = function (game) {};

var map;
var layer;


var player;
var controls = {};
var playerSpeed = 150;
var jumpTimer = 0;

var button;
var respawn;
var scoreText;
var score = 0;


Game.Level1.prototype = {
	create:function (game) {
		this.stage.backgroundColor = '#3A5963';

		this.physics.arcade.gravity.y = 1400;

		respawn = game.add.group();

		map = this.add.tilemap('map');
		map.addTilesetImage('tileset','tileset');

		layer=map.createLayer('Tile Layer 1');
		layer.resizeWorld();

		map.setCollisionBetween(0,12);

		map.setTileIndexCallback(6,this.resetPlayer,this);
		map.setTileIndexCallback(7,this.getCoin,this);
		map.setTileIndexCallback(9,this.speedPowerup,this);
		map.createFromObjects('Object Layer 1',8,'',0,true,false,respawn);

		player = this.add.sprite(0,0,'player');
		player.anchor.setTo(0.5,0.5);


		this.spawn();

		scoreText = game.add.text(50, 50, 'score: 0', { fontSize: '32px', fill: '#000' });

		player.animations.add('idle',[0,1],1,true);
		player.animations.add('jump',[2],1,true);
		player.animations.add('run',[3,4,5,6,7,8],7,true);
		this.physics.arcade.enable(player);

		this.camera.follow(player);
		player.body.collideWorldBounds = true;

		canTakeCoin = true;

		controls = {

				right: this.input.keyboard.addKey(Phaser.Keyboard.D),
				left: this.input.keyboard.addKey(Phaser.Keyboard.A),
				up: this.input.keyboard.addKey(Phaser.Keyboard.W),
					
					};

		button = this.add.button(this.world.centerX - 95, this.world.centerY +200, 'buttons',function(){
			console.log('pressed');
		},this,2,1,0);

		button.fixedToCamera = true;

	},
	update: function () {

		this.physics.arcade.collide(player,layer);
		player.body.velocity.x = 0;

		

		if(controls.right.isDown){
			player.animations.play('run');
			player.scale.setTo(1,1);
			player.body.velocity.x +=playerSpeed;
		}

		if(controls.left.isDown){
			player.animations.play('run');
			player.scale.setTo(-1,1);
			player.body.velocity.x -=playerSpeed;
		}

		if(controls.up.isDown && (player.body.onFloor() || player.body.touching.down) && this.time.now > jumpTimer)
		{
			player.body.velocity.y = -600;
			jumpTimer = this.time.now + 750;
			player.animations.play('jump');
		}

		if (player.body.velocity.x == 0 && player.body.velocity.y == 0) 
		{
			player.animations.play('idle');
		}

	},


	// gameOver:function(){
	// 	game.state.start("GameOver");
	// },
	resetPlayer:function(){

		player.reset(100,560);
	},

	spawn:function(){

		respawn.forEach(function(spawnPoint){
			player.reset(spawnPoint.x,spawnPoint.y);
		},this);
    	


	},
	speedPowerup:function(){
		map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
		playerSpeed += 50;

		
		this.time.events.add(Phaser.Timer.SECOND * 2, function(){
			playerSpeed -= 50;
		});
	},

	getCoin:function(){

		if(canTakeCoin == true){
			
		canTakeCoin = false;
         map.putTile(-1,layer.getTileX(player.x), layer.getTileY(player.y));
         score += 10;
         scoreText.text = 'Score: ' + score;
        }
	},

	increment:function(){
		score += 1;
   		scoreText.text = 'Score: ' + score;
   		
		
	}
}
