import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  updateUser(user: User): Observable<User> {
    return this.http.patch(
      `https://dev-s4yp87ql.us.auth0.com/api/v2/users/${user.user_id}`,
      user
    );
  }
}
