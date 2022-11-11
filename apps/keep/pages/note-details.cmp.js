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
              
              <section class="note-type">
                <component :is="note.type"  
                :note="note"
                @setTodo="setTodo"
                @updateData="$emit('updateData')">
                </component>
              </section>

              <section class="preview-controller">
                <button @click.prevernt="setPin(note.id)"><i class="fa-solid fa-lg fa-map-pin"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-lg fa-user-plus"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-lg fa-image"></i></button>
                <button @click.prevernt="toggleColor"><i class="fa-solid fa-lg fa-palette"></i></button>
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
