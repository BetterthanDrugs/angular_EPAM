import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
  filter,
  takeUntil,
  map,
  Observable,
  Subject,
  switchMap,
  debounceTime,
} from 'rxjs';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  destroy$: Subject<boolean> = new Subject<boolean>();
  charactersResults$: Observable<any>;
  planetAndCharactersResults$: Observable<any>;
  isLoading: boolean = false;

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element): void {
    // 1.1. Add functionality to changeCharactersInput method. Changes searchTermByCharacters Subject value on input change.
    // YOUR CODE STARTS HERE
    const inputValue: string = element.target.value;
    this.searchTermByCharacters.next(inputValue);
    // YOUR CODE ENDS HERE
  }

  initCharacterEvents(): void {
    // 1.2. Add API call on each user input. Use mockDataService.getCharacters - to make get request.

    // 2. Since we don't want to spam our service add filter by input value and do not call API until a user enters at least 3 chars.

    // 3. Add debounce to prevent API calls until user stop typing.
    this.charactersResults$ = this.searchTermByCharacters.pipe(
      // YOUR CODE STARTS HERE
      filter((value) => value.length >= 3),
      debounceTime(1500),
      switchMap((value) => this.mockDataService.getCharacters(value)),
      takeUntil(this.destroy$)
    );
    // YOUR CODE ENDS HERE
  }

  loadCharactersAndPlanet(): void {
    // 4. On clicking the button 'Load Characters And Planets', it is necessary to process two requests and combine the results of both requests into one result array. As a result, a list with the names of the characters and the names of the planets is displayed on the screen.
    // Your code should looks like this: this.planetAndCharactersResults$ = /* Your code */
    // YOUR CODE STARTS HERE
    this.planetAndCharactersResults$ = combineLatest([
      this.mockDataService.getCharacters(),
      this.mockDataService.getPlatents(),
    ]).pipe(
      map((response) => {
        return response.reduce((acc, val) => acc.concat(val), []);
      })
    );
    // YOUR CODE ENDS HERE
  }

  initLoadingState(): void {
    /* 5.1. Let's add loader logic to our page. For each request, we have an observable that contains the state of the request. When we send a request the value is true, when the request is completed, the value becomes false. You can get value data with mockDataService.getCharactersLoader() and mockDataService.getPlanetLoader().
    
    - Combine the value of each of the streams.
    - Subscribe to changes
    - Check the received value using the areAllValuesTrue function and pass them to the isLoading variable. */
    // YOUR CODE STARTS HERE
    combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe((response) => {
        this.isLoading = response.every((item) => !item) ? false : true;
      });
    // YOUR CODE ENDS HERE
  }

  ngOnDestroy(): void {
    // 5.2 Unsubscribe from all subscriptions
    // YOUR CODE STARTS HERE
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    // YOUR CODE ENDS HERE
  }
}
