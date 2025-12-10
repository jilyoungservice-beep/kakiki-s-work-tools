import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not set in process.env");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const draftClause = async (topic: string, context: string, contractType: string): Promise<string> => {
  const ai = getClient();
  if (!ai) return "错误：未检测到 API Key。";

  const prompt = `
    你是一名专业的法律助理，擅长起草中国商业合同（采购合同与货运代理合同）。
    请根据以下要求起草一段简明、专业、符合中国《民法典》规范的合同条款（中文）。
    
    合同类型: ${contractType}
    条款主题: ${topic}
    具体要求/上下文: ${context}
    
    请仅返回条款内容文本，不要包含任何 Markdown 格式、标题或额外解释。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text?.trim() || "无法生成条款。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "生成条款时出错，请检查网络或 API Key。";
  }
};