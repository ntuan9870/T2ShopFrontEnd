import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatBotMessage } from 'src/app/models/chat-bot-message.model';
import { ChatbotService } from 'src/app/services/chatbot.service';

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

  constructor(private chatbotservice:ChatbotService) { }

  ngOnInit(): void {
    var a = new ChatBotMessage();
    a.user_id = '1';
    a.message_id='1';
    a.message_content = 'hello';
    a.customer_chatbot = 'chatbot';
    this.arrMessages[0] = a;
  }

  ngAfterViewChecked() {        
    this.scrollToBottom();        
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
