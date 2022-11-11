

export default {
    props: ['note'],
    template: `
        <div class="-edit-note-txt-container">
            <h3 contenteditable @input="saveContent($event,'title')">{{note.info.title}}</h3>
            <p contenteditable @input="saveContent($event,'txt')">{{note.info.txt}}</p>
        </div>
    `,

    methods: {
        saveContent(ev, key) {
            this.note.info[key] = ev.target.innerText
        },

    },

}