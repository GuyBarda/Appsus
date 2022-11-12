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
            <button class="pin" @click.prevent.stop="setPin(note.id)">
                <span class="material-symbols-outlined">push_pin</span></button>

                <section class="note-type">
                    <component :is="note.type"  
                    :note="note"
                    @setTodo="setTodo">
                    </component>
                </section>

                <section class="preview-controller">
                    <button @click.prevent.stop="toggleColor">
                        <span class="material-symbols-outlined">palette</span></button>
                        <button><span class="material-symbols-outlined">content_copy</span></button>
                        <button @click.prevent.stop="saveAsEmail">
                            <span class="material-symbols-outlined">forward_to_inbox</span></button>
                        <button @click.prevent.stop="duplicate(note.id)"></button>
                </section>

                <color-picker :note="note" @color="setBgColor" v-if="isColorOpen"></color-picker>
            </section>

        </router-link> 

    `,

    data() {
        return {
            isColorOpen: false,
            bgColor: this.note.style.backgroundColor,
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
                    email.subject = info.title;
                    const arrTodos = info.todos.map((todo) => todo.txt);
                    email.body = arrTodos.join(", ");
                    break;
            }
            this.$router.push("/email/compose/" + JSON.stringify(email));
        },
        duplicate(noteId) {
            this.$emit("duplicate", noteId);
        },
        toggleColor() {
            this.isColorOpen = !this.isColorOpen;
        },
        setBgColor(bgColor) {
            this.bgColor = bgColor;
            this.$emit("color", bgColor, this.note.id);
        },
        setPin(noteId) {
            this.$emit("setPin", noteId);
        },
        setTodo(todo) {
            this.$emit("setTodo", todo);
        },
        click() {
            console.log("click");
        },
    },
    computed: {
        previewStyle() {
            return { backgroundColor: this.bgColor };
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
