import {
  Box,
  Divider,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
} from '@chakra-ui/react'
// stylesheets
import '../styles/Box.scss'

function Home(props: {
                questionNum: number,  // 全体の問題数
                answeredNum: number,  // 解答済の問題数
                progress: number,     // 進行度
                adviceList: { progress: number, text: string }[], // テキストウィンドウに表示するアドバイスリスト
                updateProgress: (p: number) => void  // 進行度を更新する関数
              }) {
  const maxProgress = props.adviceList.length - 1;
  let p = props.progress;
  if (props.progress > maxProgress) {
    p = maxProgress;
  }

  return (
    <>
      <SimpleGrid columns={1} spacing={1}>
      {/* パネル */}
      <Box className='panel'>
        <Text fontSize='5xl'>ウミガメのスープ</Text>

        <Divider />

        <Grid templateColumns='repeat(2, 1fr)' gap={2} className='box'>
          <GridItem w='100%'></GridItem>
          <GridItem w='100%' bg='blue.700'>
            <Text fontSize='2xl' className='box-header'>解決した問題</Text>
            <Text fontSize='4xl'>{props.answeredNum} / {props.questionNum}</Text>
          </GridItem>
        </Grid>
      </Box>
      {/* テキストウィンドウ */}
      <Box className='text-window'>
        {props.adviceList[p].text}
      </Box>
      </SimpleGrid>
    </>
  )
}

export default Home;