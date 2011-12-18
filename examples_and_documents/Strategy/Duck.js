var Duck = function(){

};
Duck = Interface.implement(Displayable, Duck, true);
Duck.prototype.swim = function(){
	console.log("Chop!");
};
