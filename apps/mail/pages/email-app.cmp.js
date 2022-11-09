import emailService from "../services/email-service.js";

import emailFilter from "../cmps/email-filter.cmp.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFolders from "../cmps/email-folders.cmp.js";
import emailAdd from "../cmps/email-add.cmp.js";

export default {
    template: `
    <section class="email-app">
        <h1>Email</h1>
        <email-filter @filter="changedCriteriaTxt"></email-filter>
        <email-folders @create="isCreate = true" @filter="changedCriteriaStatus"></email-folders>
        <email-list @remove="removeEmail" @star="starEmail" v-if="emails.length" :emails="emails"></email-list>
        <email-add @added="refreshEmails" @close="isCreate = false" v-if="isCreate"></email-add>
    </section>
    `,
    data() {
        return {
            emails: [],
            criteria: {
                status: "inbox",
                txt: "",
                isRead: null,
                isStared: null,
                lables: ["important", "romantic"],
            },
            isCreate: false,
        };
    },
    created() {
        this.refreshEmails();
    },
    methods: {
        changedCriteriaTxt(txt) {
            this.criteria.txt = txt;
            // emailService
            //     .query(this.criteria)
            //     .then((emails) => (this.emails = emails));
        },
        changedCriteriaStatus(status) {
            this.criteria.status = status;
            emailService
                .query(this.criteria)
                .then((emails) => (this.emails = emails));
        },
        refreshEmails() {
            emailService
                .query(this.criteria)
                .then((emails) => (this.emails = emails));
            this.isCreate = false;
        },
        removeEmail(emailId) {
            emailService.remove(emailId).then(() => {
                this.emails = this.emails.filter(
                    (email) => email.id !== emailId
                );
            });
        },
    },
    computed: {
        emailsToShow() {
            // return
        },
    },
    components: {
        emailFilter,
        emailList,
        emailFolders,
        emailAdd,
    },
};
