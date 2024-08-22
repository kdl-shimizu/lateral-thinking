import {
  Box,
  Divider,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
import { useState, useRef } from 'react'

import PanelList from './panels/PanelList';
import PanelDetail from './panels/PanelDetail';
import PanelAnswer from './panels/PanelAnswer';
import PanelExplanation from './panels/PanelExplanation';
import { QuestionDetailJsonData, PanelID } from '../data' 

// stylesheets
import '../styles/Box.scss'

type QuestionsJsonData = { id: number, title: string, body: string, answer: string, clear: boolean };

function Thinking(props: { 
                    // 問題集
                    questions: { id: number, title: string, body: string, answer: string, clear: boolean }[],
                    // 問題の解答状況を更新する関数
                    updateQuestion: (id: number) => void,
                    // 解答済の問題数を管理する関数
                    updateAnsweredNum: () => void,
                    // 進行度を更新する関数
                    updateProgress: () => void }) {

  // 新規問題かどうか
  const isNewQuestion = useRef(true);
  
  // パネルの状態管理
  const [panelState, setPanelState] = useState(PanelID.List.toString());
  const updatePanelState = (state: PanelID, isNew: boolean) => {
    setPanelState(state);
    isNewQuestion.current = isNew;
  }
  
  // 現在選択中の問題
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionsJsonData>({ id: 0, title: '', body: '', answer: '', clear: false });
  const updateSelectedQuestion = (question: QuestionsJsonData) => {
    setSelectedQuestion(question);
  }
  
  // 取得した質問詳細を管理する
  const [detail, setDetails] = useState({} as QuestionDetailJsonData);
  const updateDetails = (data: QuestionDetailJsonData) => {
    setDetails(data);
  }
  
  // 質問済文章のリストを管理する
  const [doneList, setDoneList] = useState<string[]>([]);
  const updateDoneList = (list: string[]) => {
    setDoneList(list);
  }
  
  // 質問済のidを管理する
  const [releasedList, setReleasedList] = useState<number[]>([]);
  const updateReleasedList = (list: number[]) => {
    setReleasedList(list);
  }
  
  // 現在表示しているパネルのステータスをマッピングする
  const panelMap = {
    [PanelID.List]: () => <PanelList
                            questions={props.questions}
                            updateQuestion={props.updateQuestion}
                            updateSelectedQuestion={updateSelectedQuestion}
                            updatePanelState={updatePanelState}
                          />,
    [PanelID.Detail]: () => <PanelDetail
                              questionDetails={detail}
                              updateQuestionDetails={updateDetails}
                              selectedQuestion={selectedQuestion}
                              updateSelectedQuestion={updateSelectedQuestion}
                              doneList={doneList}
                              updateDoneList={updateDoneList}
                              updatePanelState={updatePanelState}
                              releasedList={releasedList}
                              updateReleasedList={updateReleasedList}
                              isNewQuestion={isNewQuestion.current}
                            />,
    [PanelID.Answer]: () => <PanelAnswer
                              questionDetails={detail}
                              updateQuestionDetails={updateDetails}
                              selectedQuestion={selectedQuestion}
                              updateSelectedQuestion={updateSelectedQuestion}
                              doneList={doneList}
                              updateDoneList={updateDoneList}
                              updatePanelState={updatePanelState}
                              releasedList={releasedList}
                              updateReleasedList={updateReleasedList}
                              updateAnsweredNum={props.updateAnsweredNum}
                            />,
    [PanelID.Explanation]: () => <PanelExplanation
                                   selectedQuestion={selectedQuestion}
                                   updateSelectedQuestion={updateSelectedQuestion}
                                   updatePanelState={updatePanelState}
                                   updateProgress={props.updateProgress}
                                 />,
  } as const;
  const isPanel = (id: string): id is keyof typeof panelMap => Object.hasOwn(panelMap, id);

  return (
    <>
      <SimpleGrid columns={1} spacing={1}>
        {/* パネル */}
        <Box className='panel'>
          <Text fontSize='5xl'>シンキングタイム</Text>
          <Divider />
          {isPanel(panelState) ? panelMap[panelState]() : null}
        </Box>
        {/* テキストウィンドウ */}
        <Box className='text-window'>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default Thinking;