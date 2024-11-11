// src/services/difyApi.ts
import axios from 'axios';

interface DifyResponse {
  event: string;
  conversation_id: string;
  message_id: string;
  answer: string;
}

const DIFY_API_URL = process.env.REACT_APP_DIFY_API_URL || '';
const DIFY_API_KEY = process.env.REACT_APP_DIFY_API_KEY || '';

console.log('API URL:', DIFY_API_URL);
console.log('API Key exists:', !!DIFY_API_KEY);

export const analyzeFunctionWithDify = async (
  className: string,
  methodName: string,
  sourceCode: string
): Promise<string> => {
  try {
    const response = await axios.post(
      DIFY_API_URL,
      {
        inputs: {},
        query: `以下のJavaメソッドの機能を解説してください：
                クラス名: ${className}
                メソッド名: ${methodName}
                ソースコード:
                ${sourceCode}`,
        response_mode: "streaming",
        conversation_id: "",
        user: "code-analyzer"
      },
      {
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // StreamingレスポンスをStringにパースする
    let fullAnswer = '';
    const lines = (response.data as string).split('\n');
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        try {
          const data = JSON.parse(line.slice(6)) as DifyResponse;
          fullAnswer += data.answer;
        } catch (e) {
          console.error('Failed to parse streaming response:', e);
        }
      }
    }
    return fullAnswer;
  } catch (error) {
    console.error('Dify API Error:', error);
    throw new Error('分析に失敗しました');
  }
};