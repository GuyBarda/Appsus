import emailService from "../services/email-service.js";

export default {
    props: [""],
    template: `
        <pre>{{email}}</pre>
    `,
    data() {
        return {
            email: null,
            // isReview: false,
        };
    },
    created() {
        const id = this.$route.params.id;
        emailService.get(id).then((email) => (this.email = email));
    },
};
