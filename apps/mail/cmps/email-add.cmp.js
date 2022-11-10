import emailService from "../services/email-service.js";

export default {
    template: `
        <section v-if="email" class="email-add">
            <form class="email-form" @submit.prevent="addEmail">
                <header class="form-header debug">
                    <h2>New Email</h2>
                    <button class="btn-close-create" @click="closeCreate">x</button>
                </header>
                <input type="text" name="" v-model="email.to" placeholder="to"/>
                <input type="text" name="" v-model="email.subject" placeholder="subject"/>
                <textarea class="debug" v-model="email.body" cols="30" rows="10"></textarea>
                <button class="debug">submit</button>
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
    },
    methods: {
        addEmail() {
            emailService.save(this.email);
            this.$emit("added", this.email);
        },
        closeCreate() {
            if (this.email.to) {
                this.email.isDraft = true;
                emailService.save(this.email);
            }
            this.$router.push("/email");
        },
    },
};
