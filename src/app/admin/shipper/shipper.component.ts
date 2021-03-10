import { Component, OnInit } from '@angular/core';
import { ShipperService } from 'src/app/services/shipper.service';
declare function showSwal(type,message):any;
declare var $;

@Component({
  selector: 'app-shipper',
  templateUrl: './shipper.component.html',
  styleUrls: ['./shipper.component.css']
})
export class ShipperComponent implements OnInit {

  public loading:boolean=false;
  public shipper;
  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public shipper_phone;
  public shipper_name;
  public shipper_address;
  public shipper_password;
  public sh_phone;
  public sh_name;
  public sh_address;
  public oldShipper;
  public newsh_phone='';
  public orders;
  // public ships;

  constructor(private shipperService:ShipperService) { }

  ngOnInit(): void {
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  show(){
    this.shipperService.getallshipper().subscribe(
      res=>{
        this.shipper=res['shipper'];
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addShipper(){
    this.loading = true;
    const fd = new FormData();
    fd.append('shipper_phone',this.shipper_phone);
    fd.append('shipper_name',this.shipper_name);
    fd.append('shipper_address',this.shipper_address);
    fd.append('shipper_password',this.shipper_password);
    this.shipperService.addshipper(fd).subscribe(
      res=>{
        this.loading = false;
        if(res['message']=='success'){
          this.show();
          this.playAudioSuccess();
          $('#myModal').modal('hide');
          showSwal('auto-close','Thêm shipper thành công!');
        }else{
          showSwal('auto-close',res['error']);
        }
       
      },
      error=>{
        this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  getEditWH(sh_phone){
    this.shipperService.getdetailShipper(sh_phone).subscribe(
      res=>{
        var r : any = res['shipper'];
        this.oldShipper = r;
        this.sh_phone=this.oldShipper.shipper_phone;
        this.sh_name=this.oldShipper.shipper_name;
        this.sh_address=this.oldShipper.shipper_address;
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  getOrderShipper(shipper_phone){
    this.shipperService.getOrderShipper(shipper_phone).subscribe(
      res=>{
        this.orders=res['orders'];
        // this.ships=res['ships'];
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
 
  editSH(){
    this.loading = true;
    console.log(this.newsh_phone);
    const fd = new FormData();
    fd.append('sh_phone',this.sh_phone);
    fd.append('newsh_phone',this.newsh_phone);
    fd.append('sh_name',this.sh_name);
    fd.append('sh_address',this.sh_address);
    this.shipperService.editshipper(fd).subscribe(
      res=>{
        this.loading = false;
        if(res['message']=='success'){
          this.show();
          this.playAudioSuccess();
          $('#myModal').modal('hide');
          showSwal('auto-close','Sửa thông tin shipper thành công!');
        }else{
          showSwal('auto-close',res['error']);
        }
      },
      error=>{
        this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }

  remove(shipper_phone){
    if(confirm("Bạn có chắc muốn xóa shipper này không")){
      this.shipperService.remove(shipper_phone).subscribe(
        res=>{
          this.show();
          this.playAudioSuccess();
          showSwal('auto-close','Xóa shipper thành công!');
        },
        error=>{
          showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
        }
      );
    }
  }
  trackByFn(index, item) {
    return index;
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  playAudioSuccess(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/success.mp3";
    audio.load();
    audio.play();
  }
}
