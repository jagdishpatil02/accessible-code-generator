# Accessible Code Generator

The Accessible Code Generator is a powerful tool designed to assist developers in suggesting accessible code changes based on WCAG (Web Content Accessibility Guidelines) standards. This tool utilizes the gpt-3.5-turbo model developed by OpenAI.

![Accessible Code Generator](https://github.com/jagdishpatil02/accessible-code-generator/assets/18285635/e9c8ed35-bfba-4b74-92fc-160782a3509c)

## How to Use

1. Begin by pasting your code on the left side of the interface.
2. Click on the "Accessible Code" button to trigger the code analysis process.
3. The Accessible Code Generator will then provide you with suggestions and recommendations for improving the accessibility of your code on the right side of the interface.
4. Review the suggestions and apply the recommended changes to enhance the accessibility of your codebase.

## How to Run the Project

1. Clone the repository.

2. Navigate to the accessible code generator folder.

3. Run `npm install`.

4. Run `ng serve` (Ensure that you have the Angular CLI installed on your machine. To install the Angular CLI, use the command `npm install -g @angular/cli`).

5. Go to auth.interceptor.ts file and add replace your `const token = 'YOUR_API_KEY'` with your own API Key that you generated from https://platform.openai.com/account/api-keys 


## Tech Stack

The Accessible Code Generator is built using the following technologies:

- Angular
- TypeScript
- OpenAI API (gpt-3.5-turbo model)
