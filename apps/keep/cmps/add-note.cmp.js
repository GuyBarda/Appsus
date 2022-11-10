import noteService from "../services/note.service.js"

export default {
    props: [''],
    template: `
    <section class="add-note">

            <form class="add-note-inputs" @submit.prevent="add">
                <input :style="inputBgColor" type="text" placeholder="Title..." />
                <input :style="inputBgColor" type="text" placeholder="Note..." />

                <div class="controler">
                    <button :class="isPin" @click="setPin" type="button"><i class="fa-solid fa-lg fa-map-pin"></i></button>
                    <button type="button"><i class="fa-solid fa-lg fa-image"></i></button>
                    <button @click="toggleColor" type="button"><i class="fa-solid fa-lg fa-palette"></i></button>
                </div>

                <button>Add note!</button>

                <div v-if="isColorOpen" class="color-container">
                    <div @click="setBgColor('#d63031')" style="background-color: #d63031;"></div>
                    <div @click="setBgColor('#e17055')" style="background-color: #e17055;"></div>
                    <div @click="setBgColor('#fdcb6e')" style="background-color: #fdcb6e;"></div>
                    <div @click="setBgColor('#0984e3')" style="background-color: #0984e3;"></div>
                    <div @click="setBgColor('#00cec9')" style="background-color: #00cec9;"></div>
                    <div class="white" @click="setBgColor('white')"></div>
                </div>
            </form>

    </section>
    ` ,

    data() {
        return {
            isColorOpen: false,
            isPinned: false,
            backgroundColor: 'white'
        }
    },


    methods: {

        toggleColor() {
            this.isColorOpen = !this.isColorOpen
        },

        setBgColor(bgColor) {
            this.backgroundColor = bgColor
        },


        setPin() {
            this.isPinned = !this.isPinned
        },

        add(ev) {
            console.log(ev.target[0].value)
            console.log(ev.target[1].value)

            const note = noteService.getEmptyTxtNote(ev.target[0].value, ev.target[1].value, this.isPinned, this.backgroundColor)

            noteService.save(note)
                .then(res => {
                    console.log(res)
                    this.$emit('updateData')
                })
        },

    },

    computed: {
        isPin() {
            return { active: this.isPinned === true }
        },

        inputBgColor() {
            return { backgroundColor: this.backgroundColor }
        }

    }

}