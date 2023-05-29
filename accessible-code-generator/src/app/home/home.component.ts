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
  readonly configuration = new Configuration({
    apiKey: 'your_key',
  });
  readonly openai = new OpenAIApi(this.configuration);

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
  public async getContentValue() {
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
        console.log(res);
        console.log(res.data.choices[0].message.content.trim());
        // this.editableOutputContent = res.data.choices[0].message.content.trim();
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

        let editableOutputContent: any = document.getElementById(
          'editableOutputContent'
        );

        editableOutputContent.appendChild(paragraphElement);
        editableOutputContent.appendChild(preElement);
      })
      .catch((y) => {
        console.log('y: ', y);
      });
  }

  // Function to extract HTML code from the combined string
  extractHtmlCode(apiResponse: any) {
    var htmlCode = apiResponse.match(/```html\n(.*?)\n```/s);
    return htmlCode ? htmlCode[1] : '';
  }

  // Function to extract text content from the combined string
  extractTextContent(apiResponse: any) {
    var textContent = apiResponse.replace(/```html\n.*?\n```\n/s, '');
    return textContent.trim();
  }
}
