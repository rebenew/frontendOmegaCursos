import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidecontentService {

  constructor() { }

  private activateSideContentSubject = new BehaviorSubject<boolean>(false);
  activateSideContent = this.activateSideContentSubject.asObservable();

  toggleactivateSideContent(){
    this.activateSideContentSubject.next(!this.activateSideContentSubject.value)
  }
}
