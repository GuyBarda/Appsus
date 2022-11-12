import noteService from "../services/note.service.js";

import noteTxt from "../cmps/edit-note-txt.cmp.js"
import noteImg from "../cmps/edit-note-img.cmp.js"
import noteTodos from "../cmps/edit-note-todos.cmp.js"
import colorPicker from "../cmps/color-picker.cmp.js"

export default {
  template: `

       <div @click.stop.prevent="save" v-if="note" class="modal-mask">
          <div class="modal-wrapper">
            <div @click.stop.prevent="" class="modal-container" :style="previewStyle">
              <button class="pin" @click.prevent.stop="setPin(note.id)">
                  <span class="material-symbols-outlined">push_pin</span></button>
              
              <section class="note-type">
                <component :is="note.type"  
                :note="note"
                @setTodo="setTodo"
                @updateData="$emit('updateData')">
                </component>
              </section>

              <section class="preview-controller">
                <button @click.prevent.stop="click">
                  <span class="material-symbols-outlined">palette</span></button>
                  <button @click.prevent.stop="duplicate(note.id)">
                    <span class="material-symbols-outlined">content_copy</span></button>
                    <button @click.prevent.stop>
                        <span class="material-symbols-outlined">forward_to_inbox</span></button>
              </section>
              
              <color-picker @color="setBgColor" v-if="isColorOpen"></color-picker>
            
            </div>
          </div>
        </div>
    `,

  data() {
    return {
      note: null,
      isColorOpen: false,
    }
  },

  created() {
    const id = this.$route.params.id
    noteService.get(id)
      .then(note => {
        this.note = note
        console.log(this.note);
      })
  },

  methods: {

    save() {
      noteService.save(this.note)
        .then(note => {
          // showSuccessMsg(`Car saved (Car id: ${car.id})`)
          this.$router.push('/keep')
          this.$emit('updateData')
        })
        .catch(err => {
          console.log('OOps:', err)
          // showErrorMsg(`Cannot save car`)
        })
    },

    clicked() {
      console.log('clicked');
    },

    setBgColor(bgColor) {
      console.log(bgColor)
      this.note.style.backgroundColor = bgColor
      noteService.save(this.note)
        .then(console.log(bgColor))

        .catch(err => {
          console.log('OOps:', err)
        })
    },

    toggleColor() {
      this.isColorOpen = !this.isColorOpen
      console.log('sss');
    },
    setPin(noteId) {
      this.$emit('setPin', noteId)
    },

    setTodo(todo) {
      this.$emit('setTodo', todo)
    },

    click() {
      console.log('click');
    },
  },

  computed: {
    previewStyle() {
      return { backgroundColor: this.note.style.backgroundColor }
    }
  },
  components: {
    noteTxt,
    noteImg,
    noteTodos,
    colorPicker
  }
};
