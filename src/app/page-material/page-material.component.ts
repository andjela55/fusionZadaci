import { AuthService, UserData } from './../services/auth.service';
import { LoginService } from '../services/login.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from './user-model';

@Component({
  selector: 'app-page-material',
  templateUrl: './page-material.component.html',
  styleUrls: ['./page-material.component.css']
})
export class PageMaterialComponent implements OnInit {

  firstName="";
  lastName="";
  birthday:Date=new Date;

  username:string="";

  
  displayedColumns = ["firstName", "lastName", "dateOfBirth"];
  dataSource: MatTableDataSource<User>;
  users:User[]=[new User("test","test",new Date)];

  user!:UserData;

  @ViewChild(MatTable) table!: MatTable<any>;


  constructor(private loginService:LoginService,private authService:AuthService) { 
    this.dataSource = new MatTableDataSource<User>();
  }

  ngOnInit(): void {
    this.updateTable();
    this.authService.getUser().subscribe(res=>{
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

}
