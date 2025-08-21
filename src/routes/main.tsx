import type { AppRoute } from "../models/route";
import { MainPage } from "../pages/main";

export const mainRoute:AppRoute = {
    path:"/",
    element:<MainPage/>,
    children:[
    ]
}
