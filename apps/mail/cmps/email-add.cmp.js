import emailService from "../services/email-service.js";

export default {
    template: `
        <section v-if="email" class="email-add">
            <form class="email-form" @submit.prevent="addEmail">
                <h2>New Email</h2>
                <input type="text" name="" v-model="email.to" placeholder="to"/>
                <input type="text" name="" v-model="email.subject" placeholder="subject"/>
                <textarea v-model="email.body" cols="30" rows="10"></textarea>
                <button class="submit">submit</button>
            </form>
            <div class="btn-close-create" @click="closeCreate"><i class="fa-regular fa-circle-xmark"></i></div>
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
    mounted() {
        this.loadEmail();
    },
    methods: {
        addEmail() {
            this.email.sentAt = Date.now();
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
            if (note === 1) return;
            this.email.subject = note.subject;
            this.email.body = note.body.replaceAll("-", "/");
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
