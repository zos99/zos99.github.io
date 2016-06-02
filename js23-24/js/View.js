define(
	'View',
	['jquery','lodash'],
	function()
	{
		return {
		View:function (model)
		{


			 var self=this;
			 function init()
			 {

			 	var wrapper=$('#wrapper').html();
			    wrapper=_.template(wrapper);

				wrapper=wrapper();

			 	$('body').append(wrapper);
			 	self.elements={
			 		input:$('.item-value'),
			 		addBtn:$('.item-add'),
			 		changeBtn:$('.item-change'),
			 		listContainer:$('.list'),
			 		list:$('.list li')

			 	};
			 	self.renderList(model.data);

			 }
			 self.renderList=function(data){
			 	var list=$('#list-template').html();
			 	list=_.template(list);
			 	list=list({data:data});

			 	self.elements.listContainer.html(list);
			 };
			 self.renderSelectedItem=function(indexOfActive){

			 	//self.elements.selectedElement
			   // self.elements.list
			   $('.list li').css({"background-color": "#afb4b2"});
			   // debugger
			 	$('.list li:nth-of-type('+(+indexOfActive+1)+')').css({"background-color": "#1a17a6"});

			 };
			 self.renderInputField=function(data,index){
			 	if(data[index]+""=='undefined')return;
			 	self.elements.input.val(data[index]+"");
			 };
			 init();
		}
		};
	}
 );
