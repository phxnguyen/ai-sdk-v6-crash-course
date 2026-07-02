import { deepseek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import { generateText, Output, streamText } from 'ai';
import z from 'zod';

const model = deepseek('deepseek-chat');

const stream = streamText({
  model,
  prompt:
    'Give me the first paragraph of a story about an imaginary planet.',
});

for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}

const finalText = await stream.text;

// TODO: Replace this with a call to generateText, passing:
// - The model, same as above
// - The prompt, asking for facts about the imaginary planet,
//   passing in the finalText as the story
// - The output, which should be Output.object({}), passing
//   the schema: z.object({
//     facts: z.array(z.string()).describe('The facts about the imaginary planet. Write as if you are a scientist.'),
//   })
const factsResult = await generateText({
  model,
  prompt: `Give me the first paragraph of a story about an imaginary planet. Here is the story: ${finalText}`,
  output: Output.object({
    schema: z.object({
      facts: z.array(z.string()).describe('The facts about the imaginary planet. Write as if you are a scientist.'),
    }),
  }),
});


console.log(factsResult.output);
