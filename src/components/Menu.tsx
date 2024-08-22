import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Home from './Home'
import Thinking from './Thinking'
import Help from './Help'
import { MenuJsonData, QuestionsJsonData, AdvicesJsonData } from '../data';
// jsondatas
import MenuList from '../datasets/menulist.json'
import Questions from '../datasets/questions.json'
import Advices from '../datasets/advice.json'
// stylesheets
import '../index.scss'
import '../styles/Tabs.scss'
// fonts
import '../fonts/PixelMplus10-Regular.ttf'
import '../fonts/PixelMplus10-Bold.ttf'

const menuList = MenuList as MenuJsonData;
const questionList = Questions as QuestionsJsonData;
const adviceList = Advices as AdvicesJsonData;

function Menu() {
  // 解決済の問題の数を管理する
  const [answeredNum, setAnsweredNum] = useState(0);
  const updateAnsweredNum = () => {
    setAnsweredNum((prevNum) => prevNum + 1);
  }
  
  // 進行度を管理する
  const [progress, setProgress] = useState(0);
  const updateProgress = () => {
    setProgress((prevProgress) => prevProgress + 1);
  }
  
  // 問題の状況を管理する
  const [questionStateList, setQuestionStateList] = useState([...questionList.questions]);
  const updateQuestionState = (id: number) => {
    setQuestionStateList((prevList) => {
      const updatedList = [...prevList];
      updatedList[id].clear = true;
      return updatedList;
    })
  }
  
  return (
    <>
      <Tabs className='tabs'>
        {makeTabList(menuList)}
        {makeTabPanel(questionStateList, updateQuestionState, menuList, answeredNum, updateAnsweredNum, progress, updateProgress)}
      </Tabs>
    </>
  )
}

// メニューリストを作成する
function makeTabList(menus: MenuJsonData) {
  const tabList = menus.menu.map((menu) => (
    <Tab key={menu.id}>{menu.name}</Tab>
  ));
  return <TabList>{tabList}</TabList>;
}

// メニューパネルを作成する
function makeTabPanel(questionList: QuestionsJsonData["questions"],
                      updateQuestion: (id: number) => void,
                      menus: MenuJsonData,
                      answered: number,
                      updateAnsweredNum: () => void,
                      progress: number,
                      updateProgress: () => void) {
  // define mapping
  const menuMap = {
    home: () => <Home
                  questionNum={questionList.length}
                  answeredNum={answered}
                  progress={progress}
                  adviceList={adviceList.advice}
                  updateProgress={updateProgress}
                />,
    thinking: () => <Thinking
                      questions= {questionList}
                      updateQuestion={updateQuestion}
                      updateAnsweredNum={updateAnsweredNum}
                      updateProgress={updateProgress}
                    />,
    help: () => <Help />
  } as const;
  const isMenu = (id: string): id is keyof typeof menuMap => Object.hasOwn(menuMap, id);
  
  const tabPanel = menus.menu.map((menu) => (
    <TabPanel key={menu.id}>
      {isMenu(menu.id) ? menuMap[menu.id]() : null}
    </TabPanel>
  ));
  return <TabPanels>{tabPanel}</TabPanels>
}

export default Menu;