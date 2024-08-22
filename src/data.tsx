// メニューのデータ型
export type MenuJsonData = { menu : { id: string, name: string, flag: boolean }[] };
// 問題集のデータ型
export type QuestionsJsonData = { questions : { id: number, title: string, body: string, answer: string, clear: boolean }[]}
// アドバイスのデータ型
export type AdvicesJsonData = { advice: { progress: number, text: string }[] };

export type SelectedQuestion = { id: number, title: string, body: string, answer: string, clear: boolean }

// 質問の詳細のデータ型
export type QuestionDetailJsonData = { question_details: DetailJsonData[], answer_sentence: { base_sentence: string, answer_words: AnswerWordsJsonData[], answer: { id: number, answer: string }[] } }
export type DetailJsonData = { q_word: string, q_relation_words: RelationJsonData[] }
export type RelationJsonData = { relation_word: string, sentences: SentenceJsonData[] }
export type SentenceJsonData = { id: number, sentence: string, answer: string, nice: boolean, required_id: number, release: boolean, done_sentence: string }
export type AnswerWordsJsonData = { word: string, flag_id: number[] }

export const enum PanelID {
  // 問題一覧
  List = 'list',
  // 問題詳細
  Detail = 'detail',
  // 質問
  Question = 'question',
  // 解答
  Answer = 'answer',
  // 解説
  Explanation = 'explanation',
}