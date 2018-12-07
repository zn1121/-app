import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,App, ViewController } from 'ionic-angular';
import { ForgetPage } from '../forget/forget';
//import { Http } from "@angular/http";
import'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

//import { NgModel } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  items = [];
  view = ViewChild;
  isActive = true;
  logintel:Number;
  loginpassword: Number;
  zhucetel: Number;
  yanzhengma: Number;
  zhucepassword: Number;
  errorMessage: string;
  error:any;
  yzma:Number;
  isClick(i){
    this.isActive = i;
  }

  constructor(
    public alertCtrl: AlertController,
    private http:HttpClient, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public appCtrl: App,
    public viewCtrl: ViewController,
    public loadingCtrl: LoadingController) {

      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }
  }
  //--------------显示注册中-----------
  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
        content: '注 册 中 不 愿 意 等 就 退 出...'//数据加载中显示
    });

    loading.present();

    setTimeout(() => {
        loading.dismiss();//显示多久消失
    }, 5000);
  }
  //--------------显示注册中-----------

  //--------------显示登陆成功-----------
  loginalert() {
    let loading = this.loadingCtrl.create({
        content: '登 陆 成 功，欢 迎 上 车 ！'//数据加载中显示
    });

    loading.present();

    setTimeout(() => {
        loading.dismiss();//显示多久消失
    }, 5000);
  }
  //--------------显示登陆成功-----------



  //------------提示注册成功---------
  doalert() {
    let alert = this.alertCtrl.create({
      title: '提示！',
      subTitle: '注册成功！',
      buttons: ['Ok'],
    });
    alert.present();
  }
//------------提示注册成功---------

//------------提示登录成功---------
doalertlogin() {
  let alert = this.alertCtrl.create({
    title: '提示！',
    subTitle: '登录成功！',
    buttons: ['Ok'],
  });
  alert.present();
}
//------------提示登录成功---------


  
  goforget(){     //忘记密码页
    this.navCtrl.push(ForgetPage);
  }
  gobpage(){              //登录页面
    var params = {
      stu_phone:this.logintel,
      stu_password:this.loginpassword
    }
    this.http.post('http://localhost:3000/customers/login',this.encodeHttpParams(params)).subscribe(res => {
      console.log(res);
      this.loginalert();
      this.navCtrl.popToRoot();
    },error =>{
      console.log("Error",error)
    })    
  }
  //--------包装成为json数据--------
  private encodeHttpParams(params: any): any {
    if (!params) return null;
    return new HttpParams({fromObject: params});
  }
  //--------包装成为json数据--------

  gologin(){          //注册页面
    console.log("用户名："+this.zhucetel);
    console.log("验证码："+this.yanzhengma);
    console.log("密码："+this.zhucepassword);
    
    var params = {
      stu_phone:this.zhucetel,
      stu_password:this.zhucepassword
      }
     if(this.yzma == this.yanzhengma ){
      this.http.post('http://www.zhuoran.fun:3000/register_stu',this.encodeHttpParams(params)).subscribe(res => {
        console.log(res);
        this.presentLoadingDefault();
        this.navCtrl.push(LoginPage);
      },error =>{
        console.log("Error:",error)
      })
     }
     else{
       alert("请输入正确验证码");
    }
  } 


  yanzheng(){           //获取验证码
    if(this.zhucetel != null){
      this.http.get("http://www.zhuoran.fun:3000" + "/verify?stu_phone=" + this.zhucetel ).subscribe(
      data => {
        console.log(data);
        this.yzma = data.tpl_value;
        
      },error=>{
        console.log("ERROR:",error)
      })
    }else {
      alert("请输入手机号");
    }
  }

  codeParam = {
    fromflag: 2,
    usertel: ""
}
  verifyCode: any = {
    verifyCodeTips: "获取验证码",
    countdown: 60,
    disable: true
  }
  settime() {
    if (this.verifyCode.countdown == 1) {
    this.verifyCode.countdown = 60;
    this.verifyCode.verifyCodeTips = "获取验证码";
    this.verifyCode.disable = true;
    return;
    } else {
    this.verifyCode.countdown--;
    }

    this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
    setTimeout(() => {
    this.verifyCode.verifyCodeTips = "重新获取(" + this.verifyCode.countdown + ")";
    this.settime();
    }, 1000);
}
getCode() {
    //发送验证码成功后开始倒计时
    this.verifyCode.disable = false;
    this.settime();

}

  
 
  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

}
