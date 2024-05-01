import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { convertByteToString, convertToJSON } from './utils.js';

const client = new BedrockRuntimeClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function ask(prompt) {
  const params = {
    modelId: 'amazon.titan-text-express-v1',
    body: JSON.stringify({
      inputText: prompt,
      textGenerationConfig: {
        temperature: 0.7,
        topP: 0.9,
        maxTokenCount: 800,
      },
    }),
    accept: 'application/json',
    contentType: 'application/json',
  };
  console.log('Prompt:', prompt);
  const command = new InvokeModelCommand(params);
  const response = await client.send(command);
  const decodedString = convertByteToString(response?.body);
  const data = convertToJSON(decodedString);
  return data?.results[0]?.outputText;
}

ask('Give me names of 5 fruits').then((response) => console.log("Answer:", response));
