import noteService from "../services/note.service.js"

export default {
    props: [''],
    template: `
    <section class="add-note">

        <div class="add-note-inputs">
            <form @submit.prevent="add">
                <input type="text" placeholder="Title..." />
                <input type="text" placeholder="Note..." />
            </form>
        </div>

        <div class="add-note-control">
            <!-- <button @click.prevernt="click"><i class="fa-solid fa-lg fa-image"></i></button>
            <button @click.prevernt="click"><i class="fa-solid fa-lg fa-palette"></i></button> -->
        </div>

    </section>
    ` ,


    methods: {

        add() {

        },

    }
}