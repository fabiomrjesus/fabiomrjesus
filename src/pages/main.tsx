import { Heading, Image, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import csharp from '../assets/CSharp.svg'
import docker from '../assets/Docker.svg'
import python from '../assets/Python.svg'
import react from '../assets/React.svg'
import solidity from '../assets/Solidity.svg'
import face from '../assets/face.png'

export function MainPage(){
    return <>
        <VStack w="100vw" h="100vh" gap={8} minW="100vw" maxW="100vw" minH="100vh" maxH="100vh" overflow="hidden">
            <Spacer/>
            <VStack w="100%">
              <Image alt="i totally forgot this for like a year. this is my profile picture" className="rotate" w="14rem" h="auto" src={face}/>
              <Heading as="h1" fontSize="1.5rem" mt="3rem" fontWeight="bold">I was supposed to do this, but I forgot.</Heading>
              <Heading as="h2" fontSize="1.25rem" fontWeight="bold">So here's my profile picture spinning instead!</Heading>
            </VStack>
            <Text maxW="50%" fontWeight="thin" fontSize="0.85rem">
              I have a master's in Being Cool AF™. Oh, I have also a Master's Degree in Software Engineering with a 
              specialization in Code Generation and 7 years expertise in Software Engineering and R&D. 
            </Text>
            <VStack maxW="50%" w="100%" fontWeight="thin" fontSize="0.85rem">
              <Text> Much tech, such wow!</Text>
              <HStack w="100%">
                <Spacer/>
                <Image maxH="3rem" src={csharp}/>
                <Image maxH="3rem" src={react}/>
                <Image maxH="3rem" src={docker}/>
                <Image maxH="3rem" src={python}/>
                <Image maxH="3rem" src={solidity}/>
                <Spacer/>
              </HStack>
            </VStack>
            
            <Spacer/>
          </VStack>
    </>
}