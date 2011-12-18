# Interface.js
Javascript has no Interfaces and there are some design patterns that needs them.
Interface.js allows you to simulate an Interface similar to Java implementation allowing to implement as Interfaces
you need.

## Changelog

1.0.0

* Allow implement interfaces in Javascript classes.
* Check that all the methods of one or some interfaces are implemented.
* Allow implement interfaces creating Abstract classes.


## Description

Interface.js

* Must be used to create new classes designing to the interface.
* Allows to add behaviour using interfaces.

[API documentation](http://tcorral.github.com/Interface.js/examples_and_documents/jsdoc/index.html)

[Examples](http://tcorral.github.com/Interface.js/examples_and_documents/index.html) to see for yourself!

## Usage

### Before using it:
Insert in your code:

	<script type="text/javascript" src="/path/to/your/js/libs/Interface.js"></script>

### Create a new interface:

Creating a new interface with only one method:

	var Flyable = new Interface('test');

Creating a new interface with more than one method:

	var Editable = new Interface(['edit', 'save', 'undo']);

### Implement one interface:

The implementation of one interface must be done after the constructor (if is a base class) or after the inheritance
of prototype if is an extended class.

Base class implementing an interface:

	var Duck = function(){};
	Duck = Interface.implement(Displayable, Duck);

*Tip:* If we implement one interface in one class that will be extended you can create an abstract class using a
third parameter.

Allowing instanciate class as an Abstract class

	var Duck = function(){};
	Duck = Interface.implement(Displayable, Duck, true);

Extended class implementing an interface:

	var MallardDuck = function()
	{
		Duck.apply(this, arguments);
	};
	MallardDuck.prototype = new Duck();
	MallardDuck = Interface.implement(Flyable, Duck);

### Implement more than one interface:

Is possible to implement as interface as you want, and you can implement an interface that will be used as an
Abstract class and other can implement mandatory interface methods.

Basic usage:

	var MallardDuck = function()
	{
		Duck.apply(this, arguments);
	};
	MallardDuck.prototype = new Duck();
	MallardDuck = Interface.implement(Flyable, Duck);
	MallardDuck = Interface.implement(Quackable, Duck);

Allowing Abstrac class:

	var MallardDuck = function()
	{
		Duck.apply(this, arguments);
	};
	MallardDuck.prototype = new Duck();
	MallardDuck = Interface.implement(Flyable, Duck, true);
	MallardDuck = Interface.implement(Quackable, Duck);

## Documentation

[API documentation](http://tcorral.github.com/Interface.js/examples_and_documents/jsdoc/index.html)

[Examples](http://tcorral.github.com/Interface.js/examples_and_documents/index.html) to see for yourself!


## License

Interface.js is licensed under the MIT license.
