import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgNextWordPredictionComponent } from "../../projects/ng-next-word-prediction/src/lib/ng-next-word-prediction.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, NgNextWordPredictionComponent],
})
export class AppComponent {
  title = 'ng-next-word-prediction-app';
}
