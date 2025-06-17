import './App.css'
import { renderRoutes } from './routes/routes'
import { mainRoute } from './routes/main'
import { BrowserRouter } from 'react-router-dom'
import { Box, Heading, VStack } from '@chakra-ui/react'

function App() {

  return <Box w="100vw" h="100vh" minW="100vw" maxW="100vw" minH="100vh" maxH="100vh" overflow="hidden">
            <BrowserRouter>
              {renderRoutes([mainRoute])}
            </BrowserRouter>
          </Box>
 
}

export default App
