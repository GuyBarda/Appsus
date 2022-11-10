export default {
    props: ['info'],
    template: `
        <div class="note-todos-container">
            <h3>{{label}}</h3>
            <ul class="clean-list todos-list">
                <li v-for="todo in todos">
                    <label >
                    <input @click.stop type="checkbox" />
                    {{todo.txt}}</label>
                    <button @click.prevernt="remove" class="remove-todo-btn">x</button>
                </li>
            </ul>
        </div>
    `,

    data() {
        return {
            label: this.info.label,
            todos: this.info.todos,
            // id: this.$route.params.id

        }
    },

    created() {
        // this.id = this.$route.params.id
    },

    methods: {
        remove() {
            console.log('remove todo');
        },
    },

    computed: {
        // showRemoveBtn() {
        //     return this.id === true
        // }
    }

}