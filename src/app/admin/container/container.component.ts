import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  
  public countcate = '';
  public countuser = '';
  public countsuperadmin = '';
  public countadmin = '';
  public countmember = '';
  public countproduct = '';
  public countfeaturedproduct = '';
  public countorder = '';
  public countstatustorder1 = '';
  public countstatustorder0 = '';
  public countcomment = '';
  public countrating = '';

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.gethome().subscribe(
      res=>{
        this.countcate = res['countcate'];
        this.countuser = res['countuser'];
        this.countsuperadmin = res['countsuperadmin'];
        this.countadmin = res['countadmin'];
        this.countmember = res['countmember'];
        this.countproduct = res['countproduct'];
        this.countfeaturedproduct = res['countfeaturedproduct'];
        this.countorder = res['countorder'];
        this.countstatustorder1 = res['countstatustorder1'];
        this.countstatustorder0 = res['countstatustorder0'];
        this.countcomment = res['countcomment'];
        this.countrating = res['countrating'];
      },error=>{
        alert('Có lỗi truy xuất dữ liệu!');
      }
    );
  }

}
