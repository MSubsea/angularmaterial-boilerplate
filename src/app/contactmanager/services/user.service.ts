import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../modules/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _users:BehaviorSubject<User[]>;
  private datastore: {users: User[]};
  constructor(private http:HttpClient) {
    this.datastore = { users: [] }
    this._users = new BehaviorSubject<User[]>([]);
  }

  get users():Observable<User[]> {
    return this._users.asObservable()
  }

  getUserById(id:number) {
    return this.datastore.users.find(user => user.id == id)
  }
 
  loadUsers() {
    const url= "https://angular-material-api.azurewebsites.net/users";
    return this.http.get<User[]>(url).subscribe(data => {
      this.datastore.users = data;
      this._users.next(Object.assign({}, this.datastore).users)
    })
  }
}
