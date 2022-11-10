
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
        @setPin="setPin"
        v-if="notes"
        :notes="notes"/>
        <router-view
        @setPin="setPin"/> 
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
            })
    },

    methods: {
        setPin(noteId) {
            const note = this.notes.find(note => note.id === noteId)
            note.isPinned = !note.isPinned
            noteService.save(note).then(console.log(note.isPinned))
        }
    },

    components: {
        noteFilter,
        noteList,
        noteDetails, //
    },
};
