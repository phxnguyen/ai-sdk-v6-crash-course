import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

const model = deepseek("deepseek-chat");


const prompt = 'What is the capital of Portugal?';
const result = await generateText({
  model,
  prompt,
});

console.log(result.text);

