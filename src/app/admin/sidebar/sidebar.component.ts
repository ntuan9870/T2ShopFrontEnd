import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public user_level = 0;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('user_id')){
      this.user_level = parseInt(localStorage.getItem('user_level'));
    }
    if(sessionStorage.getItem('user_id')){
      this.user_level = parseInt(sessionStorage.getItem('user_level'));
    }
  }

}
