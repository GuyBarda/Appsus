export default {
    props: ['info'],
    template: `
        <div class="note-txt-container">
            <h3>{{txt}}</h3>
        </div>
    `,

    data() {
        return {
            txt: this.info.txt
        }
    },

}