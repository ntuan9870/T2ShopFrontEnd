import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('shipper_phone')=='null'||sessionStorage.getItem('shipper_phone')=='null'){
      this.router.navigate(['/auth/loginshipper']);
    }
  }

}
