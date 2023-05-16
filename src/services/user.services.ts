import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  addUser(data:any) : Observable<any> {
    return new Observable<any>(observer => {
      axios.post('http://localhost:8000/api/users/', data)
        .then(response => {
          observer.next(response.data);
          observer.complete();
        })
        .catch(error => {
          observer.error(error);
        });
    });
  }

}