import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
  private menuOpenSubject = new Subject<boolean>();
  menuOpen = this.menuOpenSubject.asObservable();

  constructor(){}

  stateMenuOpen(valor: boolean){
    this.menuOpenSubject.next(valor);
  }
}
