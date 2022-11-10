import noteService from "../services/note.service.js";
import notePreview from "./note-preview.cmp.js"


export default {
    props: ['notes'],
    template: `
    <section class="note-lists">
        <div>
            <h5 v-if="showPinnedHeader">Pinned</h5>
            <section class="unpinned-list">
                
                <ul class="clean-list">
                    <li v-for="note in notes" :key="note.id">
                        <note-preview
                        @setSelectedNote="setSelectedNote"
                        @setPin="setPin"
                        v-if="note.isPinned"
                        :note="note"/>
                    </li>
                </ul>
            </section>
        </div>
        <div>
            <h5 v-if="showPinnedHeader">Others</h5> 
            <section class="pinned-list">
                <ul class="clean-list">
                    <li v-for="note in notes" :key="note.id">
                        <note-preview
                        @setSelectedNote="setSelectedNote"
                        @setPin="setPin"
                        v-if="!note.isPinned"
                        :note="note"/>  
                    </li>
                </ul>
            </section>
        </div>

             
    </section>
    `,

    methods: {
        setSelectedNote(noteId) {
            this.$emit('setSelectedNote', noteId)
        },

        setPin(noteId) {
            this.$emit('setPin', noteId)
        }
    },

    computed: {
        showPinnedHeader() {
            const isPinned = (note) => note.isPinned === true
            return this.notes.some(isPinned)
        },

        // showUnpinnedHeader() {
        //     const isPinned = (note) => note.isPinned === true
        //     return this.notes.every(isPinned) || this.notes.some(isPinned)
        // }
    },

    components: {
        notePreview,
    },
};
