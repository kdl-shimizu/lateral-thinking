import { useState, useEffect } from 'react'
import { 
  Button,
  Grid,
  GridItem,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons'

import PanelPopover from './PanelPopover'
import { QuestionDetailJsonData, SelectedQuestion, PanelID } from '../../data'

// stylesheets
import '../../styles/Box.scss'

function PanelDetail(props: {
                      questionDetails: QuestionDetailJsonData,
                      updateQuestionDetails: (data: QuestionDetailJsonData) => void,
                      selectedQuestion: SelectedQuestion,
                      updateSelectedQuestion: (question: SelectedQuestion) => void,
                      doneList: string[],
                      updateDoneList: (list: string[]) => void,
                      updatePanelState: (state: PanelID, isNew: boolean) => void,
                      releasedList: number[],
                      updateReleasedList: (list: number[]) => void,
                      isNewQuestion: boolean }) {
  
  // 質問の詳細jsonのパス
  const initialUrl = '/questions/q' + props.selectedQuestion.id + '.json';
  
  // ローディング中かどうか
  const [loading, setLoading] = useState(true);
  
  // 問題の詳細を取得する
  useEffect(() => {
    if(props.isNewQuestion) {
      const fetchDetailData = async () => {
        let res: any = await getDetail(initialUrl);
        
        loadDetail(res);
        
        setTimeout(() => {
          setLoading(false);
        }, 2000)
      };
      fetchDetailData();
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // 問題の詳細を取得する
  const getDetail = async (url: string) => {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          resolve(data)
        });
    })
  }
  
  // 取得した問題の詳細をdetailにセットする
  const loadDetail = (data: QuestionDetailJsonData) => {
    fetch(initialUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => props.updateQuestionDetails(data));
  }
  
  return (
    <>
      {loading ? (
        <Button
          isLoading
          loadingText='Loading'
          colorScheme='teal'
          variant='outline'
          spinnerPlacement='end'
        ></Button>
      ) : (
      <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        <GridItem w='100%' h='10'>
          <Text pt='2' fontSize='2xl'>Q{props.selectedQuestion.id}: {props.selectedQuestion.title}</Text>
        </GridItem>
        <GridItem w='100%' h='20vh' bg='blue.300' className='question_area'>
          <PanelPopover
            questionBody={props.selectedQuestion.body}
            detail={props.questionDetails}
            updateDetails={props.updateQuestionDetails}
            doneList={props.doneList}
            updateDoneList={props.updateDoneList}
            releasedList={props.releasedList}
            updateReleasedList={props.updateReleasedList}
          />
        </GridItem>
        <GridItem>
          <UnorderedList>
            {props.doneList.map((done, index) => (
              <ListItem key={index}>{done}</ListItem>
            ))}
          </UnorderedList>
        </GridItem>
        <GridItem w='100%' h='10' className='button_area'>
          <Button
            className='back_button'
            colorScheme='teal'
            variant='solid'
            onClick={() => {
              props.updatePanelState(PanelID.List, true);
              props.updateSelectedQuestion({ id: 0, title: '', body: '', answer: '', clear: false });
              props.updateDoneList([]);
              props.updateReleasedList([]);
            }}
          >
            <ArrowBackIcon />一覧へ戻る
          </Button>
          <Button
            colorScheme='teal'
            variant='solid'
            onClick={() => {
              props.updatePanelState(PanelID.Answer, false);
            }}
          >
            <ArrowForwardIcon />解答する
          </Button>
        </GridItem>
      </Grid>
      )}
    </>
  )
}

export default PanelDetail;