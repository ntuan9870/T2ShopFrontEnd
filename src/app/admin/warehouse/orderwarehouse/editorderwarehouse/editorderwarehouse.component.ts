import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editorderwarehouse',
  templateUrl: './editorderwarehouse.component.html',
  styleUrls: ['./editorderwarehouse.component.css']
})
export class EditorderwarehouseComponent implements OnInit {

  public loading:boolean=false;
  public cost;
  public money;
  public debt;
  public time;

  constructor() { }

  ngOnInit(): void {
  }
  editOrderWarehouse(){

  }
  inputmoney(){
    
  }

}
