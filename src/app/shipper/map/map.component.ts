import { Component, OnInit } from '@angular/core';
// import { } from '@types/googlemaps';
// import { AgmCoreModule } from '@agm/core';
// import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import {} from 'googlemaps';
import { google } from '@google/maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title = 'map';
  position ={
    lat:-34.681,
    lng:-58.371
  }
  label={
    color: 'blue',
    text: 'marcodor'
  }

  constructor() { }

  ngOnInit(): void {
   
    // this.location = {
    //   latitude: -28.68352,
    //   longitude: -147.20785
    // }
  }

}
interface Location {
  latitude: number;
  longitude: number
}
