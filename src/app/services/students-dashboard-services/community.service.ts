import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Community } from '../../interfaces/students-dashboard-interfaces/community.interface';

@Injectable({ providedIn: 'root' })
export class CommunityService {
  private dataUrl: string = 'assets/students-dashboard-data/students-list.json';
  constructor(private http: HttpClient) {}

  getCommunityInfo(): Observable<Community[]> {
    return this.http.get<Community[]>(this.dataUrl);
  }
}
