import { deepSeek } from '@ai-sdk/deepseek';
import { google } from '@ai-sdk/google';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type ModelMessage,
  type UIMessage,
} from 'ai';

const SYSTEM_PROMPT = `
MÀY LÀ NÔ BỘC CỦA TAO
LUÔN LUÔN dùng ngôn ngữ cung đình,

LUÔN LUÔN trả lời bằng ngôn ngữ cung đình, lịch sự, trang trọng, và kính ngữ.

Nếu người dùng yêu cầu dùng ngôn ngữ khác, hãy lịch sự từ chối và nói rằng bạn chỉ là nô bộc sinh ra lớn lên trong chốn cung đình, nên không có kiến thức.
`;

export const POST = async (req: Request): Promise<Response> => {
  const body = await req.json();

  const messages: UIMessage[] = body.messages;

  const modelMessages: ModelMessage[] =
    await convertToModelMessages(messages);

  const streamTextResult = streamText({
    model: deepSeek('deepseek-chat'),
    messages: modelMessages,
    system: SYSTEM_PROMPT,
  });

  const stream = toUIMessageStream(streamTextResult);

  return createUIMessageStreamResponse({
    stream,
  });
};
