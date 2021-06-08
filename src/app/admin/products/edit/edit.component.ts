import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { BehaviorSubject,Subscription  } from 'rxjs';
declare var $;
declare function showSwal(type,message):any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public textindesc = "";
  public Editor = ClassicEditor;
  public SelectedImage:File=null;
  public id = '';
  public product:Product;
  public oldPrice;
  public oldImage='';
  public loading = false;
  public selectedOption;
  public promotion;
  public form = {
    product_id:'',
    product_name : '',
    product_price: 0,
    product_accessories:'',
    product_warranty:'',
    product_promotion:0,
    product_condition:'',
    product_img:'',
    product_description:'',
    product_featured:'',
    // product_amount:1,
    product_cate:''
  }
  message:string;
  subscription: Subscription;

  constructor(
    private productService:ProductService,
    private activatedRoute:ActivatedRoute,
    private location:Location,
    private http:HttpClient
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getEditProduct();
    this.form.product_id = this.id;
    this.getPromotion();
    this.subscription =this.productService.currentMessage.subscribe(message => this.message = message);
  }

  onSelect(event) {
    var tmpPath = URL.createObjectURL(event.target.files[0]);
    $("#avatar").fadeIn("fast").attr('src',tmpPath);
    this.SelectedImage=<File>event.target.files[0];
  }

  public update(){
    this.loading = true;
    const fd = new FormData();
    fd.append('product_id',this.form.product_id);
    fd.append('product_name',this.form.product_name);
    fd.append('product_price',this.form.product_price.toString());
    if(this.oldPrice==this.form.product_price){
      this.productService.changeMessage('Hello from Sibling');
      console.log(this.message);
    }
    if(this.SelectedImage!=null){
      fd.append('product_img',this.SelectedImage);
    }
    fd.append('product_accessories',this.form.product_accessories);
    fd.append('product_warranty',this.form.product_warranty);
    if(this.form.product_promotion!=null){
      fd.append('product_promotion',this.selectedOption);
    }
    fd.append('product_condition',this.form.product_condition);
    fd.append('product_description',this.form.product_description);
    // fd.append('product_amount',this.form.product_amount.toString());
    fd.append('product_featured',this.form.product_featured);
    fd.append('product_cate',this.form.product_cate);
    this.productService.update(fd).subscribe(
      res=>{
        this.loading = false;
        this.location.back();
        showSwal('auto-close','Cập nhật sản phẩm thành công!');
      },
      error=>{
        showSwal('auto-close','Cập nhật sản phẩm thất bại!');
      }
    );
  }

  getEditProduct(){
    this.productService.getEditProduct1(this.id).subscribe(
      res=>{
        var r:any;
        r = res;
        this.product = r;
        this.form.product_name=this.product.product_name;
        this.form.product_price=this.product.product_price;
        this.oldPrice=this.product.product_price;
        this.oldImage=this.product.product_img;
        this.form.product_accessories=this.product.product_accessories;
        this.form.product_warranty=this.product.product_warranty;
        // this.form.product_promotion=this.product.product_promotion;
        this.selectedOption=this.product.product_promotion;
        this.form.product_condition=this.product.product_condition;
        this.form.product_description=this.product.product_description;
        // this.form.product_amount=this.product.product_amount;
        this.form.product_featured=this.product.product_featured;
        this.form.product_cate=this.product.product_cate;
        $("#avatar").fadeIn("fast").attr('src',this.oldImage);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý dữ liệu!!');
      }
    );
  }
  getPromotion(){
    this.http.get('http://localhost:8000/api/getPromotionProduct').subscribe(
  		res=>{
        this.promotion = res['promotion'];
        console.log(this.promotion);
  		}, error=>{
	        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
	      }
  		);
  }

  public textindescription( { editor }: ChangeEvent ) {
    this.textindesc = editor.getData();
  }
  // public checkamount(event){
  //   if(this.form.product_amount!=null&&this.form.product_amount<1){
  //     this.form.product_amount=1;
  //   }
  // }
  public checkprice(event){
    if(this.form.product_price!=null&&this.form.product_price<0){
      this.form.product_price=0;
    }
  }
  public checkpromotion(event){
    if(this.form.product_promotion!=null&&this.form.product_promotion<1){
      this.form.product_promotion=0;
    }
    if(this.form.product_promotion!=null&&this.form.product_promotion>100){
      this.form.product_promotion=100;
    }
  }
  public back(){
    this.location.back();
  }

}
