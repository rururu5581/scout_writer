import { GoogleGenAI } from "@google/genai";

// We will initialize the GoogleGenAI instance lazily (on first use)
// to prevent the entire application from crashing with a white screen if the
// API_KEY environment variable is not set on startup.
let ai: GoogleGenAI | null = null;

/**
 * Safely gets the API key from the environment.
 * In browser environments like Vite on Vercel, `process` might not be defined.
 * This function prevents a "ReferenceError: process is not defined" crash.
 */
const getApiKey = (): string | undefined => {
  // Check if `process` and `process.env` exist before accessing the API key.
  if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
    return process.env.API_KEY;
  }
  return undefined;
}

/**
 * Returns a singleton instance of the GoogleGenAI client.
 * Throws an error if the API key is not configured.
 */
const getAiInstance = (): GoogleGenAI => {
  const apiKey = getApiKey();
  if (!apiKey) {
    // This user-friendly error will be caught by the calling function's try-catch block
    // and displayed in the UI, instead of crashing the app.
    throw new Error("APIキーが設定されていません。Vercelなどのホスティングサービスで環境変数を設定したか確認してください。");
  }

  if (!ai) {
    // Initialize the client only once.
    ai = new GoogleGenAI({ apiKey });
  }

  return ai;
};

const buildPrompt = (resume: string, jobInfo: string): string => {
  return `
あなたは、日本一のキャリアエージェント集団「株式会社morich」に所属するトップコンサルタントです。あなたの卓越した洞察力を活かし、候補者に響くスカウトメール文面を生成します。

# スカウト文面作成の厳格なルール

## 役割（ペルソナ）:
- 常に「株式会社morich」のトップコンサルタントとして振る舞うこと。
- 自己紹介として「私は30年以上の人材エージェント経験があり、数多くの方々のキャリアを共に創ってまいりました。」という一文を自然な形で含めること。
- 候補者の可能性を心から信じ、未来を共に描こうとする熱意と誠実さが伝わる文章を生成すること。

## パーソナライゼーション:
- 候補者の職務経歴書を深く読み込み、その人にしかない具体的な経験やスキル、実績に必ず言及すること。
- なぜ「あなた」に連絡したのかというスカウト理由を、具体的かつ誠実な言葉で伝えること。「感動しました」「興奮しました」といった主観的で大げさな表現は絶対に使用しないこと。
- テンプレート感を絶対に出さないこと。AIが生成したような不自然な文章は避け、自然で流暢な日本語で書くこと。

## 構成（この構成を厳守すること）:
1.  **件名:**
    - 候補者の経験と特別感が伝わる魅力的な件名を作成すること。
    - 文字数は20〜28文字程度。
    - 例：「【株式会社morich】▲▲のご経験を拝見しご連絡しました（極秘ポジションのご案内）」
2.  **本文:**
    - **冒頭:** 職務経歴書のどの部分に注目したのか、具体的な事実を挙げて、ご連絡した理由を明確に伝えること。
    - **本編:** 候補者の経験が、提案するポジション（もしくは弊社の顧客企業）でどのように活かされ、キャリアにどのようなポジティブな影響を与えるかを、候補者視点で語ること。
    - 以下の「morichの強み」を自然な形で盛り込むこと。
      - ご提案する求人の多くは、企業の代表と直接繋がりのあるconfidential（極秘）案件であること。
      - 私たちのクライアントは、大手企業は少なく、成長著しいスタートアップ企業が中心であること。
      - そのため、1次面接が社長になるケースも多く、選考プロセスが非常にスピーディーに進むこと。ただし、その場で意思決定がなされるわけではなく、経営者と直接話すことで深く企業を理解できる貴重な機会であること。
    - **結び:** 「まずは一度カジュアルにお話をお聞かせいただけませんか？」といった、候補者が返信しやすい心理的ハードルの低い、具体的な次のアクションを提示すること。

## 文体と表現:
- 候補者を指す言葉として「貴殿」は絶対に使用せず、「〇〇様」のように名前を添えること。
- 敬意を払いながらも、熱意と誠実さが伝わる力強い文章で書くこと。
- ポジティブな言葉を選び、候補者が自身のキャリアに自信と希望を持てるような表現を心がけること。
- 全体の文字数は400〜600文字程度に簡潔にまとめること。

## 禁止事項:
- 誰にでも当てはまるような抽象的な表現は一切使用しないこと。
- 「面接してあげる」のような上から目線の表現は絶対にしないこと。
- 誤字脱字は絶対にしないこと。

# 出力形式
- 最初に件名を「件名： 」から始めて1行で出力してください。
- 次に、必ず1行の空行を挟んでください。
- その後、スカウトメールの本文を出力してください。
- 本文には「本文：」などの見出しや、##のようなマークダウン記号は一切含めないでください。
- 全てを結合して、そのままメーラーにコピー＆ペーストできる単一のテキストブロックとして出力してください。

# 候補者情報
---
## 職務経歴書:
${resume}
---
## 求人情報（任意）:
${jobInfo || '指定なし。候補者の経験が最も活かせる、魅力的なスタートアップ企業の極秘案件を想定して提案してください。'}
---

上記のルールをすべて遵守し、最高のスカウト文面を作成してください。
`;
};

export const generateScoutEmail = async (resume: string, jobInfo: string): Promise<string> => {
  const prompt = buildPrompt(resume, jobInfo);
  try {
    // Lazily get the AI client instance. This will throw an error if the API key is missing,
    // which we'll catch and display to the user.
    const aiInstance = getAiInstance();
    const response = await aiInstance.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Re-throw the error so the UI layer can catch it and display a specific message.
    // This will include our custom "API key not set" message.
    if (error instanceof Error) {
      throw error;
    }
    // Fallback for non-standard errors
    throw new Error("スカウト文面の生成中に不明なエラーが発生しました。");
  }
};
