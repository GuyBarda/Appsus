
import noteService from "../services/note.service.js"

import addNote from "../cmps/add-note.cmp.js"
import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteDetails from "./note-details.cmp.js" //

export default {

    template: `
    <section class="keep-app main-layout">
        <h1>hello keep!</h1>
        <add-note
        @updateData="getNotes"/>
        <!-- <note-filter/> -->
        <note-list
        v-if="notes"
        @setPin="setPin"
        @setTodo="setTodo"
        :notes="notes"/>
        <router-view
        @updateData="getNotes"
        @setPin="setPin"
        @setTodo="setTodo"/> 
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
            noteService.query()
                .then(notes => {
                    this.notes = notes
                })
        },

        setPin(noteId) {
            const note = this.notes.find(note => note.id === noteId)
            note.isPinned = !note.isPinned
            noteService.save(note).then(console.log(note.isPinned))
        },

        setTodo(todo) {
            const { todoId, noteId } = todo

            noteService.get(noteId)
                .then(note => {
                    const todoIdx = note.info.todos.findIndex(todo => todo.id === todoId)
                    if (!note.info.todos[todoIdx].doneAt) {
                        note.info.todos[todoIdx].doneAt = Date.now()
                    } else {
                        note.info.todos[todoIdx].doneAt = null
                    }
                    noteService.save(note)
                        .then(console.log('sace'))
                })
        }
    },

    components: {
        addNote,
        noteFilter,
        noteList,
        noteDetails, //
    },
};
