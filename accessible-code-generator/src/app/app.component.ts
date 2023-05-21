import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OpenAIApi, Configuration } from 'openai';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  answer: string | undefined;
  contentList:any;
  contentListArr:any;

  
  constructor(private http: HttpClient) {}

  getAnswer() {
    const prompt =
      'return this html code in accessible standard - <button>HI</button> ';
    const apiUrl =
      'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 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',
    });

    const requestBody = {
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
      n: 1,
    };

    this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
      (response: any) => {
        this.answer = response.choices[0].text.trim();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  ngOnInit(): void {
   this.contentList = document.querySelectorAll('.content') as NodeList;
   this.contentListArr = Array.from(this.contentList);

    console.log(this.contentListArr)
    this.contentListArr.forEach((element: any )=> {
      element.addEventListener('paste', function (e: ClipboardEvent) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        document.execCommand('insertText', false, text);
      });
    });
  
  }
}
