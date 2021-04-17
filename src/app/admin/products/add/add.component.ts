import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ProductService } from 'src/app/services/product.service';
import { title } from 'process';
import { element } from 'protractor';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
declare var $;
declare var toastr;
declare var Toast;
declare function showSwal(type,message):any;

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public Editor = ClassicEditor;
  private SelectedImage:File = null;
  public error = [];
  public allCategory:Category[];
  public textindesc = "";
  public id ="";
  public loading = false;
  public promotion;
  public selectedItem;
  public selectedOption = null;
  public samename = false;
  public form = {
    ten : "",
    price:0,
    img : "",
    accessories:"",
    warranty:"",
    promotion:0,
    condition:"",
    description:"",
    amount:1,
    featured:"0",
    cate:""
  }
  public productWH;
  public selectedProduct;
  
  constructor(
    private proSer:ProductService,
    private categoryService:CategoryService,
    private aR:ActivatedRoute,
    private router:Router,
    private location:Location,
    private http:HttpClient
    ) { }

  ngOnInit(): void {
    this.id = this.aR.snapshot.params['id'];
    this.getAllCategory();
    this.getPromotion();
    this.getidProduct();
  }

  onSelect(event) {
    var tmpPath = URL.createObjectURL(event.target.files[0]);
    $("#avatar").fadeIn("fast").attr('src',tmpPath);
    this.SelectedImage=<File>event.target.files[0];
  }

 

  add(){
    this.loading = true;
    var message;
    const fd = new FormData();
    fd.append('product_name',this.form.ten);
    fd.append('product_price',this.form.price.toString());
    fd.append('img',this.SelectedImage);
    // fd.append('name',$('#name').val());
    // fd.append('price',$('#price').val());
    fd.append('accessories',$('#accessories').val());
    fd.append('warranty',$('#warranty').val());
    fd.append('promotion',this.selectedOption);
    fd.append('condition',$('#condition').val());
    fd.append('status',$('#status').val());
    fd.append('description',this.textindesc);
    fd.append('amount',this.form.amount.toString());
    fd.append('cate',this.id);
    fd.append('featured',this.form.featured);
    this.proSer.add(fd).subscribe(
      res=>{
        message=res;
        const fd = new FormData();
        fd.append('key',"");
        fd.append('id','1');
        this.proSer.getFromDB(fd);
        this.loading = false;
        this.location.back();
        showSwal('auto-close',res['message']);
      },
      // error=>{error.error.error.forEach(element=>{alert(element)});
      error=>{console.log(error);
      this.loading = false;
      });
  }
  checkid(id){
    this.proSer.ckeckid(id).subscribe(
      res=>{
        showSwal('auto-close',res['message']);
      },
      error=>{
        showSwal('auto-close','Lỗi');
      }
    );
  }
  getAllCategory(){
    this.categoryService.show();
    this.categoryService.allCategory.subscribe(
      res=>{
        this.allCategory = res;
        console.log(this.allCategory);
      },
      error=>{
        showSwal('auto-close','Lỗi');
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
  getidProduct(){
    this.proSer.getidProduct(this.id).subscribe(
      res=>{
        this.productWH = res['productWH'];
        console.log(this.productWH);
      },
      error=>{
        showSwal('auto-close','Lỗi');
      }
    );
  }
  public textindescription( { editor }: ChangeEvent ) {
    this.textindesc = editor.getData();
  }
  public checkamount(event){
    if(this.form.amount!=null&&this.form.amount<1){
      this.form.amount=1;
    }
  }
  public checkprice(event){
    if(this.form.price!=null&&this.form.price<0){
      this.form.price=0;
    }
  }
  public checkpromotion(event){
    if(this.form.promotion!=null&&this.form.promotion<1){
      this.form.promotion=0;
    }
    if(this.form.promotion!=null&&this.form.promotion>100){
      this.form.promotion=100;
    }
  }
  public back(){
    this.location.back();
  }
  public checkName(){
    this.proSer.checkSameName(this.form.ten).subscribe(
      res=>{
        if(res['message']=='same'){
          this.samename = true;
        }else{
          this.samename = false;
        }
      }
    );
  }
}
