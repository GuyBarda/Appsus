import emailService from "../services/email-service.js";

import emailFilter from "../cmps/email-filter.cmp.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFolders from "../cmps/email-folders.cmp.js";

export default {
    template: `
    <section class="email-app">
        <h1>hello email</h1>
        <email-filter @filter="changedCriteriaTxt"></email-filter>
        <email-folders @filter="changedCriteriaStatus"></email-folders>
        <email-list v-if="emails.length" :emails="emailsToShow"></email-list>
    </section>
    `,
    data() {
        return {
            emails: [],
            criteria: {
                status: "",
                txt: "",
            },
        };
    },
    created() {
        emailService.query().then((emails) => (this.emails = emails));
    },
    methods: {
        changedCriteriaTxt(txt) {
            this.criteria.txt = txt;
        },
        changedCriteriaStatus(status) {
            this.criteria.status = status;
        },
    },
    computed: {
        emailsToShow() {
            const { email: logEmail } = emailService.loggedinUser;
            switch (this.criteria.status) {
                case "inbox":
                    // this.emails = this.emails.filter((email) => {
                    //     console.log(email.to, logEmail);
                    //     email.to === logEmail;
                    // });
                    console.log(this.emails);
                    break;
                case "sent":
                    break;
                default:
            }
            console.log(this.emails);
            return this.emails.filter(
                (email) =>
                    email.body.includes(this.criteria.txt) ||
                    email.subject.includes(this.criteria.txt)
            );
        },
    },
    components: {
        emailFilter,
        emailList,
        emailFolders,
    },
};
