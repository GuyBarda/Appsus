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
            email: null,
        };
    },
    created() {
        this.email = emailService.getEmptyEmail();
        this.loadEmail();
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
        loadEmail() {
            const note = JSON.parse(this.$route.params.obj);
            this.email.subject = note.subject;
            this.email.body = note.body;
        },
    },
    computed: {
        obj() {
            return this.$route.params.obj;
        },
    },
    watch: {
        obj() {
            if (this.$route.params.obj !== 1 || !this.$route.params.obj) return;
            this.loadEmail();
        },
    },
};
