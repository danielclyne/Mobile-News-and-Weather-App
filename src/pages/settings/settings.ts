import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string; // To store the city set by user or retrieved from storage
  inputCity: string; // To store the city input by user
  inputUnit: string; // To store the city input by user or retrieved from storage

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillEnter() {
    this.storage.get("city") // Retrieve city input by user from storage
      .then((value) => { // Wait for retrieval
        this.city = value; // Set this.city as storage value
        if (value == null) {
          // If storage value is null change innerHTML of element with id of setCity
          document.getElementById("setCity").innerHTML = "City has not been set";
        }
      })
      .catch((error) => {
        alert("Error accessing storage.") // Alert pops up if there is an error accessing storage
      })

    this.storage.get("unit") // Retrieve unit from storage
      .then((value) => { // Wait for retrieval
        if (value == null) { // if storage value is null set this.inputUnit(radio button) to "m"(metric)
          this.inputUnit = "m";
        } else { this.inputUnit = value; } // Set this.inputUnit as storage value
      })
      .catch((error) => {
        alert("Error accessing storage.") // Alert pops up if there is an error accessing storage
      })
  }

  // Function to save settings input on Settings page
  saveSettings() {
    // If input is null or equals 0 alert pops up
    if (this.inputCity == null || this.inputCity.length == 0) {
      alert("Please enter a city name, or press back to exit")
    } else {
      // Else set input to this.city
      this.city = this.inputCity;
      // Clear input
      this.inputCity = "";
      // Save inputs in storage
      this.storage.set("city", this.city);
      this.storage.set("unit", this.inputUnit);
      // Close page when settings are done
      this.navCtrl.push(HomePage);
    }
  }

}