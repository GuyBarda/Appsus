import notePreview from "./note-preview.cmp.js"
import noteTodos from "./note-todos.cmp.js" //

export default {
    props: ['notes'],
    template: `
    <section class="note-list">
        <ul class="clean-list">
            <li v-for="note in notes" :key="note.id">
                <note-preview
                :note="note"/>
            </li>
        </ul>
    </section>
    `,

    components: {
        notePreview,
        noteTodos, //
    },
};
