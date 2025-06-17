import type { AppRoute } from "../../models/route"
import { GiTakeMyMoney } from "react-icons/gi";
import { MainFinancialPage } from "../../pages/financial";

const mainFinancialRoute:AppRoute = {
    path: "/financial",
    element: <MainFinancialPage/>,
    children: [
    ],
    name: "Financial",
    icon: <GiTakeMyMoney/>
    
}

export const financialRoute = mainFinancialRoute