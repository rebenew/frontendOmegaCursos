import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Community } from '../../interfaces/students-dashboard-interfaces/community.interface';
import { CommunityService } from '../../services/students-dashboard-services/community.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-community',
  imports: [CommonModule, RouterLink],
  templateUrl: './community.component.html',
  styleUrl: './community.component.scss',
})
export class CommunityComponent implements OnInit {
  public community: Community[] = [];

  constructor(private CommunityService: CommunityService) {}

  ngOnInit(): void {
    this.CommunityService.getCommunityInfo().subscribe((data) => {
      this.community = data;
    });
  }
}
