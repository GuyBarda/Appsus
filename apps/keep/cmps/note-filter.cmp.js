export default {
    template: `
    <section class="filter-notes-section">
        <section class="filter-icon-bar">
            <button title="All" @click.stop.prevent="filter('')" class="filter-item" :class="{active: filterBy.type===''}">
                <span class="material-symbols-outlined">select_all</span></button>
            <button title="Text" @click.stop.prevent="filter('note-txt')" class="filter-item" :class="{active: filterBy.type==='note-txt'}">
                <span class="material-symbols-outlined">title</span></button>
            <button title="Image" @click.stop.prevent="filter('note-img')" class="filter-item" :class="{active: filterBy.type==='note-img'}">
                <span class="material-symbols-outlined">image</span></button>
            <!-- <button title="Video" @click.stop.prevent="filter('note-video')" class="filter-item" :class="{active: filterBy.type==='note-video'}">
                <span class="material-symbols-outlined">smart_display</span></button> -->
            <button title="List" @click.stop.prevent="filter('note-todos')" class="filter-item" :class="{active: filterBy.type==='note-todos'}">
                <span class="material-symbols-outlined">list</span></button>                     
        </section>
    </section>
    `,
    data() {
        return {
            filterBy: {
                type: "",
                title: "",
            },
        };
    },
    methods: {
        filter(type = this.filterBy.type) {
            this.filterBy.type = type;
            this.$emit("filter", this.filterBy);
        },
    },
    computed: {
        isActive() {
            return {};
        },
    },
};
