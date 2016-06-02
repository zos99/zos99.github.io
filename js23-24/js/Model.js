define(
	'Model',
	['jquery','lodash'],
	function() {
		return {
			  Model: function (data) {
			  var self = this;
			  self.indexOfActive=-1;
			  self.data = ['learn javascript','learn html','make coffe'];
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
					indexOfActive=index;
			 };
			 self.changeItem=function(newItemValue) {
			  if(self.indexOfActive===-1||newItemValue==='')return;
			  self.data[self.indexOfActive]=newItemValue;
			 };
			}
		};
	});
