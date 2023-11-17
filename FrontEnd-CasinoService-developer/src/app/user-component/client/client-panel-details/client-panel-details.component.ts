import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { UserRole } from 'src/app/core/service/user-roles.enum';
import { ToastService } from 'src/app/toast.service';
import { ClientApiDataResponse } from '../client-panel.interface';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-panel-details',
  templateUrl: './client-panel-details.component.html',
  styleUrls: ['./client-panel-details.component.scss']
})
export class ClientPanelDetailsComponent implements OnInit {
  data: ClientApiDataResponse;
  subId =[];
  superId :number[]=[];
  selectedValue: string = '';
  currentUserRole= UserRole.AGENT;
  isBodyLoading:boolean=false;
  UserRole;
  constructor(
    private clientService:ClientService,
    private router:Router,
    public toastService:ToastService,
    private authService:AuthService) {
    this.UserRole = this.authService.getCurrentUserRole();

  }

  ngOnInit(): void {
    this.loadClientData(1)
  }
  loadClientData(page: number) {
    this.isBodyLoading =true;
    this.clientService.getData(page-1).subscribe(
      res => {
        this.isBodyLoading =false;
        this.data = res;
        this.clientService.updateData(res);
        this.toastService.show('Data Fetch Success', { classname: 'bg-success text-light', delay: 1000 });
      }
    );
  }
  getSingleId(id:any){
    this.router.navigate([`/client-panel/modify-client-panel/${id}`])
  }

}
