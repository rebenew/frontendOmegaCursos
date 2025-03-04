import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoUserService {
  constructor() { }

    private openInfoUserSubject = new BehaviorSubject<boolean>(false);
    openInfoUser = this.openInfoUserSubject.asObservable();

    toggleOpenInfoUser(){
      this.openInfoUserSubject.next(!this.openInfoUserSubject.value)
    }
}
