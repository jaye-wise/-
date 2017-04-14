var http = require('http');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

//数据库连接及骨架构建
var db = mongoose.connect('mongodb://127.0.0.1:27017/order_system');
db.connection.on('error',function (error) {
    console.log('数据库连接失败'+error);
});
db.connection.on('open',function(){
    console.log('数据库连接成功');
});
//用户骨架
var UserSchema = new mongoose.Schema({
    Account:{type:String},//用户名
    UserName:{type:String},//姓名
    Email:{type:String},//邮箱
    Phone:{type:Number},//电话
    Pwd:{type:String},//密码
    default_class:{type:String},//默认机构
    IsActive:{type:String,default:'未激活'},//账号状态
    Memo:{type:String},//备注
    CreateTime:{type:Date,default:new Date()},//账号创建时间
    CreateID:{type:Number},//创建者用户名
    EditUserID:{type:Number},//修改者ID
    EditTime:{type:Object},//最近修改时间
    Address:{type:String}//地址
},{
    collection:'user'
})
var User = db.model('user',UserSchema);

//用户部门骨架
var InstitutionSchema = new mongoose.Schema({
    Account:{type:String},//用户名
    department1:{type:String},//国家
    department2:{type:String},//公司/大学/医院
    department3:{type:String},//部门
    department4:{type:String},
    department5:{type:String},
    department6:{type:String},
    default:{type:Boolean,default:false}//是否为默认机构
},{
    collection:'institution'
})
var Institution = db.model('institution',InstitutionSchema);
var Institution = db.model('institution',InstitutionSchema);

//开启cookie
app.use(cookieParser());

//登录
app.get('/login',function(req,res){
    var cb=req.query.callback;
    User.find({$or:[{Account:req.query.name},{Email:req.query.name}],Pwd:req.query.password},{},function (err,doc) {
        if(err) {
            console.log(err);
        }
        if(doc){
            res.cookie('ShiHeOrderSystem', {Account:doc[0].Account});
            var json = JSON.stringify(doc);
            res.end(cb+"("+json+")");
        }
    });
});

//注册界面用户名失焦检测是否有重名用户
app.get('/checkUserName',function (req,res) {
    var cb=req.query.callback;
    User.find({Account:req.query.userName},{},function (err,doc) {
        if(err){
            console.log(err);
        }
        if(doc){
            var json=JSON.stringify(doc);
            res.end(cb+'('+json+')')
        }
    })
})

//注册界面邮箱失焦检测是否有重名邮箱
app.get('/checkMailAddress',function (req,res) {
    var cb=req.query.callback;
    User.find({Email:req.query.mailAddress},{},function (err,doc) {
        if(err){
            console.log(err);
        }
        if(doc){
            var json=JSON.stringify(doc);
            res.end(cb+'('+json+')')
        }
    })
})

//注册
app.get('/register',function (req,res) {
    var cb = req.query.callback;
    var docs = {
        Account:req.query.userName,
        UserName:req.query.name,
        Email:req.query.mailAddress,
        Pwd:req.query.password
    }
    User.create(docs,function (err,doc) {
        if(err){
            console.log(err);
        }
        else{
            var json=JSON.stringify(doc);
            res.end(cb+'('+json+')');
        }
    })
})

//检测当前登录的用户
app.get('/checkUser',function (req,res) {
    if(req.cookies.ShiHeOrderSystem){
        var cb = req.query.callback;
        User.find({Account:req.cookies.ShiHeOrderSystem.Account},{},function (err,doc) {
            if(err){
                console.log(err);
            }
            else{
                var json=JSON.stringify(doc);
                res.end(cb+'('+json+')');
            }
        })
    }
})

//更新用户信息
app.get('/updateUserInfo',function (req,res) {
    var cb = req.query.callback;
    var docs = {
        UserName:req.query.User,
        Phone:req.query.Phone,
        Email:req.query.Email,
        Pwd:req.query.Pwd
    }
    User.update({Account:req.query.Account},{$set:docs},function (err,doc) {
        if(err){
            console.log('err');
            console.log(err);
        }else{
            res.end(cb+'({"errcode":0,"msg":"更新成功"})');
        }
    })
})

//搜索出机构列表
app.get('/searchInstitution',function (req,res) {
    if(req.cookies.ShiHeOrderSystem){
        var cb = req.query.callback;
        Institution.find({Account:req.cookies.ShiHeOrderSystem.Account},{},function (err,doc) {
            if(err){
                console.log(err);
            }
            else{
                console.log(doc);
                var json=JSON.stringify(doc);
                res.end(cb+'('+json+')');
            }
        })
    }
})

//修改机构的机构信息提取
app.get('/checkInstitution',function (req,res) {
    if(req.cookies.ShiHeOrderSystem.InstitutionId!=''){
        var cb = req.query.callback;
        Institution.find({_id:req.cookies.ShiHeOrderSystem.InstitutionId},{},function (err,doc) {
            if(err){
                console.log(err);
            }
            else{
                var json=JSON.stringify(doc);
                res.end(cb+'('+json+')');
            }
        })
    }else{
        res.end(cb+'({})');
    }
})

//添加机构
app.get('/addInstitution',function (req,res) {
    var cb = req.query.callback;
    var docs = {
        Account:req.cookies.ShiHeOrderSystem.Account,
        department1:req.query.department1,
        department2:req.query.department2,
        department3:req.query.department3,
        department4:req.query.department4,
        department5:req.query.department5,
        department6:req.query.department6
    }
    if(req.cookies.ShiHeOrderSystem.InstitutionId!=undefined){
        Institution.update({_id:req.query._id},{$set:docs},function (err,doc) {
            if(err){
                console.log('err');
                console.log(err);
            }else{
                res.end(cb+'({"errcode":0,"msg":"更新成功"})');
            }
        })
    }else{
        Institution.create(docs,function (err,doc) {
            if(err){
                console.log(err);
            }
            else{
                var json=JSON.stringify(doc);
                res.end(cb+'('+json+')');
            }
        })
    }
})

app.get('/',function (req,res) {
    console.log(req.cookies);
    if(req.cookies.isVisit){
        console.log(1);
    }
    if(req.cookies.ShiHeOrderSystem){
        console.log(2);
    }
    res.send("欢迎第一次访问");
});

app.get('*',function (req,res) {
    res.sendFile(__dirname+req.path);
})

app.listen(8888);
