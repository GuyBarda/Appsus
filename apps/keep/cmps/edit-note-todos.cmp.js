

export default {
    props: ['note'],
    template: `
        <div class="note-todos-container">
            <h3 contenteditable @input="saveContent($event,'title')">{{note.info.title}}</h3>
            <ul class="clean-list todos-list undone-list">

                <li v-for="(todo , idx) in note.info.todos">
                    <div v-if="!todo.doneAt">
                        <input @click.stop="todoState(todo.id , note.id)" type="checkbox" />
                        <span contenteditable @input="saveContentTxt($event , idx)">
                            {{todo.txt}}
                        </span>
                        <button class="remove-todo-btn">x</button>
                    </div>
                </li>
            </ul>
        <hr />
              <ul class="clean-list todos-list undone-list">

                <li v-for="(todo , idx) in note.info.todos">
                    <div v-if="todo.doneAt">
                        <input @click.stop="todoState(todo.id , note.id)" type="checkbox" />
                        <span contenteditable @input="saveContentTxt($event , idx)">
                            {{todo.txt}}
                        </span>
                        <button class="remove-todo-btn">x</button>
                    </div>
                </li>
            </ul>
        </div>
    `,

    methods: {
        saveContent(ev, key) {
            console.log(key);
            this.note.info[key] = ev.target.innerText
        },

        saveContentTxt(ev, idx) {
            console.log(idx);
            this.note.info.todos[idx].txt = ev.target.innerText
        },

        todoState(todoId, noteId) {
            const todo = {
                todoId: todoId,
                noteId: noteId
            }

            this.$emit('setTodo', todo)
        }

    },

}