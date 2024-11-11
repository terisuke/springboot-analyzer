// src/services/difyApi.ts
import axios from 'axios';

interface DifyResponse {
  answer: string;
  conversation_id?: string;
  // 必要に応じて他のレスポンスフィールドを追加
}

export const analyzeFunctionWithDify = async (
  className: string,
  methodName: string
): Promise<string> => {
  if (!process.env.REACT_APP_DIFY_API_KEY) {
    throw new Error('Dify API key is not configured');
  }

  try {
    const response = await axios.post<DifyResponse>(
      process.env.REACT_APP_DIFY_API_URL || 'https://api.dify.ai/v1/chat-messages',
      {
        inputs: {},
        query: `以下のJavaメソッドの機能を200文字程度で説明してください：\nクラス: ${className}\nメソッド: ${methodName}`,
        response_mode: "streaming",
        user: "user"
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.answer || '分析結果を取得できませんでした。';
  } catch (error) {
    console.error('Dify API Error:', error);
    throw new Error('予期せぬエラーが発生しました。');
  }
};