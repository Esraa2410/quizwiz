import { Component, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MatSnackBar],
})
export class AppComponent {
  onlineEvent!: Observable<Event>;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage!: string;
  contectionStatus!: string;

  constructor(private _MatSnackBar: MatSnackBar) {  }

  ngOnInit(): void {
    this.checkoutInternetConnections();
  }

  checkoutInternetConnections(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(this.onlineEvent.subscribe((e) => {
      this.connectionStatusMessage = 'Back Online ❤';
      this.contectionStatus = 'online'
      this.showStanckBar(this.connectionStatusMessage, 3000)
    }))

    this.subscriptions.push(this.offlineEvent.subscribe((e) => {
      this.connectionStatusMessage = 'Connection Lost😢';
      this.contectionStatus = 'offline';
      this.showStanckBar(this.connectionStatusMessage, 3000)
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    })
  }

  showStanckBar(message: string, closeDuration: number = 0) {
    this._MatSnackBar.open(message, 'Close', {
      duration: closeDuration
    })
  }

  @HostListener('input', ['$event']) onKeyboardDown(e: KeyboardEvent) {
    console.log(e.key)
  }
}
