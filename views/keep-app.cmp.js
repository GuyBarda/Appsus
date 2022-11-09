
import noteService from "../apps/keep/services/note.service.js"

import noteFilter from "../apps/keep/cmps/note-filter.cmp.js"
import noteList from "../apps/keep/cmps/note-list.cmp.js"

export default {
    template: `
    <h1>hello keep!</h1>
    <section class="keep-app">
        <note-filter/>
        <note-list
        v-if="notes"
        :notes="notes"/>
    </section>
    `,

    data() {
        return {
            notes: null
        }
    },

    created() {
        noteService.query()
            .then(notes => {
                this.notes = notes
                console.log(this.notes)
            })
    },

    components: {
        noteFilter,
        noteList,
    },
};
