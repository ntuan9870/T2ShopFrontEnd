import { Component, OnInit } from '@angular/core';
import { AccessoriesService } from 'src/app/services/accessories.service';
declare var $;
declare function showSwal(type,message):any;

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit {

  amount:number = 0;
  config: any;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public acc_name;
  public acc_img;
  private SelectedImage:File = null;
  public accessories;

  constructor(private accessoriesServices:AccessoriesService) { }

  ngOnInit(): void {
    this.show();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }
  show(){
    this.accessoriesServices.show().subscribe(
      res=>{
       this.accessories=res['accessories'];
      },
      error=>{
        // this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  addAccessories(){
    console.log(this.SelectedImage);
    // this.loading = true;
    const fd = new FormData();
    fd.append('acc_name',this.acc_name);
    fd.append('acc_img',this.SelectedImage);
    this.accessoriesServices.add(fd).subscribe(
      res=>{
        console.log(res['filename']);
        // this.loading = false;
        // this.location.back();
        this.playAudioSuccess();
        this.show();
        showSwal('auto-close','Thêm phụ kiện thành công thành công!');
      },
      error=>{
        // this.loading = false;
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  onSelect(event) {
    var tmpPath = URL.createObjectURL(event.target.files[0]);
    $("#avatar").fadeIn("fast").attr('src',tmpPath);
    this.SelectedImage=<File>event.target.files[0];
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
  playAudioError(){
    let audio = new Audio();
    audio.src = "../../../assets/sound/error.mp3";
    audio.load();
    audio.play();
  }

}
