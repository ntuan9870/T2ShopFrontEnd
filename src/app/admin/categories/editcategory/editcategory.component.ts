import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import {Location} from '@angular/common';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  public category:Category;
  public category_name ="";
  public resultcheckname = "";
  public oldname = "";
  public id = "";
  public resultupdate = "";
  constructor(
    private categoryService:CategoryService,
    public activatedRoute : ActivatedRoute,
    private router:Router,
    private _location:Location
    ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.ganDuLieu(this.id);
  }

  ganDuLieu(id){
    this.categoryService.getEdit(id).subscribe(res=>{
      var r:any = res;
      this.category = r;
      this.oldname = this.category.category_name;
      this.category_name = this.oldname;
    });;
  }
  update(){
    const fd = new FormData();
    fd.append('category_id',this.id);
    fd.append('category_name',this.category_name);
    this.categoryService.update(fd).subscribe(
      res=>{
        this.resultupdate=res['success'];
        if(this.resultupdate=='success'){
          this._location.back();
          showSwal('auto-close','Cập nhật danh mục thành công!');
        }else{
          this._location.back();
          showSwal('auto-close','Danh mục được giữ nguyên!');
        }
      },
      error=>{
        this.resultupdate='error';
      }
    );
  }
  checkname(keyword){
    this.categoryService.checkname(keyword).subscribe(
      res=>{
        this.resultcheckname = 'success';
      },
      error=>{
        if(keyword!=this.oldname){
          this.resultcheckname = 'error';
        }else{
          this.resultcheckname = 'same';
        }
      }
    );
  }


}
