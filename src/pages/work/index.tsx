import { Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RoundIconCard } from "../../components/app-ui/round-card";
import { workRoute } from "../../routes/work/workRoutes";

export function MainWorkPage(){
    return <>
    <VStack gap="6em">
            <Heading as="h2" fontSize="3em">
                <HStack gap="0.5em">
                    {workRoute.icon}
                    <Text>WORK</Text>
                </HStack>
            </Heading>
        <HStack gap="3em">
        {workRoute.children?.map((route, index) => {
          return <Link to={route.path} key={"route"+index} >
                    <RoundIconCard text={route.name} icon={route.icon}/>
                </Link>
        })}            
        </HStack>
        </VStack>
    </>
}