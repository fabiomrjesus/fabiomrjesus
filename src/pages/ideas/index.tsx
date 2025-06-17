import { Link } from "react-router-dom"
import { RoundIconCard } from "../../components/app-ui/round-card"
import { Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { ideasRoute } from "../../routes/work/ideasRoutes"

export function MainIdeasPage()
{
    return <>
    <VStack gap="6em">
        <Heading as="h2" fontSize="3em">
            <HStack>
                {ideasRoute.icon}
                <Text>IDEAS</Text>
            </HStack>
        </Heading>
        <HStack gap="3em">
            {ideasRoute.children?.map((route, index) => {
            return <Link to={route.path} key={"route"+index} >
                        <RoundIconCard text={route.name} icon={route.icon}/>
                    </Link>
            })}            
        </HStack>
    </VStack>
        
    </>
}