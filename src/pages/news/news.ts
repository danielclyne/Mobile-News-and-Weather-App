import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RetrieveDataProvider } from '../../providers/retrieve-data/retrieve-data';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  newsData: any[]; // To store the data retrieved from newsapi.org
  cca2: string; // To store the cca2 used to get news from chosen country
  newsPageHeading: string; // To store the string that will be displayed as the news page heading

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private rdp: RetrieveDataProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  async ionViewWillEnter() {
    try {
      this.cca2 = await this.storage.get("cca2"); // Retrieve and wait for cca2 from storage
    }
    catch (error) {
      alert("Error accessing storage."); // Alert pop up on error
    }
    try {
      // Use cca2 to retrieve news data from newsapi.org
      this.rdp.retrieveNewsData(this.cca2).subscribe(data => {
        // Cast data retrieved as an object(newsResponse)
        this.newsData = data.articles;
      },
        (error) => {
          alert("Error retrieving data."); // Alert pop up on error
        },
        () => {
          // If there is data display first heading
          if (this.newsData.length > 0) {
            this.newsPageHeading = 'News from ' + this.cca2;
            // else display this heading
          } else {
            this.newsPageHeading = 'No news from ' + this.cca2;
          }
        }
      );
    } catch (error) {
      alert("Error retrieving data."); // Alert pop up on error
    }
  }
}