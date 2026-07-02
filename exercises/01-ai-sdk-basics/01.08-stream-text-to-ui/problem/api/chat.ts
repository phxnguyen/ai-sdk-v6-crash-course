import { deepseek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type ModelMessage,
  type UIDataTypes,
  type UIMessage,
  type UITools,
} from 'ai';

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] = await convertToModelMessages(messages);

  
  const streamTextResult = streamText({
    model: deepseek('deepseek-chat'),
    messages: modelMessages,
  });

  const stream = toUIMessageStream(streamTextResult);

  return createUIMessageStreamResponse({
    stream,
  });
};

