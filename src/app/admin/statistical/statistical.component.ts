import { Component, OnInit,ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { StatisticalService } from 'src/app/services/statistical.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Order } from 'src/app/models/order.model';
import { ChartType, ChartOptions,ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import {Monthyear} from'src/app/models/monthYear.model';
import { from } from 'rxjs';
import * as jsPDF from 'jspdf';
import * as XLSX from 'xlsx'; 
import {Chart} from 'node_modules/chart.js'
import {
  DocumentEditorComponent, EditorService, SelectionService, SfdtExportService, WordExportService
} from '@syncfusion/ej2-angular-documenteditor';
declare function showSwal(type,message):any;

@Component({
  selector: 'app-statistical',
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [EditorService, SelectionService, SfdtExportService,WordExportService]
})
export class StatisticalComponent implements OnInit {
  public date = '';
  public infor = '';
  config: any;
  public current_orders = null;
  public sumtotal;
  public orders;
  public total_orders;
  public tableorders:boolean=false;
  public month;
  public year;
  public pipechart:boolean=false;
  public allmonth:Monthyear[];
  amount:number = 0;
  labelnext = 'Sau';
  labelprevious = 'Trước';
  public selected;
  public pipe;
  public sumday;
  public barChart;
  public ngay;
  public dt = new Date();
  public currentMonth = 1;
  public ms = new Array();
  public arrValueDayInMonth = new Array();

  constructor(private statisticalservice:StatisticalService,private location:Location,private http:HttpClient) {
    
   }
   // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['Tháng1'], ['Tháng2'], ['Tháng3'],['Tháng4'], ['Tháng5'], ['Tháng6'],['Tháng7'],
   ['Tháng8'], ['Tháng9'],['Tháng10'], ['Tháng11'], ['Tháng12']];
  public pieChartData: SingleDataSet=[] ;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];


  ngOnInit(): void {
    this.currentMonth = this.dt.getMonth()+1;
    for(let i = 1; i <= 12; i++){
      this.ms.push(i);
    }
    this.getRevenueMonth();
    this.currentDate();
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.amount 
    };
  }

  getRevenueMonth(){
    this.arrValueDayInMonth = new Array();
    this.statisticalservice.getRevenueMonth(this.currentMonth).subscribe(
      res=>{
        if(res['result']!=null){
          for(let i = 0; i < res['result'].length; i++){
            this.arrValueDayInMonth.push(res['result'][i]);
            this.tableorders=false;
            this.pipechart=false;
          }
          this.getChart();
        }
      },error=>{
        alert('Có lỗi trong quá trình truy xuất dữ liệu!');
      }
    );
  }
  getChart(){
    var s: number = 30;
    var day = new Array();
    var bgcolor = new Array();
    var max:number = 0;
    for(let i = 1; i <= this.arrValueDayInMonth.length; i++){
      if(this.arrValueDayInMonth[i]>max){
        max = this.arrValueDayInMonth[i];
      }
    }
    for(let i = 1; i <= this.arrValueDayInMonth.length; i++){
      day.push(i);
      if(this.arrValueDayInMonth[i] < max/3){
        bgcolor.push('rgba(255, 99, 132, 0.6)');
      }else if(this.arrValueDayInMonth[i] >= max/3&&this.arrValueDayInMonth[i] < 2*max/3){
        bgcolor.push('rgba(54, 162, 235, 0.6)');
      }
      else {
        bgcolor.push('rgba(255, 206, 86, 0.6)');
      }
    }
    var ctx = document.getElementById('chart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: day,
            datasets: [{
                label: '# đơn hàng',
                data: this.arrValueDayInMonth,
                backgroundColor: bgcolor,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }
  pageChanged(event){
    this.config.currentPage = event;
  }
  currentDate(){
  	this.http.get('http://localhost:8000/api/currentDate').subscribe(
  		res=>{
  			// var r : any = res;
          this.current_orders = res['orders'];
          this.sumtotal=res['sumtotal'];
        	// console.log(this.current_orders);
  		}, error=>{
	        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
	      }
  		);
  }
  trackByFn(index, item) {
    return index;
  }
  //  pageChanged(event){
  //   this.config.currentPage = event;
  // }
  Clickdate(){
  	const fd = new FormData();
     fd.append('date',this.date);
     this.selected="ngày"+this.date;
  	 this.statisticalservice.theongay(fd).subscribe(
      res=>{
       this.orders=res['orders'];
       this.total_orders=res['sum_day'];
       this.tableorders=true;
       this.pipechart=false;
        // console.log(res);
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  
  

  Clickmonth(){
    const fd = new FormData();
     fd.append('month',this.month);
     this.selected="tháng"+this.month;
  	 this.statisticalservice.theothang(fd).subscribe(
      res=>{
      this.barChart = new Array();
      this.ngay = new Array();
       this.orders=res['orders'];
       this.total_orders=res['sum_day'];
       this.tableorders=true;
       this.pipechart=false;
        for(let i = 0; i < res['result'].length; i++){
          this.barChart.push(res['result'][i]);
        }
        for(let i = 0; i < res['sumday']; i++){
          this.ngay.push(i);
        }
        this.getchart();
      },
      error=>{
        showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
      }
    );
  }
  
  getchart(){
    var s: number = 30;
    var day = new Array();
    var bgcolor = new Array();
    var max:number = 0;
    for(let i = 1; i <= this.barChart.length; i++){
      if(this.barChart[i]>max){
        max = this.barChart[i];
      }
    }
    for(let i = 1; i <= this.barChart.length; i++){
      day.push(i);
      if(this.barChart[i] < max/3){
        bgcolor.push('rgba(255, 99, 132, 0.6)');
      }else if(this.barChart[i] >= max/3&&this.barChart[i] < 2*max/3){
        bgcolor.push('rgba(54, 162, 235, 0.6)');
      }
      else {
        bgcolor.push('rgba(255, 206, 86, 0.6)');
      }
    }
    var ctx = document.getElementById('chart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: day,
            datasets: [{
                label: '# nghìn đồng',
                data: this.barChart,
                backgroundColor: bgcolor,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }
  Clickyear(){
    this.pieChartData.splice(0,12);
    const fd = new FormData();
    fd.append('year',this.year);
    this.selected="năm"+this.year;
    this.statisticalservice.theonam(fd).subscribe(
     res=>{
      this.pipe=res['pipe'];
      this.orders=res['orders'];
      this.total_orders=res['sum_day'];
      this.tableorders=true;
      for(var prop in this.pipe){
        monkeyPatchChartJsTooltip();
        monkeyPatchChartJsLegend();
        this.pipechart=true;
        this.pieChartData.push(this.pipe[prop]);
      }
     },
     error=>{
       showSwal('auto-close','Có lỗi trong quá trình xử lý thông tin!');
     }
   );
  }

  // @ViewChild('content') content: ElementRef; 
  // public openPDF():void {
  //   let DATA = this.content.nativeElement;
  //   let doc = new jsPDF('p','pt', 'a4');
  //   doc.fromHTML(DATA.innerHTML,15,15);
  //   doc.output('dataurlnewwindow');
  // }

  // SavePDF() {  
  //   let content=this.content.nativeElement;  
  //   let doc = new  jsPDF('p','pt', 'a4');  
  //   let _elementHandlers =  
  //   {  
  //     '#editor':function(element,renderer){  
  //       return true;  
  //     }  
  //   };  
  //   doc.fromHTML(content.innerHTML,15,15,{  
  
  //     'width':190,  
  //     'elementHandlers':_elementHandlers  
  //   });  
  
  //   doc.save('test.pdf');  
  // }  
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
  title = 'Excel';  
  ExportTOExcel() {  
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'ScoreSheet.xlsx');  
  }  

  @ViewChild('document_editor')
  public documentEditor:DocumentEditorComponent;

  saveAsDocx() {
    // console.log(document.getElementById('content').innerText);
    this.documentEditor.save('sample','Docx');
  }
  
}
