import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"


export default {
    props: ['note'],
    template: `
        <section :style="previewStyle" class="note-preview">

            <section class="note-type">
                <component :is="note.type"  
                :info="note.info">
                </component>
            </section>
            
            <section class="preview-controller">
                <button><i class="fa-solid fa-bell"></i></button>
                <button><i class="fa-solid fa-user-plus"></i></button>
                <button><i class="fa-solid fa-palette"></i></button>
                <button><i class="fa-solid fa-box-archive"></i></button>
                <button><i class="fa-solid fa-circle-chevron-down"></i></button>
 
                <router-link :to="'/keep/' + note.id"><i class="fa-solid fa-pen-to-square"></i></router-link> 
            </section>
           
        </section>
    `,

    created() {
        console.log(this.note);
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