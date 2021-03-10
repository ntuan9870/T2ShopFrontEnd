import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router:Router,private shareService:ShareService) {
    shareService.changeEmitted$.subscribe(
      text=>{
        console.log(text);
      }
    );
  }

  ngOnInit(): void {
    if(localStorage.getItem('user_level')=='2'||sessionStorage.getItem('user_level')=='2'||localStorage.getItem('user_level')=='1'||sessionStorage.getItem('user_level')=='1'){
      this.router.navigate(['/admin']);
    }
  }

}
