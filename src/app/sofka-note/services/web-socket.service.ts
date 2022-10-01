import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private BASE_URL: string = environment.baseUrlWS;
  private socket!: WebSocketSubject<unknown>;

  constructor() {}

  conect(aggregateId: string): Observable<WebSocketSubject<unknown>> {
    this.socket = webSocket(`${this.BASE_URL}/${aggregateId}`);
    return this.socket as Observable<WebSocketSubject<unknown>>;
  }
  close() {
    this.socket.unsubscribe();
  }
}
