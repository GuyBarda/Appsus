import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"


export default {
    props: ['note'],
    template: `
        <section :style="previewStyle" class="note-preview">
            <router-link :to="'/keep/' + note.id">
            <section class="note-type">
                <component :is="note.type"  
                :info="note.info">
                </component>
            </section>
        </router-link> 
            
            <section class="preview-controller">
                <button @click.prevernt="setPin(note.id)"><i class="fa-solid fa-map-pin"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-bell"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-user-plus"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-image"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-palette"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-circle-chevron-down"></i></button>
            </section>
        </section>
    `,

    created() {

    },

    methods: {
        setPin(noteId) {
            console.log(noteId)
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