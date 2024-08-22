import { 
  Box,
  Divider,
  Grid,
  GridItem,
  Link,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList
} from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

// ヘルプタブを選択したときに表示するコンポーネント
function Help() {
  return (
    <>
      <SimpleGrid columns={1} spacing={1}>
      {/* パネル */}
      <Box className='panel'>
        <Text fontSize='5xl'>遊び方</Text>

        <Divider />

        <Grid templateColumns='repeat(1, 1fr)' gap={2}>
          <GridItem w='100%'>
            <Text fontSize='xl'>ウミガメのスープとは?</Text>
            <p>
              水平思考クイズの1つです。<br />
              出題者が読み上げる謎の物語に対して、回答者が「はい」「いいえ」「関係ありません」のいずれかで答えられる質問を繰り返すことで状況を整理し、真相を推理します。
            </p>
            <p>
              問題文からキーワードを探し出し、効果的な質問をして状況を推理していきましょう。
            </p>
          </GridItem>
          <GridItem w='100%'>
            <UnorderedList>
              <ListItem>問題文の中に含まれるキーワードから質問を選択してください</ListItem>
              <ListItem>良い質問をすると正解に近づくかも…？</ListItem>
              <ListItem>質問をすることで新たな質問が解放されることもあります</ListItem>
            </UnorderedList>
          </GridItem>
        </Grid>
      </Box>
      {/* テキストウィンドウ */}
      <Box className='text-window'>
        <Link href='https://ja.wikipedia.org/wiki/%E6%B0%B4%E5%B9%B3%E6%80%9D%E8%80%83' isExternal>
          水平思考とは？ <ExternalLinkIcon mx='2px' />
        </Link>
      </Box>
      </SimpleGrid>
    </>
  )
}

export default Help;