import { ChakraProvider } from '@chakra-ui/react'
// Menu component
import Menu from './components/Menu'

function App() {
  return (
    <ChakraProvider>
      <Menu/>
    </ChakraProvider>
  );
}

export default App;