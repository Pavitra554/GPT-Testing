import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const _default = "";

const generateAction = async (req: any, res: any) => {
  const { input } = req.body;
  console.log(` API : ${_default}${input}\n`);
  const prompt = `Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they'd come and take me away.\nYou: What is the meaning of life?\nMarv: I'm not sure. I'll ask my friend Google.\nYou: What time is it?\nYou:${input}:`;

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 250,
  });

  const response = baseCompletion.data.choices.pop();

  res.status(200).json({ output: response });
};

export default generateAction;
