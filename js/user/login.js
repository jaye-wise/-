var code;
//angular
var index = angular.module('index',[]);
//登录框控制器
index.controller('login',function($scope,$http){
	$scope.code=true;
	$scope.name='';
	$scope.password='';
	$scope.verifyCode='';
	
	//验证验证码是否正确
	$scope.checkCode = function(){
		if($scope.verifyCode.toUpperCase()!=code.toUpperCase()){
			$scope.code=false;
		}else{
			$scope.code=true;
		}
	}
	
	//登录按钮
	$scope.login = function(){		
		//验证账号密码是否正确
		var url = 'http://localhost:8888/login?name='+$scope.name+'&password='+$scope.password+'&callback=JSON_CALLBACK';
		$http.jsonp(url).success(function(res){
			if(res.length==1){
				window.location.href='./html/userInfo.html';
			}else{
				alert('用户名或密码错误,请重新输入');
				createCode();
				$scope.verifyCode='';
				$scope.password='';
			}
		})
	}
})
//注册框控制器
index.controller('register',function($scope,$http){
	$scope.userName='';
	$scope.name='';
	$scope.password='';
	$scope.mailAddress='';
	$scope.doublePassword='';
	$scope.userNameHave=false;
	$scope.mailAddressHave=false;
	$scope.passwordSame=true;
	
	//检查用户名是否重复
	$scope.checkUserName = function(){
		if($scope.userName!=''){
			var url = 'http://localhost:8888/checkUserName?userName='+$scope.userName+'&callback=JSON_CALLBACK';
			$http.jsonp(url).success(function(res){
				if(res.length>0){
					$scope.userNameHave=true;
				}else{
					$scope.userNameHave=false;
				}
			})
		}
	}
	
	//检查邮箱是否重复
	$scope.checkMailAddress = function(){
		if($scope.mailAddress!=''){
			var url = 'http://localhost:8888/checkMailAddress?mailAddress='+$scope.mailAddress+'&callback=JSON_CALLBACK';
			$http.jsonp(url).success(function(res){
				if(res.length>0){
					$scope.mailAddressHave=true;
				}else{
					$scope.mailAddressHave=false;
				}
			})
		}
	}
	
	//注册按钮
	$scope.register = function(){
		if($scope.userName&&$scope.name&&$scope.mailAddress&&$scope.password){
			var url = 'http://localhost:8888/register?name='+$scope.name+'&userName='+$scope.userName+'&mailAddress='+$scope.mailAddress+'&password='+$scope.password+'&callback=JSON_CALLBACK';
			$http.jsonp(url).success(function(res){
				alert('注册成功');
				window.location.href='./index.html';
			})
		}else{
			alert('请补全信息');
			$scope.password='';
			$scope.doublePassword='';
		}
	}
})

//原生部分
function createCode() {
	code = "";
	var codeLength = 6; //验证码的长度
	var checkCode = document.getElementById("checkCode");
	var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 
	'a','b','c','d','e','f','g','h','i','j','k','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //所有候选组成验证码的字符，当然也可以用中文的
	for (var i = 0; i < codeLength; i++)
	{
	    var charNum = Math.floor(Math.random() * 52);
	    code += codeChars[charNum];
	}
	if (checkCode) 
	{
	    checkCode.className = "code";
	    checkCode.innerHTML = code;
	}
}

$(createCode());
