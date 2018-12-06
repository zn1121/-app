import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ForgetPage } from '../forget/forget';
//import { Http } from "@angular/http";
import'rxjs/add/operator/map';
import { HttpParams } from '@angular/common/http';
import {HttpClient} from "@angular/common/http";
import { AlertController } from 'ionic-angular';
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

  constructor(public alertCtrl: AlertController,private http:HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
  }
  goforget(){
    this.navCtrl.push(ForgetPage);
  }
  doalert() {
      let alert = this.alertCtrl.create({
        title: '提示！',
        subTitle: '注册成功！',
        buttons: ['Ok'],
      });
      alert.present();
    }
  gobpage(){              //登录页面
    this.http.post('http://localhost:3000/customers',{
      "name":this.logintel,
      "password":this.loginpassword
    }).subscribe(res => {
      console.log(res);
      this.doalert();
      this.navCtrl.popToRoot();
    },error =>{
      console.log("Error",error)
    })
    const params = new HttpParams().set('_page', "2").set('_limit', "1");
    this.http.get("http://localhost:3000/customers",{params})
    .subscribe(res=>{
      console.log(res);
    },error =>{
      console.log("Error",error)
    });
    
  }
//--------包装成为json数据--------
  private encodeHttpParams(params: any): any {
    if (!params) return null;
    return new HttpParams({fromObject: params});
  }
//------------------

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
        this.navCtrl.push(LoginPage);
      },error =>{
        console.log("Error:",error)
      })
     }
     else{
       alert("请输入正确验证码");
    }
  } 
  yanzheng(){           //验证码
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
  
 
  ionViewDidLoad() {
    //console.log('ionViewDidLoad LoginPage');
  }

}
