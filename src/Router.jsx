import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
    ScrollRestoration,
} from "react-router-dom";
import Character from "./pages/Character/Character";
import Add from "./pages/Add/Add";

const Root = () => {
    return (
        <>
            <ScrollRestoration />
            {/* <Navbar /> */}
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/character/:characterId",
                element: <Character />,
            },
            {
                path: "/add",
                element: <Add />
            }
        ],
    },
]);


function Router() {
    return <RouterProvider router={router} />;
}

export default Router