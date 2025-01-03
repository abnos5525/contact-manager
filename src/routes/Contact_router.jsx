import {createHashRouter, Navigate} from "react-router-dom";
import Home from "../components/Home.jsx";
import {AddContact, EditContact, ViewContact} from "../components/index.js";
import Page404 from "../components/errors/404.jsx";

export const contact_router = createHashRouter([
    {
        path: "/",
        element: <Navigate to="/contacts"/>,
    },
    {
        path: "/contacts",
        element: <Home/>
    },
    {
        path: "/contacts/add",
        element: <AddContact/>
    },
    {
        path: "/contacts/:contactId",
        element: <ViewContact/>
    },
    {
        path: "/contacts/edit/:contactId",
        element: <EditContact/>
    },
    {
        path: "*",
        element: <Page404/>
    }
])