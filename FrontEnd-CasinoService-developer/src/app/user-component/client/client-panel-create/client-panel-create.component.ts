import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { AutoGeneratePasswordService } from 'src/app/core/service/auto-generate-password.service';
import { UserRole } from 'src/app/core/service/user-roles.enum';
import { ToastService } from 'src/app/toast.service';
import { Client } from '../client-panel.interface';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client-panel-create',
  templateUrl: './client-panel-create.component.html',
  styleUrls: ['./client-panel-create.component.scss']
})
export class ClientPanelCreateComponent implements OnInit {

  clientAddForm: FormGroup;
  submitted = false;
  isClientLoading =false;
  agentId;
  agentData
  serverErrors=null;
  constructor(
              private fb: FormBuilder,
              private route:ActivatedRoute,
              private router:Router,
              private clientService:ClientService,
              private authService:AuthService,
              private toastService:ToastService,
              private autoGenerate:AutoGeneratePasswordService,

            ) { }

  ngOnInit(): void {
    if(UserRole.AGENT == this.authService.getCurrentUserRole()){
      this.agentId = this.clientService.agentId;
      this.clientService.getSuperClientData(this.agentId).subscribe({
        next:(res)=>{
        this.agentData = res;
        this.addClientValidation();
        this.toastService.show('Data Added SuccessFully', { classname: 'bg-success text-light', delay: 1000 });
      },error:(e)=>{
        console.log(e)
      }
    })
    }else{
      this.agentId = this.route.snapshot.paramMap.get('id');
      this.clientService.getSuperClientData(this.agentId).subscribe({
        next:(res)=>{
        this.agentData = res;
        this.addClientValidation()
      },error:(e)=>{
        console.log(e)
      }
    })
    }
  }

  addClientValidation(){
    this.clientAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("(^[A-Za-z0-9 ]+\$)")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contactNo: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      currentLimit: ['', [Validators.required, Validators.min(0),Validators.max(this.agentData.currentLimit)]],
      share: ['', [Validators.required, Validators.min(0), Validators.max(this.agentData.share)]],
      cShare: ['', [Validators.required, Validators.min(0), Validators.max(this.agentData.cshare)]],
      mobileShare: ['', [Validators.required, Validators.min(0), Validators.max(this.agentData.mobileShare)]],
      mc: ['', [Validators.required, Validators.min(0), Validators.max(this.agentData.mc)]],
      sc: ['', [Validators.required, Validators.min(0), Validators.max(this.agentData.sc)]],
      cc: ['', [Validators.required, Validators.min(0), Validators.max(this.agentData.cc)]],
      // shareMaster:['',[Validators.required,Validators.min(0),Validators.max(100)]],
      // cShareMaster:['',[Validators.required,Validators.min(0),Validators.max(100)]],
      // msMaster:['',[Validators.required,Validators.min(0),Validators.max(100)]],
      // shareSuper:['100'],
      cShareSuper:['0'],
      mobileShareSuper:['100'],
      cshareSuper:['0'],
      casinoCheck:[true],
      shareStatus:[false]
  });
  }
  onSubmit()
  {
    this.submitted = true;
    if (this.clientAddForm.valid) {
      const formData: Client = this.clientAddForm.value;
      this.clientService.createClient(this.agentId,formData)
              .subscribe({
                  next: (v) => {
                    this.isClientLoading= false;
                    this.router.navigate(['/agent']);
                    console.log(v)
                  },
                  error: (e) => {
                    console.error(e)
                    console.error(e.error.msg);
                    this.isClientLoading= false;
                    if (e.error && e.error.errors) {
                      this.serverErrors = e.error.errors;
                    }
                  },
                  complete: () => {
                    this.isClientLoading= false;
                    console.info('complete')
                  }
              });

  }
}
generatePassword(){
  const randomPassword = this.autoGenerate.generateRandomPassword(8);
  this.clientAddForm.get('password').setValue(randomPassword);
}
}
