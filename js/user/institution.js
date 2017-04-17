//机构详情页
var institution = angular.module('institution',[]);

institution.controller('institutionList',function($scope,$http){
	//根据cookie请求到用户的机构详情
	var url = 'http://localhost:8888/searchInstitution?callback=JSON_CALLBACK';
	$http.jsonp(url).success(function(res){
		console.log(res);
		$scope.institutionList=res;
		for(var i=0;i<$scope.institutionList.length;i++){
			if($scope.institutionList[i].department4!='undefined'){
				$scope.institutionList[i].department3=$scope.institutionList[i].department3+'-'+$scope.institutionList[i].department4;
				if($scope.institutionList[i].department5!='undefined'){
					$scope.institutionList[i].department3=$scope.institutionList[i].department3+'-'+$scope.institutionList[i].department5;
					if($scope.institutionList[i].department6!='undefined'){
						$scope.institutionList[i].department3=$scope.institutionList[i].department3+'-'+$scope.institutionList[i].department6;
					}
				}
			}
		}
	})
	
	//添加机构按钮
	$scope.addInstitution = function(){
		var url = 'http://localhost:8888/changeInstitution?callback=JSON_CALLBACK'
		$http.jsonp(url).success(function(res){
			window.location.href='addInstitution.html';
		})
	}
	
	//修改按钮
	$scope.changeInstitution = function(id){
		var url = 'http://localhost:8888/changeInstitution?_id='+id+'&callback=JSON_CALLBACK'
		$http.jsonp(url).success(function(res){
			window.location.href='addInstitution.html';
		})
	}
	
	//删除按钮
	$scope.deleteInstitution = function(id){
		if(confirm('确定要删除么')){
			var url = 'http://localhost:8888/deleteInstitution?_id='+id+'&callback=JSON_CALLBACK'
			$http.jsonp(url).success(function(res){
				alert('删除成功');
				window.location.href='institution.html';
			})
		}
	}
	
	//设为默认
	$scope.setDefault = function(id,Account){
		var url = 'http://localhost:8888/setDefault?_id='+id+'&Account='+Account+'&callback=JSON_CALLBACK'
		$http.jsonp(url).success(function(res){
				console.log('设置成功');
				window.location.href='institution.html';
			})
	}
})

//添加机构页
var addInstitution = angular.module('addInstitution',[]);

addInstitution.controller('add',function($scope,$http){
	
	$scope.activities=[
		'中国',
		'韩国',
		'日本',
		'加拿大'
	]
	
	//根据cookie请求到机构的详细内容
	var url = 'http://localhost:8888/checkInstitution?callback=JSON_CALLBACK';
	$http.jsonp(url).success(function(res){
		$scope.institution = res[0];
	})
	
	$scope.Add = function(){
		var url = 'http://localhost:8888/addInstitution?_id'+$scope.institution._id+'&department1='+$scope.institution.department1+'&department2='+$scope.institution.department2+'&department3='+$scope.institution.department3+'&department4='+$scope.institution.department4+'&department5='+$scope.institution.department5+'&department6='+$scope.institution.department6+'&default='+$('#default').is(':checked')+'&callback=JSON_CALLBACK';
		$http.jsonp(url).success(function(res){
			alert('添加成功');
			window.location.href = './institution.html';
	})
	}
})
	
