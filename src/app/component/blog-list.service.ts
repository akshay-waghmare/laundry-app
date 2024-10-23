import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogListService {
  private blog_list_url = environment.REST_API_URL + 'cricket-data/' + 'blog-posts';

  constructor(private http: HttpClient) {}

  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.blog_list_url}`);
  }
}
