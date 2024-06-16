import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private visibilitySource = new BehaviorSubject<boolean>(true);
  visibility$ = this.visibilitySource.asObservable();

  toggleVisibility() {
    const currentVisibility = this.visibilitySource.value;
    this.visibilitySource.next(!currentVisibility);
  }

  setVisibility(visible: boolean) {
    this.visibilitySource.next(visible);
  }
}
