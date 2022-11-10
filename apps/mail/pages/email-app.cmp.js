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
        <email-folders @create="isCreate = true" @filter="changeCriteria"></email-folders>
        <email-list @remove="removeEmail" @trash="trashEmail" @star="starEmail" v-if="emails.length" :emails="emails"></email-list>
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
            count: {
                inbox: 0,
                sent: 0,
                starred: 0,
                draft: 0,
                trash: 0,
            },
        };
    },
    created() {
        this.getFilteredEmails();
    },
    methods: {
        changedCriteriaTxt(txt) {
            if (this.criteria.txt === txt) return;
            this.criteria.txt = txt;
            this.getFilteredEmails();
        },
        changeCriteria(criteria) {
            // if (this.criteria === criteria) return;
            this.criteria = criteria;
            this.getFilteredEmails();
        },
        refreshEmails() {
            this.getFilteredEmails();
            this.isCreate = false;
        },
        getFilteredEmails() {
            emailService
                .query(this.criteria)
                .then((emails) => (this.emails = emails));
        },
        trashEmail(email) {
            console.log(email);
            email.isTrash = true;
            emailService.save(email).then(() => {
                this.getFilteredEmails();
            });
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
