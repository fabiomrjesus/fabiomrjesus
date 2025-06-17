import { HStack } from "@chakra-ui/react";
import { mainRoute } from "../routes/main";
import { RoundIconCard } from "../components/app-ui/round-card";
import { Link, Outlet } from "react-router-dom";


export function MainPage(){
    return <>
        <HStack gap="3em">
        {mainRoute.children?.map((route, index) => {
          return <Link viewTransition to={route.path} key={"route"+index} >
                    <RoundIconCard text={route.name} icon={route.icon}/>
                </Link>
        })}            
        </HStack>
    </>
}