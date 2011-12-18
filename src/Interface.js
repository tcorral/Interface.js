(function(win, doc, global)
{
	'use strict';
	/*
	 * If nothing is passed as global parameter global is set to window.
	 */
	if(!global)
	{
		global = window;
	}
	/**
	 * Helper function to traverse an array using for loop
	 * @param aArray
	 * @param fpProcess
	 */
	function loop(aArray, fpProcess)
	{
		var nItem = 0;
		var nLenItem = aArray.length;
		var oItem = null;
		for(nItem = 0; nItem < nLenItem; nItem = nItem + 1)
		{
			oItem = aArray[nItem];
			fpProcess(oItem);
		}
	}

	/**
	 * Class to create interfaces to be implemented in other classes
	 * @class Represents an Interface
	 * @constructor
	 * @name Interface
	 * @author Tomas Corral Casas
	 * @version 1.0
	 * @param aMethods
	 */
	var Interface = function (aMethods)
	{
		if(typeof aMethods === 'string')
		{
			aMethods = [aMethods];
		}
		this.aMethods = aMethods || [];
	};
	/**
	 * Implement is a static method to implement the oInterface methods in oTarget
	 * Default behaviour when implement an interface is to throw an error if the class
	 * doesn't implement all the methods to be implemented
	 * If bAllowAbstract is set this implementation doesn't throw an error when one or
	 * some methods are not implemented, but it will return an abstract class.
	 * @static
	 * @member Interface
	 * @param oInterface
	 * @param oTarget
	 * @param bAllowAbstract
	 * @return {Function} Wrapped oTarget with the interface implemented
	 */
	Interface.implement = function(oInterface, oTarget, bAllowAbstract)
	{
		return oInterface.implementIn(oTarget, bAllowAbstract);
	};
	/**
	 * implementIn is the method to be used when implementing an interface in one class (oTarget)
	 * When the interface is implemented the method creates a callback that will throw an error if the method is not overwritten.
	 * Also adds a check to the constructor of the oTarget to know if all the methods are implemented.
	 * This check by default throws an error if one of the interface methods is not implemented on the class which implements the interface.
	 * If you want to implement an interface but you want to return an abstract class you will need to pass a boolean (true).
	 * @member Interface.prototype
	 * @param oTarget
	 * @param bAllowAbstract
	 * @return {Function} Wrapped oTarget with the interface implemented
	 */
	Interface.prototype.implementIn = function(oTarget, bAllowAbstract)
	{
		var aMethods = this.aMethods;
		var fpInterfaceMethod = function()
		{
			throw new Error("This method must be overwritten !");
		};
		var fpMethod = null;
		loop(aMethods, function(sMethod)
		{
			fpMethod = oTarget.prototype[sMethod];
			if(!fpMethod)
			{
				oTarget.prototype[sMethod] = fpInterfaceMethod;
			}
		});
		if(!oTarget.__aImplementedMethods__)
		{
			oTarget.__aImplementedMethods__ = [];
		}
		[].push.apply(oTarget.__aImplementedMethods__, aMethods);
		var oInterface = function()
		{
			loop(oTarget.__aImplementedMethods__, function(sMethod)
			{
				fpMethod = oInterface.prototype[sMethod];
				if(fpMethod === fpInterfaceMethod && !bAllowAbstract)
				{
					throw new Error("This class implemented some interface but doesn't implemented at least one of them. Method not implemented: " + sMethod);
				}
			});
			oTarget.apply(this, arguments);
		};
		oInterface.prototype = oTarget.prototype;
		oInterface.constructor = oTarget;
		return oInterface;
	};
	/*
	 * Expose Interface Class to global
	 */
	global.Interface = Interface;
}(window, document));