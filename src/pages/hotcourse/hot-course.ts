import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HotCoursePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hot-course',
  templateUrl: 'hot-course.html',
})
export class HotCoursePage {
  arr=['语文','数学','英语','物理','化学','生物','地理','历史','政治'];
  isActive=0;
  i: number;
  isClick(i){
    this.isActive=i;
  }
  arr0=['','','','','']; //以后要传数据
  arr1=['','','','','','','']; //以后要传数据
  arr2=['','','','','','']; //以后要传数据
  arr3=['','','']; //以后要传数据
  arr4=['','','','','']; //以后要传数据
  arr5=['','','','']; //以后要传数据
  arr6=['','','']; //以后要传数据
  arr7=['','','','','','','','','']; //以后要传数据
  arr8=['','','','','']; //以后要传数据
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.i = navParams.get('id');
  }
}
