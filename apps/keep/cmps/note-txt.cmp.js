export default {
    props: ['note'],
    template: `
        <div class="note-txt-container">
            <h3>{{note.info.title}}</h3>
            <p >{{note.info.txt}}</p>
        </div>
    `,

    data() {
        return {

        }
    },

}