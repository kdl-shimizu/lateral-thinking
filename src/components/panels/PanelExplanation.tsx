import { 
  Button,
  Grid,
  GridItem,
  Text
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'
import { PanelID, SelectedQuestion } from "../../data";

// stylesheets
import '../../styles/Box.scss'

// 解答後の開設を表示するパネル
function PanelExplation (props: {
                          selectedQuestion: SelectedQuestion,
                          updateSelectedQuestion: (question: SelectedQuestion) => void,
                          updatePanelState: (state: PanelID, isNew: boolean) => void,
                          updateProgress: () => void }) {

  return (
    <>
      <Grid templateColumns='repeat(1, 1fr)' gap={6}>
        <GridItem w='100%' h='10'>
          <Text pt='2' fontSize='2xl'>Q{props.selectedQuestion.id}: {props.selectedQuestion.title}</Text>
        </GridItem>
        <GridItem w='100%' h='20vh' bg='blue.300' className='question_area'>
        <Text pt='2' fontSize='xl'>{props.selectedQuestion.answer}</Text>
        </GridItem>
        <GridItem w='100%' h='10' className='button_area'>
          <Button
            colorScheme='teal'
            variant='solid'
            onClick={() => {
              props.updateSelectedQuestion({ id: 0, title: '', body: '', answer: '', clear: false });
              props.updateProgress();
              props.updatePanelState(PanelID.List, true);
            }}
          >
            <ArrowBackIcon />一覧へ戻る
          </Button>
        </GridItem>
      </Grid>
    </>
  )
}

export default PanelExplation;