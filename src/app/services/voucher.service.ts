import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {
  
  private baseUrl = 'http://localhost:8000/api/voucher/';

  constructor(private http:HttpClient) { }
  public addVoucher(form){
    return this.http.post(this.baseUrl+'add',form);
  }

  public showVoucher(){
    return this.http.post(this.baseUrl+'show', null);
  }

  public editVoucher(fd){
    return this.http.post(this.baseUrl+'edit', fd);
  }

  public getVoucherByID(voucher_id){
    return this.http.post(this.baseUrl+'getvoucherbyid?voucher_id='+voucher_id,null);
  }

  public checksameuser(user_id){
    return this.http.post(this.baseUrl+'checksameuser?user_id='+user_id, null);
  }

  public checksamevouchername(voucher_name){
    return this.http.post(this.baseUrl+'checksamevouchername?voucher_name='+voucher_name, null);
  }

  public changeApply(voucher_id){
    var fd = new FormData();
    fd.append('voucher_id',voucher_id);
    return this.http.post(this.baseUrl+'changeapply',fd);
  }

  public getAllUserVoucher(voucher_id){
    return this.http.post(this.baseUrl+'getalluservoucher?voucher_id='+voucher_id, null);
  }
  public addVoucherForMember(form){
    return this.http.post(this.baseUrl+'addvoucherformember',form);
  }
  public getpotentialcustomers(voucher_id){
    return this.http.post(this.baseUrl+'getpotentialcustomers?voucher_id='+voucher_id,null);
  }
  public postEditVoucherForUser(fd){
    return this.http.post(this.baseUrl+'editvoucherforuser',fd);
  }
  public removeUserFromVoucher(uv_id){
    const fd = new FormData();
    fd.append('uv_id', uv_id);
    return this.http.post(this.baseUrl+'removeUserFromVoucher', fd);
  }
  public removeVoucher(voucher_id){
    const fd = new FormData();
    fd.append('voucher_id', voucher_id);
    return this.http.post(this.baseUrl+'removeVoucher', fd);
  }
  public getallvoucherforuser(user_id){
    return this.http.post(this.baseUrl+'getallvoucherforuser?user_id=' + user_id, null);
  }
  public getdetailvoucher(voucher_id){
    return this.http.post(this.baseUrl+'getdetailvoucher?voucher_id=' + voucher_id, null);
  }
}
