import { Box, VStack, type BoxProps } from "@chakra-ui/react";

export interface RoundIconCardProps extends BoxProps 
{
    icon: React.ReactNode;
    text?: string;
}

export function RoundIconCard({icon, text, ...props}: RoundIconCardProps) 
{
    return <Box cursor="pointer" bg="#ffffff05" w="7em" h="7em" borderRadius="full" alignItems="center" justifyContent="center" {...props} _hover={{bg: "#ffffff20"}}>
        <VStack gap="0.5em" alignItems="center" justifyContent="center" h="100%" w="100%">
        <Box fontSize="2.5em">{icon}</Box>
        <Box fontSize="0.8em" fontWeight="light">{text}</Box>    
        </VStack>
    </Box>
}