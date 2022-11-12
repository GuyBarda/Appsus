import noteService from "../services/note.service.js"

import colorPicker from "./color-picker.cmp.js"

export default {
    props: [''],
    template: `
    <section @click.stop="closeColor" class="add-note">
            <form @submit.prevent="add" :style="inputBgColor" class="add-note-inputs" > 
    
                <div class="controler-line line1">
                    <input @focus="setDisplayLine" type="text" placeholder="Title..." />
                    <button type="button" @click="setType('note-txt')">
                        <span class="material-symbols-outlined">title</span></button>
                    <button type="button" @click="setType('note-img')">
                        <span class="material-symbols-outlined">image</span></button>
                    <!-- <button type="button">
                        <span class="material-symbols-outlined">smart_display</span></button> -->
                    <button type="button" @click="setType('note-todos')">
                        <span class="material-symbols-outlined">list</span></button>
                    <button :class="isPin" @click="setPin" type="button">
                        <span class="material-symbols-outlined">push_pin</span></button>                 
                </div>

                <div v-if="isLineDisplay" class="controler-line line2">
                    <input type="text" :placeholder="placeholderDisplay" />
                    <span @click.stop.prevent class="color-group">
                        <button @click.stop.prevent="openColor" type="button">
                            <span class="material-symbols-outlined">palette</span></button>
                            <color-picker @color="setBgColor" v-if="isColorOpen"></color-picker> 
                        </span>
                    <button class="create-note-btn">Create</button>
                </div>
            </form>

    </section>
    ` ,
    data() {
        return {
            isColorOpen: false,
            isPinned: false,
            isLineDisplay: false,
            backgroundColor: 'white',
            type: 'note-txt'
        }
    },
    methods: {

        add(ev) {
            const type = this.type
            const isPinned = this.isPinned
            const bgc = this.backgroundColor
            const title = ev.target[0].value
            const val = ev.target[6].value

            noteService.addNote(type, isPinned, bgc, title, val)
                .then(() => this.$emit('updateData'))
        },

        setType(type) {
            this.type = type
        },

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
    },
    computed: {
        placeholderDisplay() {
            if (this.type === 'note-txt') return 'Say somthig..'
            if (this.type === 'note-img') return 'Image URL'
            if (this.type === 'note-todos') return 'Comma separated todos'
        },
        isPin() {
            return { active: this.isPinned === true }
        },

        inputBgColor() {
            return { backgroundColor: this.backgroundColor }
        },

    },
    components: {
        colorPicker,
    },

}


