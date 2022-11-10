import homePage from "./views/app-home.cmp.js";
import aboutPage from "./views/app-about.cmp.js";

import emailApp from "./apps/mail/pages/email-app.cmp.js";
import keepApp from "./apps/keep/pages/keep-app.cmp.js";
import emailDetails from "./apps/mail/pages/email-details.cmp.js";
import noteDetails from "./apps/keep/pages/note-details.cmp.js"; //
import emailAdd from "./apps/mail/cmps/email-add.cmp.js";

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
            children: [
                {
                    path: "/email/compose/:obj",
                    component: emailAdd,
                },
                {
                    path: "/email/:id",
                    component: emailDetails,
                },
            ],
        },

        {
            path: "/keep",
            component: keepApp,
            children: [
                {
                    path: "/keep/:id",
                    component: noteDetails,
                },
            ],
        },
    ],
};

export const router = createRouter(routerOptions);
