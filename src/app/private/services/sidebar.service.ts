// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private _isClosed = new BehaviorSubject<boolean>(true); //Hide sidebar by default

  get isClosed() {
    return this._isClosed.asObservable();
  }

  toggle() {
    this._isClosed.next(!this._isClosed.value);
  }
}
