
import noteService from "../services/note.service.js"

import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteDetails from "./note-details.cmp.js" //

export default {
    template: `
    <section class="keep-app main-layout">
        <h1>hello keep!</h1>
        <note-filter/>
        <note-list
        @setSelectedNote="setSelectedNote"
        @setPin="setPin"
        v-if="notes"
        :notes="notes"/>
        <router-view
        @updateData="getNotes"
        @setPin="setPin"/> 
    </section>
    `,

    data() {
        return {
            notes: null
        }
    },

    created() {
        this.getNotes()
    },

    methods: {
        getNotes() {
            this.notes = null
            console.log('getNotes');
            noteService.query()
                .then(notes => {
                    this.notes = notes
                })
        },

        setSelectedNote(noteId) {
            console.log(noteId)
        },

        setPin(noteId) {
            const note = this.notes.find(note => note.id === noteId)
            note.isPinned = !note.isPinned
            noteService.save(note).then(console.log(note.isPinned))
        },

    },

    components: {
        noteFilter,
        noteList,
        noteDetails, //
    },
};
