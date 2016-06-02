define(
	'Controller',
	['jquery','lodash'],
	function() {
		return {
			Controller:function (model,view) {
				function addItem() {
					var newItem=view.elements.input.val();
					model.addItem(newItem);
					view.renderList(model.data);
					view.elements.input.val('');
				}
				function removeItem() {
					var item=$(this).attr('data-index');
					model.removeItem(item);
					view.renderList(model.data);
					model.indexOfActive=-1;
					view.elements.input.val('');
				}
				function selectChangeItem() {
			      var index=$(this).attr('data-index');
			      model.indexOfActive=index;
			      view.renderSelectedItem(model.indexOfActive);
			      view.renderInputField(model.data,model.indexOfActive);
				}
				 function changeItem(index) {
 		      	var newItemValue=view.elements.input.val();
			      model.changeItem(newItemValue);
			      view.renderList(model.data);
				    view.elements.input.val('');
					}
					var self=this;
          view.elements.addBtn.on('click',addItem);
				  view.elements.listContainer.on('click','.item-delete',removeItem);
				  view.elements.listContainer.on('click','.list-item',selectChangeItem);
				  view.elements.changeBtn.on('click',changeItem);
			}
		};
	}
 );
