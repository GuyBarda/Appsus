export default {
    template: `
    <section class="filter-icon-bar">

        <button @click.stop.prevent="filter('')" class="filter-item active">
            <span class="material-symbols-outlined">select_all</span></button>
        <button @click.stop.prevent="filter('note-txt')" class="filter-item">
            <span class="material-symbols-outlined">title</span></button>
        <button @click.stop.prevent="filter('note-img')" class="filter-item">
            <span class="material-symbols-outlined">image</span></button>
        <button @click.stop.prevent="filter('note-video')" class="filter-item">
            <span class="material-symbols-outlined">smart_display</span></button>
        <button @click.stop.prevent="filter('note-todos')" class="filter-item">
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
    }
};
