import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
declare function showSwal(type,message):any;
@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {

  constructor(private categoryService:CategoryService) { }
  public category_name ="";
  public resultadd = "";
  public resultcheckname="";
  public ch = true;
  public allCategory:Category[];
  @ViewChild('category_namecheck') category_namecheck: ElementRef;
  ngOnInit(): void {
    this.show();
  }

  add(){
    const fd = new FormData();
    fd.append('category_name',this.category_name);
    this.categoryService.add(fd).subscribe(
      res=>{
        // this.resultadd='success';
        this.ch = true;
        this.category_name='';
        this.show();
        // this.category_namecheck.nativeElement.blur();
        showSwal('auto-close','Thêm thành công!');
      },
      error=>{
        this.resultadd='error';
      }
    );
  }

  show(){
    this.categoryService.show();
    this.categoryService.allCategory.subscribe(
      res=>{
        this.allCategory = res;
      },
      error=>{
        alert('Lỗi');
      }
    );
  }

  checkname(categoryname){
    this.ch = false;
    this.categoryService.checkname(categoryname).subscribe(
      res=>{
        this.resultcheckname = res['success'];
      },
      error=>{
        this.resultcheckname = 'error';
      }
    );
  }

  removeCategory(c:Category){
    if(confirm('Bạn có chắc chắn muốn xóa?')){
      this.categoryService.removeCategory(c.category_id).subscribe(
        res=>{
          this.show();
          showSwal('auto-close','Xóa thành công!');
        },error=>{
          showSwal('auto-close','Có lỗi trong quá trình truy xuất dữ liêu!');
        }
      );
    }
  }

}
