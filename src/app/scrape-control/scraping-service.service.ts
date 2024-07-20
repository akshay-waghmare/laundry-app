import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {
  private scrapingUrl = `${environment.REST_API_SCRAPING_URL}start-scrape`;

  constructor(private http: HttpClient) {}

  startScrape(url: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.scrapingUrl, { url }, { headers });
  }
}