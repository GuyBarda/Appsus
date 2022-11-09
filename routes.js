import homePage from "./views/app-home.cmp.js";
import aboutPage from "./views/app-about.cmp.js";
<<<<<<< HEAD
import emailApp from "./apps/mail/pages/email-app.cmp.js";
=======
import emailApp from "./views/email-app.cmp.js";
>>>>>>> cc4b6ce9ca295ce7a674d281212f44e1017cf7b1
import keepApp from "./apps/keep/pages/keep-app.cmp.js";

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
        {
            path: "/keep",
            component: keepApp,
        },
    ],
};

export const router = createRouter(routerOptions);
