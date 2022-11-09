export default {
    props: ['info'],
    template: `
        <div class="note-todos-container">
            <h3>{{label}}</h3>
            <ul class="clean-list todos-list">
                <li v-for="todo in todos">
                    <input type="checkbox" />
                    <label >{{todo.txt}}</label>
                </li>
            </ul>
        </div>
    `,

    data() {
        return {
            label: this.info.label,
            todos: this.info.todos
        }
    },

    created() {
    }

}