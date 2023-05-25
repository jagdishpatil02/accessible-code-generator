const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const config = new Configuration({
  apiKey: "API_KEY",
});

const openai = new OpenAIApi(config);

app.get("/generate-text", async (req, res) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "who won the ipl in 2018?" },
      ],
    });
    const parsableJSONresponse = response.data.choices[0].message;

    res.json(parsableJSONresponse);
    res.end();
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3000, () => {
  console.log("API server is running on port 3000");
});

// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: "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",
// });
// const openai = new OpenAIApi(configuration);

// async function myFunction() {
//   const completion = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: "who won the ipl in 2018?" },
//     ],
//   });
//   console.log(completion.data.choices[0].message);
// }
// myFunction();
