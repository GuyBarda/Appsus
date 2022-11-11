export default {
    props: ['note'],
    template: `
        <div class="note-img-container">
            <img :src="imgUrl" alt="no img found" />
            <h3>{{note.info.title}}</h3>
        </div>
    `,

    data() {
        return {

        }
    },

    computed: {
        imgUrl() {
            return this.note.info.url
        },
    }
}