import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';  
import { Router } from '@angular/router';  
import { ToastrService } from 'ngx-toastr'; 
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})
export class AddcontactComponent implements OnInit {

  submitted: boolean= false;  
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    telephone: new FormControl(''),
    gps_location: new FormControl(''),
    school: new FormControl('')
  });  

  constructor(private formBuilder: FormBuilder, private toastr: ToastrService,private contactService: ContactService,private router:Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({  
      "name": ["", Validators.required],  
      "email": ["", Validators.required],  
      "telephone": ["", Validators.required],  
      "gps_location": ["", Validators.required],  
      "school": ["", Validators.required]   
    });

  }
  onSubmit() {  
    this.submitted = true;  
    if (this.userForm.invalid) {  
      return;  
    }  
    this.contactService.addContact(this.userForm.value)  
      .subscribe( data => {  
        const message=data.message;
        if(message == "Phone number already existed."){
        this.toastr.info(message );  
        this.router.navigate(['listcontacts']);  
        }
        else{
        this.toastr.success(message );  
        this.router.navigate(['listcontacts']);  
        }
      });  
  }  
  Cancel()  
  {  
    this.router.navigate(['listcontacts']);  
  }
}
