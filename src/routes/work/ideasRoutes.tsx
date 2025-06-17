import { FaLightbulb, FaPlug } from "react-icons/fa"
import type { AppRoute } from "../../models/route"
import { MainIdeasPage } from "../../pages/ideas"
import { NewConceptPage } from "../../pages/ideas/concepts/new"
import { FaPlugCirclePlus } from "react-icons/fa6"
import { ListConceptsPage } from "../../pages/ideas/concepts/list"
import { TbScript, TbScriptPlus } from "react-icons/tb"
import { NewProjectPage } from "../../pages/ideas/projects/new"
import { ListProjectsPage } from "../../pages/ideas/projects/list"

export const newConceptRoute:AppRoute = 
{
    path: "concepts/new",
    element: <NewConceptPage/>,
    children: [
    ],
    name: "New Concept",
    icon: <FaPlugCirclePlus  />
}


const listConceptsRoute:AppRoute = 
{
    path: "concepts/",
    element: <ListConceptsPage/>,
    children: [
    ],
    name: "Concepts",
    icon: <FaPlug  />
}

const newProjectRoute:AppRoute = 
{
    path: "projects/new",
    element: <NewProjectPage/>,
    children: [
    ],
    name: "New Project",
    icon: <TbScriptPlus />
}


const listProjectsRoute:AppRoute = 
{
    path: "projects/",
    element: <ListProjectsPage/>,
    children: [
    ],
    name: "Projects",
    icon: <TbScript />
}

const mainIdeasRoute:AppRoute = 
{
    path: "ideas",
    element: <MainIdeasPage/>,
    children: [
        newConceptRoute,
        listConceptsRoute,
        newProjectRoute,
        listProjectsRoute,
    ],
    name: "Ideas",
    icon: <FaLightbulb/>
}

export const ideasRoute = mainIdeasRoute
