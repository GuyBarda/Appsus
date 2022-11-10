import noteService from "../services/note.service.js";

import noteTxt from "../cmps/edit-note-txt.cmp.js"
import noteImg from "../cmps/edit-note-img.cmp.js"
import noteTodos from "../cmps/edit-note-todos.cmp.js"

export default {
  template: `

       <div v-if="note" class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container" :style="previewStyle">
              
              <section class="note-type">
                <component :is="note.type"  
                :note="note"
                @updateData="$emit('updateData')">
                </component>
              </section>

              <section class="preview-controller">
                <button @click.prevernt="setPin(note.id)"><i class="fa-solid fa-lg fa-map-pin"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-lg fa-user-plus"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-lg fa-image"></i></button>
                <button @click.prevernt="click"><i class="fa-solid fa-lg fa-palette"></i></button>
              </section>
              
            </div>
          </div>
        </div>
    `,

  data() {
    return {
      note: null,
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
    setPin(noteId) {
      console.log(noteId)
      this.$emit('setPin', noteId)
    },

    editTxt(txt) {
      console.log(txt, this.note);
      this.note.info.txt = txt
      noteService.save(this.note)
        .then(note => {
          this.note = note
          this.$emit('updateData')

        })
    },

    click() {
      console.log('click');
    },
  },
  watch: {
    note: {
      handler() {
        console.log('Something changed')
      },
    }
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
  }
};
