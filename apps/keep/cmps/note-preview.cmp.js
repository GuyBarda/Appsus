import noteTxt from "./note-txt.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteTodos from "./note-todos.cmp.js"

export default {
    props: ['note'],
    template: `
        <component :is="note.type"  
        :info="note.info">
        </component>
    `,

    components: {
        noteTxt,
        noteImg,
        noteTodos,
    },
}