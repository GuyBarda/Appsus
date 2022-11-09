import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"

export default {
    props: ['note'],
    template: `
        <section class="note-preview">

            <section class="note-info" @click="clicked">
                <component :is="note.type"  
                :info="note.info">
                </component>
            </section>
            
            <section class="preview-controller">
                <button>PIN</button>
                <button>DELETE</button>
                <button>EDIT</button>
                <button>COLOR</button>
                <button>SEND</button>
            </section>
        </section>
    `,

    methods: {
        clicked() {
            console.log('ssss');
        }
    },

    components: {
        noteTxt,
        noteImg,
        noteTodos,
    },
}