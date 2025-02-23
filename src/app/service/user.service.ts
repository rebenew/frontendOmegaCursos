import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'assets/users.json';
  users: any;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  // getUserById(id: number): Observable<User | undefined> {
  //   return this.http.get<User[]>(this.usersUrl).pipe(
  //     map((users) => users.find(user => user.id === id))
  //   );
  // }

  addUser(user: User): Observable<User> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map((users: { id: any; first_name: string; last_name: string; user_type: string; email: string; password: string; }[]) => {
        const newUser = { ...user, id: users.length + 1 };
        users.push(newUser);
        return newUser;
      })
    );
  }

  updateUser(id: number, updatedUser: any): Observable<any> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map(users => {
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
          users[index] = { ...updatedUser, id };
        }
        return users[index];
      })
    );
  }

//   addCourse(course: Course): Observable<Course> {
//     return this.http.post<Course>(this.jsonUrl, course);
//   }
}
