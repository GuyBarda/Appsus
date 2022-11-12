export default {
    template: `
        <header class="app-header">
            <div class="main-title-container">
                <img class="main-icon" :src="iconSrc" alt="" /> 
                <router-link class="main-title" to="/">Appsus</router-link>
            </div>
            <nav class="header-nav">
                <router-link to="/email">Email</router-link>|
                <router-link to="/keep">Keep</router-link>| 
                <router-link to="/about">About</router-link>
            </nav>
        </header>
    `,
    data() {
        return {
            iconSrc: "../img/keep.png",
        };
    },
    computed: {
        whereAmI() {
            return this.$route.path;
        },
    },
    watch: {
        whereAmI() {
            this.iconSrc = `../img/${this.$route.path.split("/")[1]}.png`;
        },
    },
};
