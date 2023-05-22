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
  editableInputContent: string = '';
  editableOutputContent: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let nodeList: NodeListOf<Element> = document.querySelectorAll('.content');
    let nodeListArray: HTMLElement[] = Array.from(nodeList) as HTMLElement[];
    nodeListArray.forEach((element: any) => {
      element.addEventListener('paste', function (e: ClipboardEvent) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        document.execCommand('insertText', false, text);
      });
    });
  }

  // Function to get the value of the contenteditable div
  getContentValue() {
    const prompt =
      'return this html code according to Web Content Accessibility Guidelines -' +
      this.editableInputContent;
    const apiUrl =
      'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer test',
    });

    const requestBody = {
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.7,
      n: 1,
    };

    this.http.post(apiUrl, requestBody, { headers: headers }).subscribe(
      (response: any) => {
        this.editableOutputContent = response.choices[0].text.trim();
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    console.log('editableOutputContent after', this.editableOutputContent);
  }
}
