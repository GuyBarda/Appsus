import noteService from "../services/note.service.js"

import colorPicker from "./color-picker.cmp.js"

export default {
    props: [''],
    template: `
    <section @click.stop.prevent="closeColor" class="add-note">
            <form  :style="inputBgColor" class="add-note-inputs" @submit.prevent="add"> 

                <div class="controler-line line1">
                    <input @focus="setDisplayLine" type="text" placeholder="Title..." />
                    <button>
                        <span class="material-symbols-outlined">title</span></button>
                    <button type="button">
                        <span class="material-symbols-outlined">image</span></button>
                    <button type="button">
                        <span class="material-symbols-outlined">smart_display</span></button>
                    <button type="button">
                        <span class="material-symbols-outlined">list</span></button>
                    <button :class="isPin" @click="setPin" type="button">
                        <span class="material-symbols-outlined">push_pin</span></button>
                    
                </div>

                <div v-if="isLineDisplay" class="controler-line line2">
                    <input type="text" placeholder="Note..." />
                    <span @click.stop.prevent class="color-group">
                        <button @click.stop.prevent="openColor" type="button">
                            <span class="material-symbols-outlined">palette</span></button>
                            <color-picker @color="setBgColor" v-if="isColorOpen"></color-picker> 
                        </span>
                    <button class="create-note-btn">Create</button>
                </div>

                <!-- <color-picker @color="setBgColor" v-if="isColorOpen"></color-picker>  -->

            </form>

    </section>
    ` ,
    data() {
        return {
            isColorOpen: false,
            isPinned: false,
            backgroundColor: 'white',
            isLineDisplay: false
        }
    },
    methods: {
        setDisplayLine() {
            this.isLineDisplay = !this.isLineDisplayrue
        },
        openColor() {
            this.isColorOpen = true
        },
        closeColor() {
            this.isColorOpen = false
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