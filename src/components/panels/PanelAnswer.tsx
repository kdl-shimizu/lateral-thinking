import { createRef, RefObject, useRef, useState } from 'react'
import { 
  Button,
  Grid,
  GridItem,
  Select,
  Text,
  Wrap,
  WrapItem,
  useDisclosure,
} from '@chakra-ui/react'
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons'

import PanelAnswerModal from './PanelAnswerModal'
import { QuestionDetailJsonData, AnswerWordsJsonData, SelectedQuestion, PanelID } from '../../data'

// stylesheets
import '../../styles/Box.scss'

// 解答をするためのパネル
function PanelAnswer(props: {
                      questionDetails: QuestionDetailJsonData,
                      updateQuestionDetails: (data: QuestionDetailJsonData) => void,
                      selectedQuestion: SelectedQuestion,
                      updateSelectedQuestion: (question: SelectedQuestion) => void,
                      doneList: string[],
                      updateDoneList: (list: string[]) => void,
                      updatePanelState: (state: PanelID, isNew: boolean) => void,
                      releasedList: number[],
                      updateReleasedList: (list: number[]) => void,
                      updateAnsweredNum: () => void }) {

  // 解答用のselectのvalueを取得するuseRef
  const selectValueRefs = useRef<RefObject<HTMLSelectElement>[]>([]);
  // 正誤判定表示用
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  // 正誤判定を管理する
  const [pass, setPass] = useState(false);
  
  // 解説への移動
  const goExplanation = () => {
    props.updateAnsweredNum();
    props.updateDoneList([]);
    props.updateReleasedList([]);
    props.updatePanelState(PanelID.Explanation, true);
  }

  return (
    <>
      <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        <GridItem w='100%' h='10'>
          <Text pt='2' fontSize='2xl'>Q{props.selectedQuestion.id}: {props.selectedQuestion.title}</Text>
        </GridItem>
        <GridItem w='100%' h='20vh' bg='blue.300' className='question_area'>
          {props.selectedQuestion.body}
        </GridItem>
        <GridItem w='100%' h='20vh' className='question_area'>
          {createAnswerSentence(props.questionDetails, props.releasedList, selectValueRefs.current)}
        </GridItem>
        <GridItem w='100%' h='10' className='button_area'>
          <Button
            className='back_button'
            colorScheme='teal'
            variant='solid'
            onClick={() => {
              props.updatePanelState(PanelID.Detail, false)
              props.updateSelectedQuestion(props.selectedQuestion)
              props.updateQuestionDetails(props.questionDetails)
              props.updateDoneList(props.doneList)
              props.updateReleasedList(props.releasedList)
            }}
          >
            <ArrowBackIcon />問題へ戻る
          </Button>
          <Button
            colorScheme='teal'
            variant='solid'
            onClick={() => {
              const check = checkAnswer(props.questionDetails.answer_sentence.answer, selectValueRefs.current);
              if (check) {
                let selectedQuestion = {...props.selectedQuestion};
                selectedQuestion.clear = true;
                props.updateSelectedQuestion(selectedQuestion);
              }
              setPass(check);
              onOpen();
            }}
          >
            <StarIcon />答える！
          </Button>
          <PanelAnswerModal
            pass={pass}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            goExplanation={goExplanation}
          />
        </GridItem>
      </Grid>
    </>
  )
}

function createAnswerSentence(details: QuestionDetailJsonData, releasedList: number[], selectValueRefs: RefObject<HTMLSelectElement>[]) {
  const replaceWord = '{word}';
  let replacedSentence = <></>;
  let index = 0;
  let key = 0;
  
  const answer = details.answer_sentence.base_sentence;
  const answerWords = details.answer_sentence.answer_words;
  
  while(true) {
    let indexOf = answer.indexOf(replaceWord, index);
    if(indexOf !== -1) {
      key++;
      const select = createSelect(key, answerWords, releasedList, selectValueRefs);
      replacedSentence = <>{replacedSentence}<WrapItem>{answer.slice(index, indexOf)}</WrapItem>{select}</>;
      index = indexOf + replaceWord.length;
    } else {
      replacedSentence = <>{replacedSentence}<WrapItem>{answer.slice(index, answer.length)}</WrapItem></>
      break;
    }
  }
  
  return <><Wrap>{replacedSentence}</Wrap></>;
}

function createSelect(key: number, answerWords: AnswerWordsJsonData[], releasedList: number[], selectValueRefs: RefObject<HTMLSelectElement>[]) {
  // 選択肢のリストを作成する
  let list: string[] = [];
  answerWords.forEach((word) => {
    if (word.flag_id.length !== 0) {
      word.flag_id.forEach((id) => {
        if(releasedList.includes(id) && !list.includes(word.word)) {
          list.push(word.word);
        }
      })
    } else {
      list.push(word.word);
    }
  })
  // Refを作成する
  selectValueRefs[key] = createRef<HTMLSelectElement>();
  
  return (
    <>
      <WrapItem>
        <Select
          className='answer_select'
          variant='flushed'
          size="sm"
          placeholder='Select'
          ref={selectValueRefs[key]}
        >
          {list.map((word, index) => (
            <option key={index} value={word}>{word}</option>
          ))}
        </Select>
      </WrapItem>
    </>
  )
}

function checkAnswer(answers: { id: number, answer: string }[], selectValueRefs: RefObject<HTMLSelectElement>[]) {
  let pass = true;
  answers.forEach((answer) => {
    if(answer.answer !== selectValueRefs[answer.id].current?.value) {
      pass = false;
    }
  })
  return pass;
}

export default PanelAnswer;