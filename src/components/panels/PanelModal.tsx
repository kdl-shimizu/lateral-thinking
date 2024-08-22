import {
  Button,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { QuestionDetailJsonData, SentenceJsonData } from '../../data'

// stylesheets
import '../../styles/Box.scss'

// 質問の答えを表示するモーダルを作成する
function PanelModal (props: { question: QuestionDetailJsonData,
                              sentence: SentenceJsonData,
                              color: string,
                              updateDetails: (data: QuestionDetailJsonData) => void,
                              doneList: string[],
                              updateDoneList: (list: string[]) => void,
                              updateDoneListFlag: boolean,
                              releasedList: number[],
                              updateReleasedList: (list: number[]) => void }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        onClick={() => {
          onOpen()
          // オブジェクトコピー
          let data = {...props.question}
          data.question_details.forEach((sentence) => {
            sentence.q_relation_words.forEach((word) => {
              word.sentences.forEach((s) => {
                if (s.id === props.sentence.id) {
                  s.release = true
                }
              })
            })
          })
          props.updateDetails(data)

          if (props.updateDoneListFlag) {
            let list = props.doneList.concat()
            list.push(props.sentence.done_sentence)
            props.updateDoneList(list)
            let idList = props.releasedList.concat()
            idList.push(props.sentence.id)
            props.updateReleasedList(idList)
          }
        }}
        colorScheme={props.color}
        variant='link'
      >
        {props.sentence.sentence}{props.sentence.required_id > 0 ? <Text fontSize='xs' color='tomato'>New!</Text> : ''}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text pt='2' fontSize='xl' className='modal-text'>{props.sentence.sentence}</Text>
            <Divider />
            {props.sentence.nice ? (
              <Text as='mark' color='tomato' className='modal-text'>いい質問です！</Text>
            ) : (<></>)}
            <Text pt='2' fontSize='2xl' className='modal-text'>→{props.sentence.answer}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} className='modal-text' onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PanelModal;