import noteService from "../services/note.service.js"

export default {
    props: ['note'],
    template: `
        <div class="note-todos-container">
            <h3 contenteditable @input="saveContent($event,'label')">{{note.info.label}}</h3>
            <ul class="clean-list todos-list">
                <li v-for="todo in note.info.todos">
                    <label >
                    <input @click.stop type="checkbox" />
                    {{todo.txt}}</label>
                    <button class="remove-todo-btn">x</button>
                </li>
            </ul>
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