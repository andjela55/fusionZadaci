import { Store } from './../models/store.model';
import { StoreService } from './../services/store.service';
import { AuthService, UserData } from './../services/auth.service';
import { LoginService } from '../services/login.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from './user-model';
import { CommonComponent } from '../services/router-guard.guard';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-page-material',
  templateUrl: './page-material.component.html',
  styleUrls: ['./page-material.component.css']
})
export class PageMaterialComponent implements OnInit,CommonComponent {

  firstName="";
  lastName="";
  birthday:Date=new Date;

  username:string="";

  
  displayedColumns = ["firstName", "lastName", "dateOfBirth"];
  dataSource: MatTableDataSource<User>;
  users:User[]=[new User("test","test",new Date)];

  user!:UserData;

  @ViewChild(MatTable) table!: MatTable<any>;
  response:Array<Store>=new Array<Store>();

  constructor(private loginService:LoginService,private authService:AuthService,private dataService:StoreService) { 
    this.dataSource = new MatTableDataSource<User>();
  }
  canDeactivate():boolean | Observable<boolean> | Promise<boolean>{
    return of(true);
  }
  canLogout():Observable<boolean>{
    return of(true);
  }

  ngOnInit(): void {
    this.updateTable();
    this.authService.getUser().subscribe(res=>{
      if(res!=null)
      this.user=res.Data;
    })
  }

  onSubmit(){
    this.users.push(new User(this.firstName,this.lastName,this.birthday));
    this.table.renderRows();
  }
  updateTable(){
    this.dataSource.data=this.users;
  }
  OnDateChange(value:Date):void{
    this.birthday=value;

  }
  onLogout(){
    this.loginService.logout();

  }
  callApi(){
    /*this.dataService.getStores().subscribe(res=>{
      this.response=res;
    })*/
    this.loginService.login("devops","bierhaus").subscribe(res=>{})
  }
  callApi2(){
    this.dataService.getStores().subscribe(res=>{});
  }

}
