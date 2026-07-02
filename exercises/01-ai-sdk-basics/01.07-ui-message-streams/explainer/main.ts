import { deepseek } from '@ai-sdk/deepseek';
import { streamText, toUIMessageStream } from 'ai';

const model = deepseek('deepseek-chat');

const stream = streamText({
  model,
  prompt: 'Give me a sonnet about a cat called Đen.',
});

for await (const chunk of toUIMessageStream(stream)) {
  console.log(chunk);
}
