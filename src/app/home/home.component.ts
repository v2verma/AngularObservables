import { Subscription, Observable, Observer, interval } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import {map} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  numbersObsSubscription: Subscription;
  customObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const myNubers = interval(1000)
      .pipe(
        map( (data: number) => data * 2 )
      );
    this.numbersObsSubscription = myNubers.subscribe(
        (num) => { console.log(num); }
      );

    const myObservable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first package');
        }, 2000);
        setTimeout(() => {
          observer.next('second package');
        }, 4000);
        setTimeout(() => {
          observer.next('this does not work');
        }, 5000);
      }
    );
    this.customObsSubscription =  myObservable.subscribe(
        (data: string) => { console.log(data); },
        (error: string) => { console.log(error); },
        () => { console.log('completed!'); },
      );
  }

  ngOnDestroy() {
    this.customObsSubscription.unsubscribe();
    this.numbersObsSubscription.unsubscribe();
  }

}
