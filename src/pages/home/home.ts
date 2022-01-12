import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../../pages/settings/settings';
import { NewsPage } from '../../pages/news/news';
import { Storage } from '@ionic/storage';
import { RetrieveDataProvider } from '../../providers/retrieve-data/retrieve-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // booleans linked to elements in home.html to have them hidden or not
  cityNotSetHidden: boolean = true;
  cityNotFoundHidden: boolean = true;
  newsButtonHidden: boolean = true;

  city: string; // To store the city set by user on Settings page
  cityData: any[]; // To store city data retrieved from restcountries.com
  weatherData: any[]; // To store weather data retrieved from weatherbit.io
  latLng: string; // To store latitude/longitude string retrieved from weatherbit.io
  latLngArray: string[]; // To store latitude and longitude strings when latLng string is split
  lat: string; // To store single latitude string
  lng: string; // To store single longitude string
  unit: string; // To store the measurement unit set by user on Settings page
  cca2: string; // To store cca2 required to retrieve news data from newsapi.org

  constructor(public navCtrl: NavController, private storage: Storage, private rdp: RetrieveDataProvider) {
  }

  async ionViewWillEnter() {

    try {
      this.city = await this.storage.get("city"); // Retrieve city set on Settings page from storage
      // Waits for completion before moving on
      this.cityNotSetHidden = this.city != null; // If city is not null, keep hidden boolean true
      this.unit = await this.storage.get("unit"); // Retrieve unit set on Settings page from storage
    }
    catch (error) {
      alert("Error accessing storage.") // Alert pops up if there is an error accessing storage
    }

    try {
      if (this.city != null) { // If city is not null, retrieve city data from restcountires.com
        this.rdp.retrieveCityData(this.city).subscribe(data => { // Use this.city as parameter for retrieveCityData function
          this.cityData = data; // Store data in cityData
          this.latLng = data[0].latlng; // Store latitude/lonitude from data
          this.cca2 = data[0].cca2; // Store cca2 from data
          this.latLngArray = this.latLng.toString().split(","); // Split latitude/lonitude into string array by comma seperator
          this.lat = this.latLngArray[0]; // Store latitude from index 0 of array in lat
          this.lng = this.latLngArray[1]; // Store longitude from index 1 of array in lng
        },
          (error) => {
            this.cityNotFoundHidden = false; // If city not found on restcountries.com, boolean is false and element displays on home.html
          },
          () => { // When city data retrieval is complete begin weather data retrieval
            this.rdp.retrieveWeatherData(this.lat, this.lng, this.unit).subscribe(data => { // Use lat, lng and unit as parameters for retrieveWeatherData function
              this.weatherData = data.data; // Store data in weatherData
              this.newsButtonHidden = false; // Displays news button when weather data is retrieved
              this.storage.set("cca2", this.cca2); // Save cca2 in storage
            });
          }
        );
      }
    } catch (error) {
      alert("Error retrieving data.") // Alert pops up if there is an error retrieving data
    }
  }

  openSettingsPage() { // When function is called Settings page will open
    this.navCtrl.push(SettingsPage);
  };

  openNewsPage() { // When function is called News page will open
    this.navCtrl.push(NewsPage);
  };

}