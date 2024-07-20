import { Component, OnInit } from '@angular/core';
import { ScrapingService } from './scraping-service.service';

@Component({
  selector: 'app-scrape-control',
  templateUrl: './scrape-control.component.html',
  styleUrls: ['./scrape-control.component.css']
})
export class ScrapeControlComponent {
  constructor(private scrapingService: ScrapingService) {}

  startScrape(url: string): void {
    this.scrapingService.startScrape(url).subscribe(
      response => {
        console.log('Scraping started:', response);
      },
      error => {
        console.error('Error starting scraping:', error);
      }
    );
  }
}
