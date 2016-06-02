requirejs.config({
paths: {
	'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery',
},
shim:{
	'jquery':{
		exports: 'jquery'
	}
}
});
require(
	[
		'jquery',
		'lodash',
		'Model',
		'View',
		'Controller'
	],
	function($,lodash,Model,View,Controller) {
    var firstToDolist=['learn javascript','learn html','make coffe'];
		var model=new Model.Model(firstToDolist);
		var view=new View.View(model);
		var controller=new Controller.Controller(model, view);
	});
