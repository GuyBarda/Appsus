import noteService from "../services/note.service.js"

import colorPicker from "./color-picker.cmp.js"

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
                
                <color-picker @color="setBgColor" v-if="isColorOpen"></color-picker>
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
    },
    components: {
        colorPicker,
    },
}