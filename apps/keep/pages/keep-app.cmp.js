
import noteService from "../services/note.service.js"

import addNote from "../cmps/add-note.cmp.js"
import noteSearch from "../cmps/note-search.cmp.js"
import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteDetails from "./note-details.cmp.js" //

export default {

    template: `
    <section class="keep-app main-layout">
        <note-search
        @search="setSearch"/>
        <note-filter
        @filter="setFilter"/>
        <add-note
        @updateData="getNotes"/>
        <note-list
        v-if="notes"
        @color="setBgColor"
        @duplicate="duplicate"
        @setPin="setPin"
        @setTodo="setTodo"
        :notes="notesToShow"/>
        <router-view
        @updateData="getNotes"
        @setPin="setPin"
        @setTodo="setTodo"/> 
    </section>
    `,

    data() {
        return {
            notes: null,
            filterBy: {
                type: '',
                title: '',
            }
        }
    },

    created() {
        this.getNotes()
    },

    methods: {
        getNotes() {
            // this.notes = null
            noteService.query()
                .then(notes => {
                    console.log('query', notes);
                    this.notes = notes
                })
        },

        setBgColor(bgColor) {
            console.log(bgColor)
        },

        duplicate(noteId) {
            const note = { ...this.notes.find(note => note.id === noteId) }
            note.id = null

            noteService.save(note).then(note => {
                console.log(note);
                this.getNotes()
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
                    // const todoIdx = note.info.todos.findIndex(todo => todo.id === todoId)
                    noteService.toggleTodo(noteId, todoId).then(newTodo => {
                        const noteToUpdate = this.notes.find(note => note.id === noteId)
                        const toggledTodo = noteToUpdate.info.todos.find(todo => todo.id === newTodo.id)
                        toggledTodo.isChecked = !toggledTodo.isChecked
                        noteService.save(noteToUpdate)
                            .then(() => {
                                this.getNotes()
                            })
                    })
                })
        },
        setFilter(filterBy) {
            this.filterBy.type = filterBy.type
            console.log(filterBy);
        },

        setSearch(filterBy) {
            this.filterBy.title = filterBy.title
            console.log(filterBy);
        }
    },

    computed: {
        notesToShow() {
            const regex = new RegExp(this.filterBy.title, 'i')
            var notes = this.notes.filter(note => regex.test(note.info.title))
            console.log(notes);

            if (this.filterBy.type === '') return notes
            var newNotes = notes.filter(note => note.type === this.filterBy.type)
            return newNotes
        },
    },
    components: {
        addNote,
        noteSearch,
        noteFilter,
        noteList,
        noteDetails, //
    },
}
