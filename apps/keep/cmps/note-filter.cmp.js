export default {
    template: `
    <section class="filter-icon-bar">

        <button @click.stop.prevent="filter('')" class="filter-item" :class="{active: filterBy.type===''}">
            <span class="material-symbols-outlined">select_all</span></button>
        <button @click.stop.prevent="filter('note-txt')" class="filter-item" :class="{active: filterBy.type==='note-txt'}">
            <span class="material-symbols-outlined">title</span></button>
        <button @click.stop.prevent="filter('note-img')" class="filter-item" :class="{active: filterBy.type==='note-img'}">
            <span class="material-symbols-outlined">image</span></button>
        <button @click.stop.prevent="filter('note-video')" class="filter-item" :class="{active: filterBy.type==='note-video'}">
            <span class="material-symbols-outlined">smart_display</span></button>
        <button @click.stop.prevent="filter('note-todos')" class="filter-item" :class="{active: filterBy.type==='note-todos'}">
            <span class="material-symbols-outlined">list</span></button>
            
    </section>
    `,
    data() {
        return {
            filterBy: {
                type: '',
                // title: '',
            }
        }
    },

    methods: {
        clicked(type) {
            console.log(type)
        },
        filter(type) {
            this.filterBy.type = type
            this.$emit('filter', this.filterBy)
        }
    },

    computed: {
        isActive() {
            return {}
        },
    }
};
