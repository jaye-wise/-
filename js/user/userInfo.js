var userInfo = angular.module('userInfo',[]);
var temp;

//用户信息控制器
userInfo.controller('userInfo_content',function($scope,$http){
	//请求cookie里的个人信息
	var url = 'http://localhost:8888/checkUser?callback=JSON_CALLBACK';
	$http.jsonp(url).success(function(res){
		console.log(res[0]);
		$scope.userInfo = res[0];
		temp = $scope.userInfo;
		console.log(temp);
		$scope.userInfo.newPwd='';
		if($scope.userInfo.Phone){
			$scope.updateInfo = false;
			$scope.isUpdate = false;
		}else{
			$scope.updateInfo = true;
			$scope.isUpdate = true;
		}
	});
	
	$scope.updatePwd = false;
	$scope.pwdSame=true;
	
	//更新用户个人数据;
	$scope.updateUserInfo = function(){
		if($scope.userInfo.UserName&&$scope.userInfo.Email&&$scope.userInfo.Phone&&$scope.userInfo.defaultInstitution){
			var url = 'http://localhost:8888/updateUserInfo?Account='+$scope.userInfo.Account+'&User='+$scope.userInfo.UserName+'&Phone='+$scope.userInfo.Phone+'&Email='+$scope.userInfo.Email+'&Pwd='+$scope.userInfo.Pwd+'&callback=JSON_CALLBACK';
			$http.jsonp(url).success(function(res){
				alert('修改成功');
				window.location.reload();
			})
		}else{
			alert('请将个人信息填写完整');
		}
	}
	
	//更新用户密码
	$scope.updateUserPwd = function(){
		if($scope.userInfo.Pwd==$scope.userInfo.lastPwd){
			$scope.userInfo.Pwd=$scope.userInfo.newPwd;
			var url = 'http://localhost:8888/updateUserInfo?Account='+$scope.userInfo.Account+'&User='+$scope.userInfo.UserName+'&Phone='+$scope.userInfo.Phone+'&Email='+$scope.userInfo.Email+'&Pwd='+$scope.userInfo.Pwd+'&callback=JSON_CALLBACK';
			$http.jsonp(url).success(function(res){
				alert('修改成功');
				window.location.reload();
			})
		}else{
			alert('原密码输入错误，请重新输入');
			$scope.userInfo.lastPwd = '';
			$scope.userInfo.newPwd = '';
			$scope.userInfo.confirmPwd = '';
		}
	}
	
	//取消修改
	$scope.cancleUpdate = function(){
		console.log(temp);
		$scope.isUpdate=false;
		$scope.updateInfo=false;
		$scope.updatePwd=false;
		$scope.userInfo=temp;
//		console.log($scope.userInfo);
	}
})