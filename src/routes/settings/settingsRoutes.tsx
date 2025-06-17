import { FaCog } from "react-icons/fa"
import type { AppRoute } from "../../models/route"
import { MainSettingsPage } from "../../pages/settings"


const mainSettingsRoute:AppRoute = {
    path: "/settings",
    element: <MainSettingsPage/>,
    children: [
    ],
    name: "Settings",
    icon: <FaCog/>
    
}

export const settingsRoute = mainSettingsRoute