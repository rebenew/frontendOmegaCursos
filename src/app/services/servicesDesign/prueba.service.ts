import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PruebaService {

  constructor() { }

  private PruebaSubject = new BehaviorSubject<boolean>(false);
  prueba = this.PruebaSubject.asObservable();

  togglePrueba(){
    this.PruebaSubject.next(!this.PruebaSubject.value)
  }
}
