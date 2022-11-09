import homePage from "./views/app-home.cmp.js";
import aboutPage from "./views/app-about.cmp.js";
import emailApp from "./views/email-app.cmp.js";

const { createRouter, createWebHashHistory } = VueRouter;

const routerOptions = {
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            component: homePage,
        },
        {
            path: "/about",
            component: aboutPage,
        },
        {
            path: "/email",
            component: emailApp,
        },
    ],
};

export const router = createRouter(routerOptions);
