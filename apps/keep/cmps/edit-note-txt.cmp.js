import noteService from "../services/note.service.js"

export default {
    props: ['note'],
    template: `
        <div class="-edit-note-txt-container">
            <h3 contenteditable @input="saveContent($event,'title')">{{note.info.title}}</h3>
            <button @click="save">x</button>
            <p contenteditable @input="saveContent($event,'txt')">{{note.info.txt}}</p>
        </div>
    `,

    methods: {
        saveContent(ev, key) {
            console.dir(ev.target.innerText);
            this.note.info[key] = ev.target.innerText
        },

        save() {
            noteService.save(this.note)
                .then(note => {
                    // showSuccessMsg(`Car saved (Car id: ${car.id})`)
                    this.$router.push('/keep')
                    this.$emit('updateData')
                })
                .catch(err => {
                    console.log('OOps:', err)
                    // showErrorMsg(`Cannot save car`)
                })
        },
    },

}