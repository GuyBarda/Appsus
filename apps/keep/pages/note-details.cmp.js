import noteService from "../services/note.service.js";

export default {
  template: `

       <div v-if="note" class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              
              <section class="note-type">
                <component :is="note.type"  
                :info="note.info">
                </component>
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

  components: {

  }


};
