
import noteService from "../services/note.service.js"

import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteDetails from "./note-details.cmp.js" //

export default {
    template: `
    <h1>hello keep!</h1>
    <section class="keep-app main-layout">
        <note-filter/>
        <note-list
        v-if="notes"
        :notes="notes"/>
        <router-view/> 
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
        noteDetails, //
    },
};
