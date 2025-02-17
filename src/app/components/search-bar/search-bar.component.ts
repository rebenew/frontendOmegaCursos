import { Component } from '@angular/core';
import { SearchService } from '../../services/search-service/search.service';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  standalone: true
})

export class SearchBarComponent {
  constructor(private searchService: SearchService) {}

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement). value;
    this.searchService.setSearchTerm(value);
  } 
} 
