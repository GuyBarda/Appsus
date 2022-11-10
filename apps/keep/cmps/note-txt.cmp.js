export default {
    props: ['info'],
    template: `
        <div class="note-txt-container">
            <h3>{{title}}</h3>
            <p contenteditable @blur="editTxt">{{txt}}</p>
            <!-- <input type="text" v-model="title"> -->
        </div>
    `,

    data() {
        return {
            title: this.info.title,
            txt: this.info.txt,
        }
    },

    methods: {
        editTxt(ev) {
            var src = ev.target.innerText
            this.txt = src
            this.$emit('editTxt', this.txt)
        }
    },

}