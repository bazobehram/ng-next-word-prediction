import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { WordPredictRequest } from "../../models/word-predict-response";


@Injectable({
  providedIn: "root",
})
export class NgNextWordPredictionService {
  public headers = new HttpHeaders({
    Authorization: `Bearer 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`,
  });
  private url: string =
    "https://api-inference.huggingface.co/models/allenai/t5-small-next-word-generator-qoogle";
    http = inject(HttpClient);

  public predictor(inputs: WordPredictRequest) {
    return this.http.post<Response[]>(this.url, inputs, {
      headers: this.headers,
    });
  }
}
