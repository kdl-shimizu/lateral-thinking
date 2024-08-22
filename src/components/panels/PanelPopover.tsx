import { 
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal
} from '@chakra-ui/react'
import { CheckCircleIcon, InfoOutlineIcon } from '@chakra-ui/icons'

import PanelModal from './PanelModal'
import { QuestionDetailJsonData, DetailJsonData, SentenceJsonData } from '../../data';

// 質問を表示するためのキーワードに表示するポップアップを作成する
function PanelPopover (props: { questionBody: string,
                                detail : QuestionDetailJsonData,
                                updateDetails: (data: QuestionDetailJsonData) => void,
                                doneList: string[],
                                updateDoneList: (list: string[]) => void,
                                releasedList: number[],
                                updateReleasedList: (list: number[]) => void }) {
  // インデックス位置でソートをする
  const sortDetail = props.detail.question_details.sort((a, b) => {
    const idx_a = props.questionBody.indexOf(a.q_word);
    const idx_b = props.questionBody.indexOf(b.q_word);
    if (idx_a === -1) return -1;
    else if(idx_b === -1) return 1;
    else if(idx_a > idx_b) return 1;
    else return -1;
  })
  
  
  let str = <></>;
  let str_index = 0;
  sortDetail.forEach((q) => {
    // キーワードの位置を取得する
    const idx = props.questionBody.indexOf(q.q_word);
    if (idx !== -1) {
      const pop = createPopover(q, props.detail, props.updateDetails, props.doneList, props.updateDoneList, props.releasedList, props.updateReleasedList);
      if (str_index <= idx) {
        str = <>{str}{props.questionBody.slice(str_index, idx)}{pop}</>;
        str_index = idx + q.q_word.length;
      }
    }
  })
  str = <>{str}{props.questionBody.slice(str_index, props.questionBody.length)}</>
  return str;
}

// 関連キーワードを表示するポップオーバーを作成する
function createPopover(detail: DetailJsonData, 
                       question: QuestionDetailJsonData,
                       updateDetails: (data: QuestionDetailJsonData) => void,
                       doneList: string[],
                       updateDoneList: (list: string[]) => void,
                       releasedList: number[],
                       updateReleasedList: (list: number[]) => void) {  
  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button colorScheme='black' variant='link'>{detail.q_word}</Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>{detail.q_word}</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Accordion allowToggle>
                {detail.q_relation_words.map((relation, index) => (
                  <AccordionItem key={index}>
                    <h2>
                      <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>{relation.relation_word}</Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      {relation.sentences.map((sentence) => (
                        <List spacing={3} key={sentence.id}>
                          {createPanelModal(sentence, question, updateDetails, doneList, updateDoneList, releasedList, updateReleasedList)}
                        </List>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
    </>
  );
}

// 質問リストを作成する
function createPanelModal(sentence: SentenceJsonData,
                          question: QuestionDetailJsonData,
                          updateDetails: (data: QuestionDetailJsonData) => void,
                          doneList: string[],
                          updateDoneList: (list: string[]) => void,
                          releasedList: number[],
                          updateReleasedList: (list: number[]) => void) {

  if (sentence.release) {
    // 確認済の質問の場合
    return (
      <ListItem>
        <ListIcon as={CheckCircleIcon} color='green.500' />
        <PanelModal
          question={question}
          sentence={sentence}
          color='teal'
          updateDetails={updateDetails}
          doneList={doneList}
          updateDoneList={updateDoneList}
          updateDoneListFlag={false}
          releasedList={releasedList}
          updateReleasedList={updateReleasedList}
        />
      </ListItem>
    )
  } else if(sentence.required_id === 0) {
    // 質問の出現条件が特にない（required_id = 0）場合
    return (
      <ListItem>
        <ListIcon as={InfoOutlineIcon} color='gray.500' />
        <PanelModal
          question={question}
          sentence={sentence}
          color='black'
          updateDetails={updateDetails}
          doneList={doneList}
          updateDoneList={updateDoneList}
          updateDoneListFlag={true}
          releasedList={releasedList}
          updateReleasedList={updateReleasedList}
        />
      </ListItem>
    )
  } else if(sentence.required_id > 0 && releasedList.includes(sentence.required_id)) {
    // 質問の出現条件が解放されている場合
    return (
      <ListItem>
        <ListIcon as={InfoOutlineIcon} color='red.500' />
        <PanelModal
          question={question}
          sentence={sentence}
          color='black'
          updateDetails={updateDetails}
          doneList={doneList}
          updateDoneList={updateDoneList}
          updateDoneListFlag={true}
          releasedList={releasedList}
          updateReleasedList={updateReleasedList}
        />
      </ListItem>
    )
  } else {
    return (
      <></>
    )
  }
}

export default PanelPopover;