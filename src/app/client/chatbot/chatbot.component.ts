import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatBotMessage } from 'src/app/models/chat-bot-message.model';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { Voucher } from 'src/app/models/voucher.model';
import { BehaviorSubject,Subscription  } from 'rxjs';
import { PromotionService } from 'src/app/services/promotion.service';
import { Product } from 'src/app/models/product.model';
import { Promotion } from 'src/app/models/promotion.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  @ViewChild('chatbox') private chatbox: ElementRef;

  public arrMessages:ChatBotMessage[] = new Array();
  public chatbotmessage = '';
  public user_id='';
  public user_name = '';
  public user_email = '';
  public user_phone = '';
  public user_level = '';
  public checklogin = false;
  public allVouchers = new BehaviorSubject<Voucher[]>(null);
  public vouchers:Voucher[];
  public products;
  public allproducts = new BehaviorSubject<Product[]>(null);
  allPromotion = new BehaviorSubject<Promotion[]>(null);
  promotions:Promotion[];
  message: string;
  subscription: Subscription;
  public favoriteProduct:Product[];
  private display_chatbox = false;

  constructor(private productservice:ProductService,private router:Router,private productService:ProductService,private chatbotservice:ChatbotService,private voucherservice:VoucherService,private promorionservice:PromotionService) {
   }

  ngOnInit(): void {
    var a = new ChatBotMessage();
    a.user_id = '1';
    a.message_id='1';
    a.message_content = 'hello';
    a.customer_chatbot = 'chatbot';
    this.arrMessages[0] = a;

    if(sessionStorage.getItem('user_name')){
      this.user_name = sessionStorage.getItem('user_name');
      this.user_id = sessionStorage.getItem('user_id');
      this.checklogin = true;
    }else{
      if(localStorage.getItem('user_name')){
        this.user_name = localStorage.getItem('user_name');
        this.user_id = localStorage.getItem('user_id');
        this.checklogin = true;
      }else{
        this.checklogin = false;
      }
    }
    this.showVoucher();
    this.getHistoryPrice();
  }
  showFavoriteProduct(){
    this.productservice.showFavoriteProduct(this.user_id).subscribe(
      res=>{
        this.favoriteProduct=res['favoriteProduct'];
      }
    );
  }
  getHistoryPrice(){
    if(this.user_name!=''){
      setTimeout(()=>{  
        this.productService.getHistoryPriceNew().subscribe(
          res=>{
           this.products=res['products'];
           var a = new ChatBotMessage();
           a.user_id = '1';
           a.message_id='1';
           a.message_content = 'S???n ph???m y??u th??ch c???a b???n m???i ???????c thay ?????i gi??';
           a.customer_chatbot = 'chatbot';
           this.chatbotmessage = '';
           this.arrMessages.push(a);
           this.scrollToBottom();
           this.showFavoriteProduct();
           for(var i=0; i<=this.products.length;i++){
             for(var j=0;j<this.favoriteProduct.length;j++){
               if(this.favoriteProduct[j].product_id==this.products[i].product_id){
                 console.log(this.products[i]);
                var m=new Array();
                m.push('T??n s???n ph???m:',this.products[i].product_name,'Gi?? m???i s???n ph???m:',this.products[i].product_price,'Gi?? c?? c???a s???n ph???m',this.products[i].price_history,'th???i gian thay ?????i',this.products[i].time);
                var a = new ChatBotMessage();
                a.user_id = '1';
                a.message_id='1';
                a.message_content = m;
                a.customer_chatbot = 'chatbot';
                this.chatbotmessage = '';
                this.arrMessages.push(a);
                this.scrollToBottom();
               }
             }
           }
          },
          error=>{
            alert('C?? l???i trong qu?? tr??nh truy xu???t d??? li???u!');
          }
        );
        this.getHistoryPrice();         
      }, 30000);
    }
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }
  showVoucher(){
    if(this.user_name!=''){
      this.voucherservice.getallvoucherforuser(this.user_id).subscribe(
        res=>{
          this.vouchers = res['vouchers'];
          var a = new ChatBotMessage();
          a.user_id = '1';
          a.message_id='1';
          a.message_content = 'B???n c?? m???t s??? voucher v???n ch??a ???????c s??? d???ng';
          a.customer_chatbot = 'chatbot';
          this.chatbotmessage = '';
          this.arrMessages.push(a);
          this.scrollToBottom();
          for(var i=0; i<=this.vouchers.length;i++){
            var m=new Array();
            m.push('M?? voucher:',this.vouchers[i].voucher_id,'T??n voucher:',this.vouchers[i].voucher_name,
            'Ng??y b???t ?????u',this.vouchers[i].voucher_start,'Ng??y k???t th??c',this.vouchers[i].voucher_end);
            var a = new ChatBotMessage();
            a.user_id = '1';
            a.message_id='1';
            a.message_content = m;
            a.customer_chatbot = 'chatbot';
            this.chatbotmessage = '';
            this.arrMessages.push(a);
            this.scrollToBottom();
          }
        }
      );
    }
  }
  checkMessage(e){
    if(e.keyCode == 13){
      var key:string[] =new Array('mua','kiem tra','tai khoan');
      for( var i=0; i<=key.length;i++){
        console.log(key[i]);
      }
      var a = new ChatBotMessage();
      a.user_id = '1';
      a.message_id='1';
      a.message_content = this.chatbotmessage;
      a.customer_chatbot = 'customer';
      // this.chatbotmessage = '';
      // console.log(a.message_content.search("mua h??ng"));
    }
  }
  submitMessage(e){
    if(e.keyCode == 13){
      var a = new ChatBotMessage();
      a.user_id = '1';
      a.message_id='1';
      a.message_content = this.chatbotmessage;
      a.customer_chatbot = 'customer';
      // this.chatbotmessage = '';
      // console.log(a.message_content.search("mua h??ng"));
      // this.checkMessage(a.message_content);
      if(a.message_content.includes("nh??n vi??n") || a.message_content.includes("nh??n vi??n h??? tr???") 
      ||a.message_content.includes("nh??n vi??n t?? v???n")|| a.message_content.includes("t?? v???n")|| a.message_content.includes("h??? tr???")){
        this.arrMessages.push(a);
        this.answer();
      }else{
        this.arrMessages.push(a);
        this.solver();
        this.scrollToBottom();
      }
      
    }
  }
  answer(){
   
    var m= new Array();
    m.push('B???n c?? th??? nh???n tin tr???c ti???p v???i nh??n vi??n th??ng qua messenger, tin nh???n s??? ???????c ph???n h???i s???m nh???t c?? th??? c???m ??n');
    var a = new ChatBotMessage();
    a.user_id = '1';
    a.message_id='1';
    a.message_content = m;
    a.customer_chatbot = 'chatbot';
    // console.log(a.message_content);
    this.chatbotmessage = '';
    this.arrMessages.push(a);
    this.scrollToBottom();
    window.open('https://www.facebook.com/T2Shop-100103625501034','_blank');
  }
  solver(){
    // var m = 'Xin l???i ch??ng t??i kh??ng hi???u b???n ??ang n??i g??';
    var arrQuestion:string[] = new Array('hello', 't??n', 't??m');
    var arrResponde:string[] = new Array('Xin ch??o b???n! Tui c?? th??? gi??p g?? cho b???n!,', 'T??i l?? tr??? l?? ???o c???a T2Shop', 'OK b???n mu???n t??m s???n ph???m nh?? th??? n??o? h??y vi???t s???n ph???m ra');
    for(var i = 0; i < arrQuestion.length; i++){
      if(this.chatbotmessage.includes(arrQuestion[i])){
        if(arrQuestion[i]=="t??m"){
          this.show();
        }
        // m = "t??m ra r???i";
       var m = arrResponde[i];
      }
    }
    var a = new ChatBotMessage();
    a.user_id = '1';
    a.message_id='1';
    a.message_content = m;
    a.customer_chatbot = 'chatbot';
    this.chatbotmessage = '';
    this.arrMessages.push(a);
    this.scrollToBottom();
  }
  show(){
    // var a = new ChatBotMessage();
    // a.user_id = '1';
    // a.message_id='1';
    // a.message_content = this.chatbotmessage;
    // a.customer_chatbot = 'customer';
    // this.arrMessages.push(a);
    // this.scrollToBottom();

    if(this.chatbotmessage!="" && this.chatbotmessage!="t??m"){
    const fd = new FormData();
    fd.append('key',this.chatbotmessage);
    fd.append('id','');

    this.productService.getFromDB(fd).subscribe(
      res=>{
        var r:any = res;
        this.allproducts.next(r.products);
        this.allPromotion.next(r.promotions);
      },
      error=>{
        alert('Error');
      }
    );
    this.allproducts.subscribe(
      res=>{
        this.products = res;
      },
      error=>{
        alert('Error');
      }
    );
    this.allPromotion.subscribe(
      res=>{
        this.promotions = res;
      },
      error=>{
        alert('Error');
      }
    );
    if(this.products && this.promotions){
      for(var i=0; i<=this.products.length;i++){
        var m= new Array();
        m.push('T??n s???n ph???m:',this.products[i].product_name,'Gi?? s???n ph???m:',this.products[i].product_price,
              'Ph???n tr??m:', this.promotions[i].promotion_infor,'%');
        if(m!=null){
          var a = new ChatBotMessage();
          a.user_id = '1';
          a.message_id='1';
          a.message_content = m;
          a.customer_chatbot = 'chatbot';
          this.chatbotmessage = '';
          this.arrMessages.push(a);
          this.scrollToBottom();
        }
      }
    }
    }
  }
 
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight-100;
    } catch(err) { }                 
  }

  showchatbox(){
    if(this.chatbox.nativeElement.style.display=='none'){
      this.chatbox.nativeElement.style.display='block';
      document.getElementById('new').style.display='none';
    }else{
      this.chatbox.nativeElement.style.display='none';
    }
    // this.display_chatbox != this.display_chatbox;
  }
  showchatbox2(){
     this.chatbox.nativeElement.style.display='none';
  }

}
