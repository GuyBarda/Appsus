import { eventBus } from "../../../services/event-bus.service.js";

import noteTxt from "./note-txt.cmp.js";
import noteImg from "./note-img.cmp.js";
import noteTodos from "./note-todos.cmp.js";
import colorPicker from "./color-picker.cmp.js";

export default {
    props: ["note"],
    template: `
    <router-link :to="'/keep/' + note.id">
        <section ref="notePreview" :style="previewStyle" class="note-preview">

                <section class="note-type">
                    <component :is="note.type"  
                    :note="note"
                    @setTodo="setTodo">
                    </component>
                </section>
                
                <section class="preview-controller">
                    <button @click.prevent.stop="setPin(note.id)"><i class="fa-solid fa-lg fa-map-pin"></i></button>
                    <button @click.prevent.stop="saveAsEmail"><i class="fa-solid fa-lg fa-user-plus"></i></button>
                    <button @click.prevent.stop="click"><i class="fa-solid fa-lg fa-image"></i></button>
                    <button @click.prevent.stop="click"><i class="fa-solid fa-lg fa-palette"></i></button>
                </section>

                <color-picker :previewWidth="getWidth"  @color="setBgColor" v-if="isColorOpen"></color-picker>
            </section>

        </router-link> 

    `,

    data() {
        return {
            isColorOpen: false,
        };
    },
    methods: {
        saveAsEmail() {
            const { info } = this.note;
            let email = {
                subject: "",
                body: "",
            };
            switch (this.note.type) {
                case "note-txt":
                    email.subject = info.title;
                    email.body = info.txt;
                    break;
                case "note-img":
                    email.subject = info.title;
                    email.body = info.url;
                    break;
                case "note-todos":
                    email.subject = info.label;
                    email.body = Object.values(info.todos);
                    break;
            }
            this.$router.push("/email/compose/" + JSON.stringify(email));
        },
        toggleColor() {
            this.isColorOpen = !this.isColorOpen;
        },
        setBgColor(bgColor) {
            this.backgroundColor = bgColor;
        },
        saveAsEmail() {
            this.$router.push("/email/compose?" + JSON.stringify(this.note));
        },
        setPin(noteId) {
            this.$emit("setPin", noteId);
        },
        click() {
            console.log("click");
        },
    },
    computed: {
        previewStyle() {
            return { backgroundColor: this.note.style.backgroundColor };
        },

        getWidth() {
            return this.$refs.notePreview.offsetWidth;
        },
    },
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        colorPicker,
    },
};
