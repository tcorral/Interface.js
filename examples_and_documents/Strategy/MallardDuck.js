var MallardDuck = function(){
	Duck.apply(this);
};
MallardDuck.prototype = new Duck();
MallardDuck = Interface.implement(Quackable, MallardDuck);
MallardDuck = Interface.implement(Flyable, MallardDuck);
MallardDuck.prototype.quack = function()
{
	console.log("Quack!");
};
MallardDuck.prototype.fly = function()
{
	console.log("Fly!");
};
MallardDuck.prototype.display = function(){
	console.log("MallardDuck show.");
};
