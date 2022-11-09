import emailService from "../services/email-service.js";

export default {
    template: `
        <div v-if="email" class="email-add">
            <form @submit.prevent="addEmail">
                <h2>New Email</h2>
                <label htmlFor="">to</label>
                <input type="text" name="" v-model="email.to"/>
                <label htmlFor="">subject</label>
                <input type="text" name="" v-model="email.subject"/>
                <textarea v-model="email.body" cols="30" rows="10"></textarea>
                <button>submit</button>
            </form>
            <button @click="closeCreate">x</button>
        </div>
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
            this.$emit("close");
        },
    },
};
