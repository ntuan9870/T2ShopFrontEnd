import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { BehaviorSubject } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { Product } from 'src/app/models/product.model';
import { Promotion } from 'src/app/models/promotion.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { RecommenedService } from 'src/app/services/recommened.service';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  public id = '';
  public loading = false;
  public comment_content = '';
  public user_id = '';
  public user_name = '';
  public rating:number = 0;
  public product:Product = new Product;
  public allComment = new BehaviorSubject<Comment[]>(null);
  public comments:Comment[] = new Array();
  public ratingproduct:number = 0;
  public arrcount:number[]=new Array;
  public promotion:Promotion = new Promotion;
  public favoriteProduct;

  constructor(private recommendservice:RecommenedService,private productService:ProductService,private activatedRoute:ActivatedRoute, private cartService:CartService) { }
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
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getProductById();
    this.getratingelement();
    this.getComment();
    this.getratingproduct();
    this.getratingall();
    this.getfavorite();
  }

  getProductById(){
    this.productService.getEditProduct(this.id).subscribe(
      res=>{
        // var r:any;
        // r = res['product'];
        
        this.product = res['product'];
        this.promotion = res['promotion'];
        $("#avatar").fadeIn("fast").attr('src',this.product.product_img);
        setTimeout(()=>{
          if(this.user_id!=''){
            this.add();
          }                           
        }, 10000);
      },
      error=>{
        alert('Có lỗi trong quá trình xử lý dữ liệu!');
      }
    );
  }
  favorite(){
    const fd = new FormData();
    fd.append('product_id',this.id);
    fd.append('user_id',this.user_id);
    this.productService.pushFavoriteProduct(fd).subscribe(
      res=>{
       console.log(res);
       this.getfavorite();
      },
      error=>{
        alert('Có lỗi trong quá trình xử lý dữ liệu!');
      }
    );
  }
  getfavorite(){
    const fd = new FormData();
    fd.append('product_id',this.id);
    fd.append('user_id',this.user_id);
    this.productService.getFavorite(fd).subscribe(
      res=>{
      this.favoriteProduct=res['favoriteProduct'];
      },
      error=>{
        alert('Có lỗi trong quá trình xử lý dữ liệu!');
      }
    );
  }
  add(){
    if(this.user_id != ''){
        const fd = new FormData();
      fd.append('product_id',this.product.category_name);
      fd.append('user_id',this.user_id);
      this.recommendservice.add(fd).subscribe(
        res=>{
         console.log(res['message']);
        },error=>{
          alert('Có lỗi trong quá trình xử lý dữ liệu!');
        }
      );
    }
    
  }

  addtocart(){
    this.cartService.addtocart(this.product,this.promotion.promotion_infor);
    showSwal('auto-close','Thêm sản phẩm vào giỏ hàng thành công!');
  }
  addtocart1(){
    this.cartService.addtocart(this.product,0);
    showSwal('auto-close','Thêm sản phẩm vào giỏ hàng thành công!');
  }

  getComment(){
    this.productService.getComment(this.id).subscribe(
      res=>{
        var r:any = res;
        this.allComment.next(r.comments);
      }
    );
    this.allComment.subscribe(
      res=>{
        this.comments = res;
      }
    );
  }

  addComment(formDirective){
    this.loading = true;
    const fd = new FormData();
    fd.append('product_id',this.id);
    fd.append('user_id',this.user_id);
    fd.append('comment_content',this.comment_content);
    this.productService.addComment(fd).subscribe(
      res=>{
        this.getComment();
        this.comment_content = ' ';
        formDirective.resetForm();
        this.loading = false;
      },error=>{
        alert('Có lỗi trong quá trình xử lý dữ liệu!');
      }
    );
  }

  removeComment(comment_id){
    if(confirm("Bạn chắc chắn muốn xóa không?")) {
      const fd = new FormData();
      fd.append('comment_id',comment_id);
      this.productService.removeComment(fd).subscribe(
        res=>{
          this.getComment();
        },error=>{}
      );
    }
  }

  danhgia(){
    const fd = new FormData();
    fd.append('user_id',this.user_id);
    fd.append('rating',this.rating.toString());
    fd.append('product_id',this.product.product_id);
    this.productService.danhgia(fd).subscribe(
      res=>{
        this.getratingproduct();
        this.getratingall();
        showSwal('auto-close','Cảm ơn bạn đã đánh giá!');
      },error=>{
        showSwal('auto-close','Có sự cố!');
      }
    );
  }
  getratingelement(){
    this.productService.getratingelement(this.user_id,this.id).subscribe(
      res=>{
        this.rating = parseInt(res['message']);
      },error=>{
        showSwal('auto-close','Có sự cố!');
      }
    );
  }

  getratingproduct(){
    this.productService.getratingproduct(this.id).subscribe(
      res=>{
        this.ratingproduct = parseInt(res['message']);
      },error=>{
        showSwal('auto-close','Có sự cố!');
      }
    );
  }
  getratingall(){
    this.productService.getratingall(this.id).subscribe(
      res=>{
        this.arrcount[0] = res['arrcount'][0];
        this.arrcount[1] = (res['arrcount'][1]*100)/this.arrcount[0];
        this.arrcount[2] = (res['arrcount'][2]*100)/this.arrcount[0];
        this.arrcount[3] = (res['arrcount'][3]*100)/this.arrcount[0];
        this.arrcount[4] = (res['arrcount'][4]*100)/this.arrcount[0];
        this.arrcount[5] = (res['arrcount'][5]*100)/this.arrcount[0];
      },error=>{
        showSwal('auto-close','Có sự cố!');
      }
    );
  }

}
