import { Component, OnInit,ViewChild,ElementRef, NgZone } from '@angular/core';
import { catchError,map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { google } from '@google/maps';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';
import { MapsAPILoader } from '@agm/core';
import {} from "googlemaps"
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}
declare var google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  apiLoaded: Observable<boolean>;
  display ;

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  // zoom: number;
  address: string;
  public geoCoder;
  location: Location;
  center: google.maps.LatLngLiteral = {lat: 10.720547064978216, lng: 106.62556428135224};
  zoom = 15;
  markerOptions: google.maps.MarkerOptions = {draggable: true,zoomControl: true,scrollwheel: false,
  };
  // markerPositions: google.maps.LatLngLiteral = {lat: 10.720547064978216, lng: 106.62556428135224};
  markerPositions: google.maps.LatLngLiteral[] = [];

  origin: any;
  destination: any;
  distance: any;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(httpClient: HttpClient, private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) {
    
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAofrlMwlRyXzbZNtsBfdkRl0GXZRsHpnk', 'callback')
    .pipe(
      map(() => true),
      catchError(() => of(false)),
    );
   }

  ngOnInit(): void {
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
    var geocoder = new google.maps.Geocoder();
  
    (document.getElementById("submit") as HTMLButtonElement).addEventListener(
      "click",
      () => {
        this.geocodeAddress(geocoder);
      }
    );
  }
  private calculateDistance(point1, point2) {
    const p1 = new google.maps.LatLng(
    point1.lat,
    point1.lng
    );
    this.markerPositions.push(p1.toJSON());
    const p2 = new google.maps.LatLng(
    point2.lat,
    point2.lng
    );
    this.markerPositions.push(p2.toJSON());
    return (
    google.maps.geometry.spherical.computeDistanceBetween(p1, p2)/1000
    ).toFixed(2);
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.center={lat:this.latitude,lng:this.longitude};
        var latLng = new google.maps.LatLng(this.latitude, this.longitude);
        this.markerPositions.push(latLng.toJSON());
        this.getAddress(this.latitude, this.longitude);
        console.log(this.markerPositions);
      });
    }
  }
  // getAddress(latitude, longitude) {
  //   var geocoder = new google.maps.Geocoder();
  //   geocoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //         console.log(this.address);
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
    
  //   });
  // }
 
  getAddress(lat, lng) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    const request: google.maps.GeocoderRequest = {
      location: latlng
    };
    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
          console.log(this.address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }    
  geocodeAddress(
    geocoder: google.maps.Geocoder
  ) {
    const address = (document.getElementById("address") as HTMLInputElement)
      .value;
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        // resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          // map: resultsMap,
          position: results[0].geometry.location,
        });
        this.markerPositions.push(results[0].geometry.location.toJSON());
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
  // moveMap(event: google.maps.MapMouseEvent) {
  //   this.center = (event.latLng.toJSON());
  // }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng.toJSON();
  }
 

  addMarker(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
    this.distance=this.calculateDistance(this.markerPositions[0], this.markerPositions[1]);
  }
  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;
 
  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
    console.log(this.infoWindow);
  }
  vertices: google.maps.LatLngLiteral[] = [
    {lat: 13, lng: 13},
    {lat: -13, lng: 0},
    {lat: 13, lng: -13},
  ];

  bounds: google.maps.LatLngBoundsLiteral = {
    east: 10,
    north: 10,
    south: -10,
    west: -10,
  };

  circleCenter: google.maps.LatLngLiteral = {lat: 10, lng: 15};
  radius = 3;

  imageUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';
  imageBounds: google.maps.LatLngBoundsLiteral = {
    east: 10,
    north: 10,
    south: -10,
    west: -10,
  };

  kmlUrl = 'https://developers.google.com/maps/documentation/javascript/examples/kml/westcampus.kml';
  
  
  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

}







