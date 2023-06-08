import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  generateAccesibleCode(content: string) {
    const body = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant in web development techonologies. Return accessible html code with description according to Web Content Accessibility Guidelines(WCAG) ',
        },
        { role: 'user', content: content },
      ],
    };
    return this.http.post(this.apiUrl, body);
  }
}
