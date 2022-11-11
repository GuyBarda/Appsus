

export default {
    props: ['note'],
    template: `
        <div class="note-img-container">
            <img :src="imgUrl" alt="no img found" />
            <h3 contenteditable @input="saveContent($event,'title')">{{note.info.title}}</h3>
        </div>
    `,

    methods: {
        saveContent(ev, key) {
            this.note.info[key] = ev.target.innerText
        },
    },

    computed: {
        imgUrl() {
            return this.note.info.url
        },
    },
}
