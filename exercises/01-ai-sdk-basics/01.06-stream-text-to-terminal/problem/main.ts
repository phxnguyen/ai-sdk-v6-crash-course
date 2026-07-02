
import { deepseek } from '@ai-sdk/deepseek';
import { streamText } from 'ai';

const model = deepseek('deepseek-chat');

const prompt =
  'Give me the first paragraph of a story about an imaginary planet.';

const stream = await streamText({
  model,
  prompt
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}
