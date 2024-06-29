import { Directive, EventEmitter, HostListener, OnInit, Output, inject } from '@angular/core';
import { NgNextWordPredictionService } from '../../services/next-word-prediction/ng-next-word-prediction.service';
import { Subject, debounceTime, switchMap, tap, catchError, of } from 'rxjs';
import { WordPredictResponse } from '../../models/word-predict-response';


@Directive({
  selector: '[nextWordPrediction]',
  standalone: true
})
export class NextWordPredictionDirective implements OnInit {
  @Output() inputChanged = new EventEmitter<WordPredictResponse>();
  private input$ = new Subject<string>();
  private debounceTime: number = 500;
  private nextWordPredictionService = inject(NgNextWordPredictionService);
  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.input$.next(inputElement.value);
  }


  ngOnInit(): void {
    this.input$
    .pipe(
      debounceTime(this.debounceTime),
      switchMap(value => 
        this.nextWordPredictionService.predictor({ inputs: value }).pipe(
          catchError(error => {
            console.error('Prediction API error:', error);
            return of([{ generated_text: '' }]);
          })
        )
      ),
      tap((value) => this.emitChange(value))
    )
    .subscribe();
  }

  private emitChange(value: any): void {
    this.inputChanged.emit(value[0]);
  }
}
