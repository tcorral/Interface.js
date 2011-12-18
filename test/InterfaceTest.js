(function()
{
	function setUp(){}
	function tearDown(){}
	TestCase("InterfaceConstructorTest", sinon.testCase({
		setUp: function()
		{
			setUp.call(this);
		},
		"test should return an empty array if nothing is passed as argument to the constructor": function()
		{
			var oInterface = new Interface();

			assertArray(oInterface.aMethods);
			assertEquals(0, oInterface.aMethods.length);
		},
		"test should return an array with 'test' if we pass 'test' as string to the constructor": function()
		{
			var sTest = 'test';
			var oInterface = new Interface(sTest);

			assertArray(oInterface.aMethods);
			assertEquals(1, oInterface.aMethods.length);
			assertSame(sTest, oInterface.aMethods[0]);
		},
		"test should return the same array we pass as argument": function()
		{
			var sTest = 'test';
			var aTest = [sTest];
			var oInterface = new Interface(aTest);

			assertArray(oInterface.aMethods);
			assertSame(aTest, oInterface.aMethods);
			assertEquals(1, oInterface.aMethods.length);
			assertEquals(sTest, oInterface.aMethods[0]);
		},
		tearDown: function()
		{
			tearDown.call(this);
		}
	}));
	TestCase("InterfaceImplementTest", sinon.testCase({
		setUp: function()
		{
			setUp.call(this);
			this.oInterface = new Interface("test");
			sinon.stub(Interface.prototype, "implementIn");
		},
		"test should call Interface.prototype.implementIn one time": function()
		{
			Interface.implement(this.oInterface, this.oClass);

			assertEquals(1, Interface.prototype.implementIn.callCount);
		},
		tearDown: function()
		{
			Interface.prototype.implementIn.restore();
			this.oInterface = null;
			tearDown.call(this);
		}
	}));
	TestCase("InterfaceImplementInTest", sinon.testCase({
		setUp: function()
		{
			setUp.call(this);
			this.oClass = function(){};
			this.oInterface = new Interface("test");
		},
		"test should add 'test' callback": function()
		{
			var oClass = Interface.implement(this.oInterface, this.oClass);

			assertFunction(oClass.prototype.test);
		},
		"test should throw an exception if 'test' method is not overwritten and you create a new instance": function()
		{
			var Class = Interface.implement(this.oInterface, this.oClass);

			assertException(function()
			{
				new Class();
			});
		},
		"test should not throw an exception if 'test' method is overwritten and you create a new instance": function()
		{
			var Class = Interface.implement(this.oInterface, this.oClass);
			Class.prototype.test = function(){};

			assertNoException(function()
			{
				new Class();
			});
		},
		"test should not throw an exception if 'test' method is overwritten if you create a new instance and call test method": function()
		{
			var Class = Interface.implement(this.oInterface, this.oClass);
			Class.prototype.test = function(){};

			assertNoException(function()
			{
				var oClass = new Class();
				oClass.test();
			});
		},
		tearDown: function()
		{
			this.oInterface = null;
			tearDown.call(this);
		}
	}));
}());