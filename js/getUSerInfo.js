var thisUser={};
$(function(){
	$.ajax({
		type:'get',
		url:'http://localhost:8888/checkUser',
		async:false,
		dataType:'jsonp',
		jsonp:'cb',	
		success:function(data){
			thisUser=data[0];
			console.log(1);
		},
		error:function(err){
			console.log('err:');
			console.log(err);
		}
	})
})
function aaa(){
	$.ajax({
		type:'get',
		url:'http://localhost:8888/checkUser',
		async:false,
		dataType:'jsonp',
		jsonp:'cb',	
		success:function(data){
			thisUser=data[0];
			console.log(4);
		},
		error:function(err){
			console.log('err:');
			console.log(err);
		}
	})
	console.log(3);
};
aaa();
