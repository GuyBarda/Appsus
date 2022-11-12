export default {
    props: ['note'],
    template: `
        <div class="note-todos-container">
            <h3>{{note.info.label}}</h3>
            <ul class="clean-list todos-list undone-list">
                <li v-for="todo in note.info.todos">
                    <div v-if="!todo.isChecked">
                        <label  @click.stop ><input @click.stop="todoState(todo.id , note.id)" type="checkbox" />{{todo.txt}}</label>
                    </div>
                </li>
            </ul>
            <ul class="clean-list todos-list done-list">
                <li v-for="todo in note.info.todos">
                    <div v-if="todo.isChecked">
                        <label class="checked-todo" @click.stop><input @click.stop="todoState(todo.id , note.id)" type="checkbox" checked="todo.isChecked" />{{todo.txt}}</label>
                    </div>
                </li>
            </ul>

            
        </div>
    `,

    data() {
        return {

        }
    },
    computed: {
    },

    methods: {
        todoState(todoId, noteId) {
            const todo = {
                todoId: todoId,
                noteId: noteId
            }

            this.$emit('setTodo', todo)
        }
    },


}