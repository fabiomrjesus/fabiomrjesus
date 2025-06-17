import { Link } from "react-router-dom"
import { RoundIconCard } from "../../components/app-ui/round-card"
import { settingsRoute } from "../../routes/settings/settingsRoutes"
import { HStack } from "@chakra-ui/react"

export function MainSettingsPage()
{
    return <>
        <HStack gap="3em">
        {settingsRoute.children?.map((route, index) => {
          return <Link to={route.path} key={"route"+index} >
                    <RoundIconCard text={route.name} icon={route.icon}/>
                </Link>
        })}            
        </HStack>
    </>
}