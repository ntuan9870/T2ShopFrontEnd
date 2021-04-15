import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-fovoriteproduct',
  templateUrl: './fovoriteproduct.component.html',
  styleUrls: ['./fovoriteproduct.component.css']
})
export class FovoriteproductComponent implements OnInit {
  config: any;
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public user_id = '';
  public user_name = '';
  public favoriteProduct:Product= new Product;
  constructor(private productservice:ProductService) { }

  ngOnInit(): void {
    this.user_id = '';
    if(localStorage.getItem('user_id')){
      this.user_id = localStorage.getItem('user_id');
      this.user_name = localStorage.getItem('user_name')
    }
    if(sessionStorage.getItem('user_id'))
    {
      this.user_id = sessionStorage.getItem('user_id');
      this.user_name = sessionStorage.getItem('user_name')
    }
    this.showFavoriteProduct();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount
    };
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  showFavoriteProduct(){
    this.productservice.showFavoriteProduct(this.user_id).subscribe(
      res=>{
        this.favoriteProduct=res['favoriteProduct'];
      }
    );
  }
  remove(FP_id){
    if(confirm("Bạn có muốn xóa sản phẩm ra khỏi danh sách sản phẩm yêu thích")){
      this.productservice.removeFavoriteProduct(FP_id).subscribe(
        res=>{
          console.log(res);
          this.showFavoriteProduct();
        }
      );
    }
  }
}
