export default {
    props: ['info'],
    template: `
        <div class="note-txt-container">
            <h3>{{title}}</h3>
            <p>{{txt}}</p>
        </div>
    `,

    data() {
        return {
            title: this.info.title,
            txt: this.info.txt,
        }
    },

}