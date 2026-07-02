// Requires an DEEPSEEK_API_KEY environment variable in .env
import {deepseek} from '@ai-sdk/deepseek'

const model = deepseek('deepseek-chat');

console.dir(model, { depth: null });
    