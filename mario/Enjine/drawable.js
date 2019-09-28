/**
	Base class for all drawable objects, makes ordering automatic.
	Code by Vishnu Sivan, 2019
*/

Enjine.Drawable = function() {
    this.ZOrder = 0;
};

Enjine.Drawable.prototype = {
    Draw: function(context) { }
};