import { Component, OnInit } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private homeService: HomeService) {}
  answer: string | undefined;
  editableInputContent: string = '';

  isApiCallInProgress: boolean = false;

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
  getContentValue() {
    this.isApiCallInProgress = true;
    this.homeService.generateAccesibleCode(this.editableInputContent).subscribe(
      (res) => {
        const response = res as {
          choices: {
            message: {
              content: string;
            };
          }[];
        };

        if (res) {
          // Extract the HTML code and text content from the API response
          if (
            response.choices &&
            response.choices.length > 0 &&
            response.choices[0].message &&
            response.choices[0].message.content
          ) {
            let htmlCode = this.extractHtmlCode(
              response.choices[0].message.content.trim() ?? ''
            );
            let textContent = this.extractTextContent(
              response.choices[0].message.content.trim()
            );

            // Create the <pre> element for displaying the HTML code
            var preElement = document.createElement('pre');
            preElement.textContent = htmlCode;

            // Create the <p> element for displaying the text content
            var paragraphElement = document.createElement('p');
            paragraphElement.textContent = textContent;

            let editableOutputContent: HTMLElement | null =
              document.getElementById('editableOutputContent');

            if (editableOutputContent !== null) {
              editableOutputContent.innerText = '';
              editableOutputContent.innerHTML = '';
              editableOutputContent.appendChild(paragraphElement);
              editableOutputContent.appendChild(preElement);
            }
            this.isApiCallInProgress = false;
          }
        }
      },
      (error) => {
        // Handle error
        this.isApiCallInProgress = false;
        console.error('An error occurred:', error);
      }
    );
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
