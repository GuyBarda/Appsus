export default {
    template: `
        <header class="app-header">
            <div class="main-title-container">
                <img class="main-icon" :src="iconSrc" alt="" /> 
                <a class="main-title">{{whereAmITitle}}</a>
            </div>
            
              <img title="Menu" class="burger-nav nav-icon" @click="toggleMenu" src="./img/nav.png" alt="☰" />

            <nav v-if="isMenuOpen" class="header-nav">

                <router-link class="nav-icon" to="/"><img src="./img/home.png" alt="Home"/><h3>Home</h3></router-link>
                <router-link class="nav-icon" to="/email"><img src="./img/email.png" alt="email"/><h3>Email</h3></router-link>
                <router-link class="nav-icon" to="/keep"><img src="./img/keep.png" alt="keep"/><h3>Keep</h3></router-link>
                <router-link class="nav-icon" to="/about"><img src="./img/info.png" alt="about"/><h3>About</h3></router-link>
            </nav>

        </header>
    `,
    data() {
        return {
            iconSrc: "../img/home.png",
            isMenuOpen: false
        };
    },

    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen
        }
    },

    computed: {
        whereAmI() {
            return this.$route.path;
        },

        whereAmITitle() {
            if (this.$route.path === '/') return 'AppSus'
            if (this.$route.path === '/email') return 'Email'
            if (this.$route.path === '/keep') return 'Keep'
            if (this.$route.path === '/about') return 'About'

        }

    },
    watch: {
        whereAmI() {
            this.iconSrc = `./img/${this.$route.path.split("/")[1]}.png`;
        },
    },
};
