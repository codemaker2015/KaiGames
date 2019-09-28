/**
	Represents a simple static sprite.
	Code by Vishnu Sivan, 2019
*/

Enjine.Sprite = function() {
	this.X = 0;
	this.Y = 0;
	this.Image = null;
};

Enjine.Sprite.prototype = new Enjine.Drawable();

Enjine.Sprite.prototype.Draw = function(context, camera) {
	context.drawImage(this.Image, this.X - camera.X, this.Y - camera.Y);
};