import emailFilter from "../apps/mail/cmps/email-filter.cmp.js";
import emailList from "../apps/mail/cmps/email-list.cmp.js";

export default {
    template: `
    <h1>hello email</h1>
    <section class="email-app">
        <email-filter></email-filter>
        <email-list></email-list>
    </section>
    `,
    components: {
        emailFilter,
        emailList,
    },
};
