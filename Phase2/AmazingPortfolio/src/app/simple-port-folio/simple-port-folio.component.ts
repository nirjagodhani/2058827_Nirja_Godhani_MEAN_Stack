import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInfo,perInfo } from '../user.model';

@Component({
  selector: 'app-simple-port-folio',
  templateUrl: './simple-port-folio.component.html',
  styleUrls: ['./simple-port-folio.component.css']
})
export class SimplePortFolioComponent implements OnInit {
  printInfo:string="";
  userName:string="";
  alertTemp :boolean = false; 
  alertHideLogin: boolean = true; 
  showdata: boolean =  false;
  showTable:boolean = false;
  perArray:Array<perInfo> = [];

  userArray : Array<UserInfo> = []
  constructor(){}

  ngOnInit(): void {
  }
  
  UserLogin(loginRef:NgForm){
    let newArr = this.userArray;
  
    console.log("newArr===",newArr);
    let login = loginRef.value;

    if  (newArr.length == 0 ){
        this.printInfo="User not found";
    }
    for (let ab in newArr){
     
      let tempArr = Object.values(newArr[ab]);
     
      if (login.user == tempArr[2] && login.pass == tempArr[3])
      {
        this.printInfo = "successful";
        this.userName = tempArr[2]; 
        this.showdata = true; 
        this.alertHideLogin = false;
      }else{
        this.printInfo="User not found";
      }
    } 
  }    
  
  temp(){
    this.alertTemp = true;
    this.alertHideLogin = false;
  }
  backToLogin(){
    this.alertTemp = false;
    this.alertHideLogin = true;
  }

  createSign(signUpRef:NgForm){
    let signup:UserInfo = signUpRef.value; 
    this.userArray.push(signup);
    signUpRef.reset();
  }

  saveData(cnameRef:any, cnoRef:any){
    let save:perInfo = {cName:cnameRef.value, cNo:cnoRef.value};
    this.perArray.push(save);
    console.log("arrayv data:",this.perArray);
  }

  click(){ 
    this.showTable = true;
  }
}
