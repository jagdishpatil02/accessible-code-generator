import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Configuration, OpenAIApi } from 'openai';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpClient) {}
  answer: string | undefined;
  editableInputContent: string = '';
  response: any;
  isApiCallInProgress: boolean = false;

  readonly configuration = new Configuration({
    apiKey: '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',
  });
  readonly openai = new OpenAIApi(this.configuration);

  ngOnInit(): void {
    let contentlist: NodeListOf<Element> =
      document.querySelectorAll('.content');
    let contentlistArr: HTMLElement[] = Array.from(
      contentlist
    ) as HTMLElement[];
    contentlistArr.forEach((element: HTMLElement) => {
      element.addEventListener('paste', function (e: ClipboardEvent) {
        e.preventDefault();
        const text = e.clipboardData?.getData('text/plain');
        document.execCommand('insertText', false, text);
      });
    });
  }

  // Function to get the value of the contenteditable div
  public async getContentValue() {
    this.isApiCallInProgress = true;

    this.response = await this.openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant in web dev techonologies. Return html code according to Web Content Accessibility Guidelines(WCAG) ',
          },
          { role: 'user', content: this.editableInputContent },
        ],
      })
      .then((res: any) => {
        // Extract the HTML code and text content from the API response
        let htmlCode = this.extractHtmlCode(
          res.data.choices[0].message.content.trim()
        );
        let textContent = this.extractTextContent(
          res.data.choices[0].message.content.trim()
        );

        // Create the <pre> element for displaying the HTML code
        var preElement = document.createElement('pre');
        preElement.textContent = htmlCode;

        // Create the <p> element for displaying the text content
        var paragraphElement = document.createElement('p');
        paragraphElement.textContent = textContent;

        let editableOutputContent: HTMLElement | null = document.getElementById(
          'editableOutputContent'
        );

        if (editableOutputContent !== null) {
          editableOutputContent.appendChild(paragraphElement);
          editableOutputContent.appendChild(preElement);
        }
        this.isApiCallInProgress = false;
      })
      .catch((y) => {
        this.isApiCallInProgress = false;

        console.log('y: ', y);
      });
  }

  // Function to extract HTML code from the combined string
  extractHtmlCode(apiResponse: string) {
    var htmlCode = apiResponse.match(/```html\n(.*?)\n```/s);
    return htmlCode ? htmlCode[1] : '';
  }

  // Function to extract text content from the combined string
  extractTextContent(apiResponse: string) {
    var textContent = apiResponse.replace(/```html\n.*?\n```\n/s, '');
    return textContent.trim();
  }
}
