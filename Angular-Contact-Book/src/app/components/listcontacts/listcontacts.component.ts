import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from 'src/app/contact.service';
import { Contact} from 'src/app/model/contact';

@Component({
  selector: 'app-listcontacts',
  templateUrl: './listcontacts.component.html',
  styleUrls: ['./listcontacts.component.scss']
})
export class ListcontactsComponent implements OnInit {
   counts:string;
  public contacts: Contact[];  
  public columnDefs: ColDef[];  
  // gridApi and columnApi  
  private api: GridApi;  
  private columnApi: ColumnApi;

  constructor(private contactService: ContactService, private router: Router, private toastr: ToastrService) {  
    this.columnDefs = this.createColumnDefs();  
}  

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {  
      this.contacts = data['contacts']
       this. counts= data['count']
  }) 
  }
  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space  
  onGridReady(params): void {  
    this.api = params.api;  
    this.columnApi = params.columnApi;  
    this.api.sizeColumnsToFit();  
}  
 // create column definitions  
 private createColumnDefs() {  
  return [ {  
    headerName: 'Id',  
    field: 'id',  
    filter: true,  
    enableSorting: true,  
    editable: true,  
    sortable: true  
}, 
     { headerName: 'Name',  
      field: 'name',  
      filter: true,  
      enableSorting: true,  
      editable: true,  
      sortable: true  
  }, {  
      headerName: 'Email',  
      field: 'email',  
      filter: true,  
      editable: true,  
      sortable: true,
      cellRenderer: '<a href="edit-user">{{email}}</a>'   
  }, {  
      headerName: 'Telephone',  
      field: 'telephone',  
      filter: true,  
      sortable: true,  
      editable: true,  
      
  }, {  
      headerName: 'GPS Location',  
      field: 'gps_location',  
      filter: true,  
      editable: true,  
      sortable: true  
  }, {  
      headerName: 'School',  
      field: 'school',  
      filter: true,  
      editable: true  
  }]  
}  
status: any; 
//Update user  
editContact() {  
  debugger;  
  const selectedcell = this.api.getEditingCells();  
  if (this.api.getSelectedRows().length == 0) {  
      this.toastr.error("error", "Please select a contact for update");  
      return;  
  }  
  var selectedrow = this.api.getSelectedRows();
  console.log(selectedrow)
  this.contactService.updateContact(selectedrow[0]).subscribe(data => {  
      const message= data['message'];
      this.toastr.success( message,);  
      this.ngOnInit(); 
      this.api.refreshCells(); 
  });  
}
 //Delete user  
 deleteContact() {  
    
  var selectedRows = this.api.getSelectedRows();  
  if (selectedRows.length == 0) {  
      this.toastr.error("error", "Please select a User for deletion");    
  }  
  this.contactService.deleteContact(selectedRows[0].id).subscribe(data => {  
    const message=data['message'];
    this.toastr.success( message);  
    this.ngOnInit();  
    this.api.refreshCells();  
});
}
AddContact() {  
  this.router.navigate(['addContact']);  
} 

}
