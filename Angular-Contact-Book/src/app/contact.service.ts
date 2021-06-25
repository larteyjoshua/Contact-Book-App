import { Injectable } from '@angular/core';
import {  
  HttpClient,  
  HttpHeaders  
} from '@angular/common/http';  
import {  
  Observable  
} from 'rxjs'; 
import { Contact } from './model/contact';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  apiUrl: string = "http://localhost:5000/";  
  constructor(private http: HttpClient) {}

  addContact(contact:Contact): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(contact);
    console.log(body)
    return this.http.post(this.apiUrl + 'addcontact', body,{'headers':headers})
  }
getContacts(): Observable < Contact[] > {  
  return this.http.get < Contact[] > (`${this.apiUrl}/readallcontacts`);  
}  

deleteContact(id: string): Observable < string > {  
  const httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json'  
      })  
  };  
  return this.http.delete < string > (`${this.apiUrl}/contacts/delete/` + id, httpOptions);  
}

updateContact(contact: Contact): Observable < any > {  
  console.log(contact);
  const httpOptions = {  
      headers: new HttpHeaders({  
          'Content-Type': 'application/json'  
      })  
  };  
  return this.http.put < string > (`${this.apiUrl}contacts/update/`+ contact.id,JSON.stringify(contact) , httpOptions);  
} 

}
