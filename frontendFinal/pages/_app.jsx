import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import axios from 'axios' 

export default function App({ Component, pageProps }) {
  axios.defaults.withCredentials = true;
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
