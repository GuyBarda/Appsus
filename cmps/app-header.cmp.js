export default {
    template: `
        <header class="app-header main-layout">
        <router-link to="/">Appsus</router-link>
            <nav class="header-nav">
                <router-link to="/email">Email</router-link>|
                <router-link to="/keep">Keep</router-link>| 
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
};
