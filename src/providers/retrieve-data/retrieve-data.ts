import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class RetrieveDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RetrieveDataProvider Provider');
  }

  // Function retrieves data from restccounties.com using city parameter
  retrieveCityData(city: string): Observable<any> {
    return this.http.get("https://restcountries.com/v3.1/capital/" + city);
  }

  // Function retrieves data from weatherbit.org using latitude, lonitude and temperature unit. API key hardcoded
  retrieveWeatherData(lat: string, lng: string, unit: string): Observable<any> {
    return this.http.get("https://api.weatherbit.io/v2.0/current?lat=" + lat + "&lon=" + lng + "&units=" + unit + "&key=c389efde7e73419da7110e2a02916938&lang=eng3");
  }

  // Function retrieves data from  newsapi.org using cca2. API key and page size hardcoded
  retrieveNewsData(cca2: string): Observable<any> {
    return this.http.get("https://newsapi.org/v2/top-headlines?country=" + cca2 + "&pageSize=5&apiKey=8977fb32f05f4a5994b8ff04298dbce5");
  }

}