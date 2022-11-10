import { eventBus } from "../../../services/event-bus.service.js"

import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"



export default {
    props: ['note'],
    template: `
        <section :style="previewStyle" class="note-preview">
            <router-link @click="setSelectedNote(note.id)" :to="'/keep/' + note.id">
                <h1 style="font-size: 20px;">{{note.isSelectedNote}}</h1>
            <section class="note-type">
                <component :is="note.type"  
                :info="note.info">
                </component>
            </section>
        </router-link> 
            
            <section class="preview-controller">
                <button @click.prevernt="setPin(note.id)"><i class="fa-solid fa-lg fa-map-pin"></i></button>
                <button @click.prevernt="$emit('save-as-email' , note)"><i class="fa-solid fa-lg fa-user-plus"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-lg fa-image"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-lg fa-palette"></i></button>
            </section>
        </section>
    `,

    created() {
        eventBus.on('save-as-email', eventBus.saveAsEmail)
        // eventBus.on('show-msg', this.showMsg)
    },

    methods: {


        setSelectedNote(noteId) {
            this.$emit('setSelectedNote', noteId)
        },

        setPin(noteId) {
            this.$emit('setPin', noteId)
        },
        click() {
            console.log('click');
        }
    },

    computed: {
        previewStyle() {
            return { backgroundColor: this.note.style.backgroundColor }
        }
    },

    components: {
        noteTxt,
        noteImg,
        noteTodos,

    },
}