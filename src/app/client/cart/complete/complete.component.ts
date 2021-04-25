import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.xoagiohang();
    localStorage.removeItem('store_id');
  }

}
