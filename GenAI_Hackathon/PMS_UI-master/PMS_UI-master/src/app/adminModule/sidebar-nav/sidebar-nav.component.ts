import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.css']
})
export class SidebarNavComponent implements OnInit {


  title: string;
  @Output() titleChange: EventEmitter<any> = new EventEmitter();

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    // this.title = 'child title';
    // this.titleChange.emit(this.title);
    this.title=this.adminService.getTitle();
  }

  changeTitle(title:string){
    this.adminService.setTitle(title);
  }

}
