export default {
    template: `
<section class="filter-notes-section">

    <section class="search-note">
        <input type="text" v-model="filterBy.title" @input="filterByTxt" placeholder="Search note..."/>
    </section>
        
</section>
`,
    data() {
        return {
            filterBy: {
                type: '',
                title: '',
            }
        }
    },

    methods: {
        filterByTxt() {
            this.$emit('search', this.filterBy)
        }
    },

};
