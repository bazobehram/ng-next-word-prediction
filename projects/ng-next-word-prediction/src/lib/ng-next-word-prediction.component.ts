import { Component } from "@angular/core";
import { NextWordPredictionDirective } from "./directives/next-word-prediction/next-word-prediction.directive";
import { WordPredictResponse } from "./models/word-predict-response";


@Component({
  selector: "lib-ng-next-word-prediction",
  standalone: true,
  imports: [NextWordPredictionDirective],

  templateUrl: "./ng-next-word-prediction.component.html",
  styleUrls: ["./ng-next-word-prediction.component.scss"],
})
export class NgNextWordPredictionComponent  {
  prediction: string = "";
  userInput: string = "";
  remainingPrediction: string = "";

  onInputChanged(event: WordPredictResponse): void {
    const fullPrediction = this.extractText(event.generated_text);
    const [nextWord, ...remaining] = fullPrediction.split(" ");
    this.prediction = nextWord;
    this.remainingPrediction = remaining.join(" ");
  }

  extractText(text: string): string {
    return text.replace(this.userInput, "").trim();
  }

  updateUserInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.userInput = inputElement.value;
  }

  onKeydown(event: KeyboardEvent): void {
    const inputElement = event.target as HTMLInputElement;
    if (event.key === "Tab" && this.prediction) {
      event.preventDefault();
      inputElement.value = `${inputElement.value} ${this.prediction}`;
      this.userInput = inputElement.value;
      const [nextWord, ...remaining] = this.remainingPrediction;
      this.prediction = nextWord || "";
      this.remainingPrediction = remaining.join(" ");
    }
  }
}
