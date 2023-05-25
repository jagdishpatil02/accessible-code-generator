import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  answer: string | undefined;
  editableInputContent: string = '';
  editableOutputContent: string = '';
  ngOnInit(): void {
    let contentlist: NodeListOf<Element> =
      document.querySelectorAll('.content');
    let contentlistArr: HTMLElement[] = Array.from(
      contentlist
    ) as HTMLElement[];
    contentlistArr.forEach((element: any) => {
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

    const requestBody = {
      prompt: prompt,
      max_tokens: 4096,
      temperature: 0.7,
      n: 1,
    };

    this.http.post(apiUrl, requestBody).subscribe(
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
