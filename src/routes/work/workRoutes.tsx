import { FaCode } from "react-icons/fa"
import { MainWorkPage } from "../../pages/work"
import type { AppRoute } from "../../models/route"
import { ideasRoute } from "./ideasRoutes"


const mainWorkRoute:AppRoute = {
    path: "work",
    element: <MainWorkPage/>,
    children: [
        ideasRoute,
    ],
    name: "Work",
    icon: <FaCode />
    
}

export const workRoute = mainWorkRoute