function Model(data) {
 var self=this;
 self.indexOfActive=-1;
 self.data=['test1','test2','test3'];
 self.addItem=function(item) {
 	if(item.length===0) {
 		return;
 	}
 	self.data.push(item);
 	return self.data;
 };
 self.removeItem=function(index) {
	  self.data.splice(index,1);
	  return self.data;
 };
 self.selectChangeItem=function(index) {
		console.log("M selectChangeItem");
		indexOfActive=index;
 };
 self.changeItem=function(newItemValue) {
 console.log("M changeItem");
 if(self.indexOfActive===-1||newItemValue==='') return;
 self.data[self.indexOfActive]=newItemValue;
 };
}
function View(model) {
 var self = this;
 function init() {
  var wrapper = $('#wrapper').html();
  wrapper = _.template(wrapper);
	wrapper = wrapper();
 	$('body').append(wrapper);
 	self.elements = {
 		input:$('.item-value'),
 		addBtn:$('.item-add'),
 		changeBtn:$('.item-change'),
 		listContainer:$('.list'),
 		list:$('.list li')
 	};
 	self.renderList(model.data);
 }
 self.renderList = function(data) {
 	var list = $('#list-template').html();
 	list = _.template(list);
 	list = list({data:data});
 	self.elements.listContainer.html(list);
 };
 self.renderSelectedItem=function(indexOfActive){
   $('.list li').css({"background-color": "#14B347"});
 	 $('.list li:nth-of-type('+(+indexOfActive+1)+')').css({"background-color": "red"});
 };
 self.renderInputField=function(data,index){
 	if(data[index]+""=='undefined')return;
 	self.elements.input.val(data[index]+"");
 };
 init();
}
function Controller(model,view)
{
	var self=this;
	view.elements.addBtn.on('click',addItem);
	view.elements.listContainer.on('click','.item-delete',removeItem);
	view.elements.listContainer.on('click','.list-item',selectChangeItem);
	view.elements.changeBtn.on('click',changeItem);
	function addItem()
	{
		var newItem=view.elements.input.val();
		model.addItem(newItem);
		view.renderList(model.data);
		view.elements.input.val('');
	}
	function removeItem()
	{
		var item=$(this).attr('data-index');

		model.removeItem(item);
		view.renderList(model.data);
		model.indexOfActive=-1;
		view.elements.input.val(''); 

	}
	function selectChangeItem(){
      console.log("ch");
      var index=$(this).attr('data-index');
      model.indexOfActive=index;
      view.renderSelectedItem(model.indexOfActive);
      view.renderInputField(model.data,model.indexOfActive);

	}
	 function changeItem(index){
      console.log("C changeItem");

      var newItemValue=view.elements.input.val();
      model.changeItem(newItemValue);
      view.renderList(model.data);
	  view.elements.input.val('');
    }
}

$(
	function()
	{
		var firstToDolist=['learn javascript','learn html','make coffe'];
		var model=new Model(firstToDolist);
		var view=new View(model);
		var controller=new Controller(model, view);
	}
);
