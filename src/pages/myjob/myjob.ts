import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { JobPage} from '../job/job';
import { JobsPage } from '../jobs/jobs';

/**
 * Generated class for the MyjobPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myjob',
  templateUrl: 'myjob.html',
})
export class MyjobPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  go1(){
    this.navCtrl.push(JobPage);
  }
  gofabu(){
    this.navCtrl.push(JobsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MyjobPage');
  }

}
