export interface WordPredictResponse {
   readonly generated_text: string;
  }
  
 export interface WordPredictRequest {
    readonly inputs: string;
  }