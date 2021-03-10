import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories:Category[];
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';

  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.amount
    };
  }

  pageChanged(event){
    this.config.currentPage = event;
  }

  getAllCategory(){
    this.categoryService.show();
    this.categoryService.allCategory.subscribe(
      res=>{
        this.categories = res;
      },
      error=>{
        alert('Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

}
