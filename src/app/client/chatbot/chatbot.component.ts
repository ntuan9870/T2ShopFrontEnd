import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatBotMessage } from 'src/app/models/chat-bot-message.model';
import { ChatbotService } from 'src/app/services/chatbot.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { Voucher } from 'src/app/models/voucher.model';
import { BehaviorSubject } from 'rxjs';

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

  constructor(private chatbotservice:ChatbotService,private voucherservice:VoucherService) { }

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
          a.message_content = 'Sau đây là một số voucher của bạn';
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
      if(a.message_content.includes("mua hàng")){
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
    var m="A hiểu rồi chờ chúng tôi chút";
    var a = new ChatBotMessage();
    a.user_id = '1';
    a.message_id='1';
    a.message_content = m;
    a.customer_chatbot = 'chatbot';
    // console.log(a.message_content);
    this.chatbotmessage = '';
    this.arrMessages.push(a);
    this.scrollToBottom();
  }
  solver(){
    var m = 'Xin lỗi chúng tôi không hiểu bạn đang nói gì';
    var arrQuestion:string[] = new Array('hello', 'tên', 'tìm');
    var arrResponde:string[] = new Array('Xin chào bạn! Tui có thể giúp gì cho bạn!,', 'Tôi là trợ lý ảo của T2Shop', 'OK bạn muốn tìm sản phẩm như thế nào? hãy viết sản phẩm ra');
    for(var i = 0; i < arrQuestion.length; i++){
      if(this.chatbotmessage.includes(arrQuestion[i])){
        if(arrQuestion[i]=="tìm"){
          this.search();
        }
        m = arrResponde[i];
      }
    }
    var a = new ChatBotMessage();
    a.user_id = '1';
    a.message_id='1';
    a.message_content = m;
    a.customer_chatbot = 'chatbot';
    // console.log(a.message_content);
    this.chatbotmessage = '';
    this.arrMessages.push(a);
    this.scrollToBottom();
  }
  search(){
    var m="";
    var a = new ChatBotMessage();
    a.user_id = '1';
    a.message_id='1';
    a.message_content = m;
    a.customer_chatbot = 'customer';
    console.log(a.message_content);
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight-100;
    } catch(err) { }                 
  }

  showchatbox(){
    if(this.chatbox.nativeElement.style.display=='none'){
      this.chatbox.nativeElement.style.display='block';
    }else{
      this.chatbox.nativeElement.style.display='none';
    }
  }
  showchatbox2(){
    alert('Hello');
  }

}
