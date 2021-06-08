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
  public products:Product[];
  public allproducts = new BehaviorSubject<Product[]>(null);
  allPromotion = new BehaviorSubject<Promotion[]>(null);
  promotions:Promotion[];
  message: string;
  subscription: Subscription;

  constructor(private router:Router,private productService:ProductService,private chatbotservice:ChatbotService,private voucherservice:VoucherService,private promorionservice:PromotionService) {
    this.getHistoryPrice();
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
  }
  getHistoryPrice(){
    setTimeout(()=>{  
      this.productService.getHistoryPriceNew().subscribe(
        res=>{
         this.products=res['products'];
         var a = new ChatBotMessage();
         a.user_id = '1';
         a.message_id='1';
         a.message_content = 'Sản phẩm mới được thay đổi giá';
         a.customer_chatbot = 'chatbot';
         this.chatbotmessage = '';
         this.arrMessages.push(a);
         this.scrollToBottom();
         for(var i=0; i<=this.products.length;i++){
           var m=new Array();
           m.push('Tên sản phẩm:',this.products[i].product_name,'Giá sản phẩm:',this.products[i].product_price);
           var a = new ChatBotMessage();
           a.user_id = '1';
           a.message_id='1';
           a.message_content = m;
           a.customer_chatbot = 'chatbot';
           this.chatbotmessage = '';
           this.arrMessages.push(a);
           this.scrollToBottom();
         }
        },
        error=>{
          alert('Có lỗi trong quá trình truy xuất dữ liệu!');
        }
      );
      this.getHistoryPrice();         
    }, 30000);
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
          a.message_content = 'Bạn có một số voucher vẫn chưa được sử dụng';
          a.customer_chatbot = 'chatbot';
          this.chatbotmessage = '';
          this.arrMessages.push(a);
          this.scrollToBottom();
          for(var i=0; i<=this.vouchers.length;i++){
            var m=new Array();
            m.push('Mã voucher:',this.vouchers[i].voucher_id,'Tên voucher:',this.vouchers[i].voucher_name,
            'Ngày bắt đầu',this.vouchers[i].voucher_start,'Ngày kết thúc',this.vouchers[i].voucher_end);
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
      // console.log(a.message_content.search("mua hàng"));
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
      // console.log(a.message_content.search("mua hàng"));
      // this.checkMessage(a.message_content);
      if(a.message_content.includes("nhân viên") || a.message_content.includes("nhân viên hỗ trợ") 
      ||a.message_content.includes("nhân viên tư vấn")|| a.message_content.includes("tư vấn")|| a.message_content.includes("hỗ trợ")){
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
    m.push('Bạn có thể nhắn tin trực tiếp với nhân viên thông qua messenger, tin nhắn sẽ được phản hồi sớm nhất có thể cảm ơn');
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
    // var m = 'Xin lỗi chúng tôi không hiểu bạn đang nói gì';
    var arrQuestion:string[] = new Array('hello', 'tên', 'tìm');
    var arrResponde:string[] = new Array('Xin chào bạn! Tui có thể giúp gì cho bạn!,', 'Tôi là trợ lý ảo của T2Shop', 'OK bạn muốn tìm sản phẩm như thế nào? hãy viết sản phẩm ra');
    for(var i = 0; i < arrQuestion.length; i++){
      if(this.chatbotmessage.includes(arrQuestion[i])){
        if(arrQuestion[i]=="tìm"){
          this.show();
        }
        // m = "tìm ra rồi";
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

    if(this.chatbotmessage!="" && this.chatbotmessage!="tìm"){
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
        m.push('Tên sản phẩm:',this.products[i].product_name,'Giá sản phẩm:',this.products[i].product_price,
              'Phần trăm:', this.promotions[i].promotion_infor,'%');
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
  }
  showchatbox2(){
     this.chatbox.nativeElement.style.display='none';
  }

}
