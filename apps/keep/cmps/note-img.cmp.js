export default {
    props: ['info'],
    template: `
        <div class="note-img-container">
            <h3>{{title}}</h3>
            <!-- <img src="imgUrl" alt="no img found" /> -->
        </div>
    `,

    data() {
        return {
            title: this.info.title,
            imgUrl: this.info.url
        }
    },

}