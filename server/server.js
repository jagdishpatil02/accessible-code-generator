const express = require("express");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const config = new Configuration({
  apiKey: "YOUR_API_KEY",
});

const openai = new OpenAIApi(config);

app.get("/joke", async (req, res) => {
  try {
    const prompt = `
			what is the capital of india?
		`;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 1,
    });

    console.log("response.data", response.data);
    const parsableJSONresponse = response.data.choices[0].text;
    console.log("parsableJSONresponse", parsableJSONresponse);

    // const parsedResponse = JSON.parse(parsableJSONresponse);
    // console.log("parsedResponse", parsedResponse);
    console.log(typeof parsableJSONresponse);
    res.write(parsableJSONresponse);
    res.end();
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(3000, () => {
  console.log("API server is running on port 3000");
});
