import { 
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Modal,
  ModalContent,
  ModalOverlay
} from '@chakra-ui/react'

// 正誤判定表示用パネル
function PanelAnswerModal (props: {
                            pass: boolean,
                            isOpen: boolean,
                            onOpen: () => void,
                            onClose: () => void,
                            goExplanation: () => void
}) {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Alert
            status= {props.pass ? 'success': 'info' }
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
          >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
              {props.pass ? '正解！' : '残念…' }
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
            { 
              props.pass ? <>
                <Button
                  colorScheme='blue'
                  variant='solid'
                  onClick={() => {
                    props.onClose();
                    props.goExplanation();
                  }}
                >
                  解説を見る
                </Button>
              </> : 
              <>
                <Button
                  colorScheme='gray'
                  variant='solid'
                  onClick={() => {
                    props.onClose();
                  }}
                >
                  戻る
                </Button>
              </>
            }
            </AlertDescription>
          </Alert>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PanelAnswerModal;