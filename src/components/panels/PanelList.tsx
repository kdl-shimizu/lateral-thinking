import { 
  Box,
  Button,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/react'

import { SelectedQuestion, PanelID } from '../../data'

function PanelList( props: {
                      questions: SelectedQuestion[],
                      updateQuestion: (id: number) => void,
                      updateSelectedQuestion: (question: SelectedQuestion) => void,
                      updatePanelState: (state: PanelID, isNew: boolean) => void
                    }) {
  
  const boxList = props.questions.map((question) => (
    <Box key={question.id}>
      <Text pt='2' fontSize='xl'>Q{question.id}: {question.title}</Text>
      <Button
        colorScheme='teal'
        size='sm'
        onClick={() => {
          props.updatePanelState(PanelID.Detail, true)
          props.updateSelectedQuestion(question)
        }}
      >この問題を解く！</Button>
    </Box>
  ))
  return (
    <>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {boxList}
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}

export default PanelList;