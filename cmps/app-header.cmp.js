export default {
    template: `
        <header class="app-header">
        <router-link to="/">Appsus</router-link>
            <nav class="header-nav">
                <router-link to="/email">Email</router-link>|
                <router-link to="/keep">Keep</router-link>| 
                <router-link to="/about">About</router-link>
                  <img class="main-icon" :src="iconSrc" alt="" /> 
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
