import { Component,ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarRef,
  SimpleSnackBar,
} from '@angular/material/snack-bar';
import { slideInAnimation } from './modules/dashboard/dashboard-routing.animation.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
  providers: [MatSnackBar],
})
export class AppComponent {
  onlineEvent: Observable<Event> | undefined;
  offlineEvent!: Observable<Event>;
  subscriptions: Subscription[] = [];

  connectionStatusMessage!: string;
  connectionStatus!: string;
  isOffline: boolean = false;

  constructor(private _MatSnackBar: MatSnackBar,private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.onlineEvent = fromEvent(window, 'online');
    this.offlineEvent = fromEvent(window, 'offline');

    this.subscriptions.push(
      this.onlineEvent.subscribe(() => {
        this.connectionStatusMessage = 'Back to online';
        this.connectionStatus = 'online';
        this.isOffline = false;
        this.showSnackbar(this.connectionStatusMessage, 3000);
      })
    );

    this.subscriptions.push(
      this.offlineEvent.subscribe(() => {
        this.connectionStatusMessage =
          'Connection lost😢';
        this.connectionStatus = 'offline';
        this.isOffline = true;
        this.showSnackbar(this.connectionStatusMessage);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  showSnackbar(message: string, duration: number = 0) {
    const snackBarRef: MatSnackBarRef<SimpleSnackBar> = this._MatSnackBar.open(
      message,
      'Close',
      {
        duration: duration,
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.isOffline = false;
      document.location.reload()
    });
  }

  getAnimationData(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
