import type { AppRoute } from "../models/route";
import { MainPage } from "../pages/main";
import { financialRoute } from "./financial/financialRoutes";
import { settingsRoute } from "./settings/settingsRoutes";
import { workRoute } from "./work/workRoutes";

export const mainRoute:AppRoute = {
    path:"/",
    element:<MainPage/>,
    children:[
        workRoute,
        financialRoute,
        settingsRoute,
    ]
}
