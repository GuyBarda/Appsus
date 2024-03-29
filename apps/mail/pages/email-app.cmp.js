import emailService from '../services/email-service.js';

import emailFilter from '../cmps/email-filter.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailFolders from '../cmps/email-folders.cmp.js';
import emailAdd from '../cmps/email-add.cmp.js';

export default {
    template: `
    <section class="email-app">
        <h1 class="email-header">Email</h1>
        <email-filter @sort="sortEmails" @filter="changedCriteriaTxt"></email-filter>
        <email-folders @create="isCreate = true" @filter="changeCriteria"></email-folders>
        <email-list v-if="emails.length && !isReview"  @save="saveEmail" @remove="removeEmail" @trash="trashEmail" @star="saveEmail"  :emails="emails"></email-list>
        <h3 v-else>no emails found</h3>
        <router-view @review="changeReview" @added="refreshEmails" @close="isCreate = false"></router-view>
    </section>`,
    data() {
        return {
            emails: [],
            criteria: {
                status: 'inbox',
                txt: '',
                isRead: null,
                isStared: null,
            },
            isCreate: false,
            isReview: false,
        };
    },
    created() {
        this.getFilteredEmails();
        this.isReview = false;
    },
    mounted() {
        this.getFilteredEmails();
        this.isReview = false;
    },
    methods: {
        sortEmails(sortBy) {
            switch (sortBy) {
                case 'ab':
                    this.emails = this.emails.sort((email1, email2) =>
                        email1.subject.localeCompare(email2.subject)
                    );
                    break;
                case 'date':
                    this.emails = this.emails.sort(
                        (email1, email2) => email1.sentAt - email2.sentAt
                    );
                    break;
            }
        },
        changeReview(isReview) {
            this.isReview = isReview;
        },
        changedCriteriaTxt(txt) {
            if (this.criteria.txt === txt) return;
            this.criteria.txt = txt;
            this.getFilteredEmails();
        },
        changeCriteria(criteria) {
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
            email.isTrash = true;
            this.saveEmail(email);
        },
        removeEmail(emailId) {
            if (!confirm('Are you sure')) return;
            emailService.remove(emailId).then(() => {
                this.emails = this.emails.filter(
                    (email) => email.id !== emailId
                );
            });
        },
        saveEmail(email) {
            emailService.save(email).then(() => {
                this.getFilteredEmails();
            });
        },
    },
    components: {
        emailFilter,
        emailList,
        emailFolders,
        emailAdd,
    },
};
