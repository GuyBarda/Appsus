import noteService from "../services/note.service.js"

export default {
    props: ['note'],
    template: `
        <div class="note-img-container">
            <h3 contenteditable @input="saveContent($event,'title')">{{note.info.title}}</h3>
            <h3>{{note.info.url}}</h3>
            <!-- <img src="imgUrl" alt="no img found" /> -->
            <button @click="save">x</button>
        </div>
    `,


    methods: {
        saveContent(ev, key) {
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
