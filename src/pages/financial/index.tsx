import { Link } from "react-router-dom"
import { RoundIconCard } from "../../components/app-ui/round-card"
import { HStack } from "@chakra-ui/react"
import { financialRoute } from "../../routes/financial/financialRoutes"

export function MainFinancialPage()
{
      return <>
        <HStack gap="3em">
        {financialRoute.children?.map((route, index) => {
          return <Link to={route.path} key={"route"+index} >
                    <RoundIconCard text={route.name} icon={route.icon}/>
                </Link>
        })}            
        </HStack>
    </>
}