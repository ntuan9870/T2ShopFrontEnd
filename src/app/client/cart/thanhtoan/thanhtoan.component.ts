import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hmac } from 'crypto';
import { BehaviorSubject } from 'rxjs';
import { District } from 'src/app/models/district.model';
import { Voucher } from 'src/app/models/voucher.model';
import { Ward } from 'src/app/models/ward.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { VoucherService } from 'src/app/services/voucher.service';
import  *  as  district  from  './district.json';
import  *  as  ward  from  './ward.json'
declare function showSwal(type,message):any;
@Component({
  selector: 'app-thanhtoan',
  templateUrl: './thanhtoan.component.html',
  styleUrls: ['./thanhtoan.component.css']
})
export class ThanhtoanComponent implements OnInit {

  public loading = false;
  public checkpmin="";
  public allVouchers = new BehaviorSubject<Voucher[]>(null);
  public vouchers:Voucher[];
  public voucher:Voucher;
  public form = {
    user_id : '',
    user_name_receive : '',
    user_email : '',
    user_phone : '',
    user_address : '',
    user_message : '',
    form : '',
    total : '',
    cart : '',
    select_voucher:'null',
    promotion:''
  }
  public showformphone = true;
  public allDistrict = new BehaviorSubject<District[]>(null);
  public districts:District[] = new Array();
  public wards:Ward[] = new Array();
  public ws:Ward[] = new Array();
  public qh = 'Quận 1';
  public px = 'Phường 01';
  public checkerrorp = false;

  @ViewChild('paypalRef', {static:true}) private paypalRef:ElementRef;

  constructor(private router:Router,private orderService:OrderService,private cartService:CartService,private location:Location, private voucherSerice:VoucherService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {


    this.form.select_voucher = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.params.subscribe(routeParams => {
      this.form.select_voucher = this.activatedRoute.snapshot.params['id'];
      this.getVoucher();
    });

    if(sessionStorage.getItem('user_phone')){
      if(sessionStorage.getItem('user_phone')!='null'){
        this.showformphone = false;
      }
    }
    if(localStorage.getItem('user_phone')){
      if(localStorage.getItem('user_phone')!='null'){
        this.showformphone = false;
      }
    }
    if(!localStorage.getItem('user_name')&&!sessionStorage.getItem('user_level')){
      sessionStorage.setItem('thanhtoan','true')
      this.router.navigate(['auth/login']);
    }
    if(sessionStorage.getItem('user_id')){
      this.form.user_id = sessionStorage.getItem('user_id');
      if(sessionStorage.getItem('user_phone')!='null'){
        this.form.user_name_receive=sessionStorage.getItem('user_name');
        this.form.user_phone = sessionStorage.getItem('user_phone');
      }
    }
    if(localStorage.getItem('user_id')){
      this.form.user_id = localStorage.getItem('user_id');
      this.form.user_name_receive=localStorage.getItem('user_name');
      this.form.user_phone = localStorage.getItem('user_phone');
      // if(localStorage.getItem('user_phone')!='null'){
      //   this.userphone = localStorage.getItem('user_phone');
      // }
    }
    this.getAllDistrict();
    this.ws = new Array();
    for(var i = 0; i < this.wards.length; i++){
      if(this.wards[i].QuanHuyenTitle=='Quận 1'){
        this.ws.push(this.wards[i]);
      }
    }
    this.voucherSerice.getallvoucherforuser(this.form.user_id).subscribe(
      res=>{
        var r:any = res;
        this.allVouchers.next(r.vouchers);
      }
    );
    this.allVouchers.subscribe(
      res=>{
        if(res!=null){
          this.vouchers = res;
          this.getVoucher();
        }
      }
    );
  }
  getVoucher(){
    for(var i = 0; i < this.vouchers.length; i++){
      if(this.vouchers[i].voucher_id==this.form.select_voucher){
        if(localStorage.getItem('total')<this.vouchers[i].voucher_price){
          this.form.select_voucher = null;
          alert('Số tiền không áp dụng được cho voucher này, vui lòng mua thêm hàng nếu bạn muốn áp dụng voucher này (số tiền tối thiểu áp dụng là '+this.vouchers[i].voucher_price+' đồng)');
          return;
        }
      }
    }
    for(let i = 0; i < this.vouchers.length; i++){
      if(this.form.select_voucher == this.vouchers[i].voucher_id){
        this.voucher =  this.vouchers[i];
      }
    }
    if(this.form.select_voucher == 'null'){
      this.form.total = this.cartService.tongtien().toString();
      return;
    }
    if(this.voucher!=null){
      if(this.voucher.voucher_discount!=0){
        this.form.total = (parseInt(this.cartService.tongtien())*(100-this.voucher.voucher_discount)/100).toString();
      }else if(this.voucher.voucher_value!=0){
        this.form.total = (parseInt(this.cartService.tongtien())-this.voucher.voucher_value).toString();
      }
    }else{
      this.form.total = this.cartService.tongtien().toString();
    }
  }
  getAllDistrict(){
    var vd:any  = (district  as  any).default;
    this.districts = vd;
    var vw:any  = (ward  as  any).default;
    this.wards = vw;
    this.ws = this.wards;
  }
  getv(){
    this.voucherSerice.getallvoucherforuser(this.form.user_id).subscribe(
      res=>{
        var r:any = res;
        this.allVouchers.next(r.vouchers);
      }
    );
    this.allVouchers.subscribe(
      res=>{
        if(res!=null){
          this.vouchers = res;
        }
      }
    );
  }
  addorder(){
    this.loading = true;
    this.form.form = 'Trực tiếp';
    this.form.user_address += ' - '+this.px + ' - ' + this.qh;
    for(let i = 0; i < this.vouchers.length; i++){
      if(this.form.select_voucher == this.vouchers[i].voucher_id){
        this.voucher =  this.vouchers[i];
      }
    }
    if(this.voucher!=null){
      if(this.voucher.voucher_discount!=0){
        this.form.total = (parseInt(this.cartService.tongtien())*(100-this.voucher.voucher_discount)/100).toString();
      }else{
        this.form.total = (parseInt(this.cartService.tongtien())-this.voucher.voucher_value).toString();
      }
    }
    this.form.cart = localStorage.getItem('cart');
    // this.form.promotion = localStorage.getItem('promotion');
    this.orderService.addorder(this.form).subscribe(
      res=>{
        if(sessionStorage.getItem('user_id')){
          sessionStorage.setItem('user_phone',this.form.user_phone.toString());
        }else{
          if(localStorage.getItem('user_id')){
            localStorage.setItem('user_phone',this.form.user_phone.toString());
          }
        }
        this.loading = false;
        this.cartService.xoagiohang();
        this.getv();
        this.router.navigate(['/cart/complete']);
        showSwal('auto-close','Thành công!');
      },
      error=>{
        this.loading = false;
        alert('Có lỗi trong quá trình xử lý dữ liệu!');
      }
    );
  }

  checkphonemin(){
    if(this.form.user_phone==''){
      this.checkerrorp = false;
      return;
    }
    this.form.user_phone = this.form.user_phone.replace(/[^0-9]/g, '');
    this.checkerrorp = false;
    if(this.form.user_phone.length<10||this.form.user_phone.length>12){
      this.checkerrorp = true;
    }
  }

  selectDistrict(){
    this.ws = new Array();
    for(var i = 0; i < this.wards.length; i++){
      if(this.wards[i].QuanHuyenTitle==this.qh){
        this.ws.push(this.wards[i]);
      }
    }
  }

  thanhtoanvnpay(){
    this.loading = true;
    this.form.form  = 'VNPAY';
    this.form.total = this.cartService.tongtien();
    this.form.cart = localStorage.getItem('cart');
    this.form.user_address += ' - '+this.px + ' - ' + this.qh;
    this.orderService.thanhtoanvnpay(this.form).subscribe(
      res=>{
        if(res['message']=='success'){
          this.cartService.xoagiohang();
          window.location.href = res['checkouturl'];
        }
      }
    );
  }
}
