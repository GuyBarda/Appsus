import emailService from "../services/email-service.js";

export default {
    template: `
        <section v-if="email" class="email-add">
            <form class="email-form" @submit.prevent="addEmail">
                <header class="form-header">
                    <h2>New Email</h2>
                    <button class="btn-close-create" @click="closeCreate">x</button>
                </header>
                <input type="text" name="" v-model="email.to" placeholder="to"/>
                <input type="text" name="" v-model="email.subject" placeholder="subject"/>
                <textarea v-model="email.body" cols="30" rows="10"></textarea>
                <button>submit</button>
            </form>
        </section>
    `,
    data() {
        return {
            email: emailService.getEmptyEmail(),
        };
    },
    created() {
        // this.email = emailService.getEmptyEmail();
    },
    methods: {
        addEmail() {
            this.email.sentAt = Date.now();
            console.log(this.email);
            emailService.save(this.email);
            this.$emit("added", this.email);
            this.$router.push("/email");
        },
        closeCreate() {
            if (this.email.to) {
                this.email.isDraft = true;
                emailService.save(this.email);
            }
            this.$router.push("/email");
        },
    },
    computed: {
        obj() {
            console.log(this.$route.params);
            return this.$route.params.obj;
        },
    },
    watch: {
        obj() {
            if (!this.obj) return;
            const note = JSON.parse(this.$route.params.obj);
            console.log(note);
            this.email.subject = note.title;
            this.email.body = note.txt;
        },
    },
};
