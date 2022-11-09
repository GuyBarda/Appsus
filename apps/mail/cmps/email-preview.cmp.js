export default {
    props: ["email"],
    template: `
        <router-link :to="'/email/' + email.id">
            <div class="email-preview" :class="{read: email.isRead}">
                <input type="checkbox" v-model="email.isRead"/>
                <p>{{email.to}}</p>
                <p>{{email.subject}}</p>
                <p>{{email.body}}</p>
                <p>{{formattedDate}}</p>
            </div>
        </router-link>
    `,
    created() {
        console.log(this.email);
    },
    computed: {
        formattedDate() {
            var options = { day: "numeric", month: "short" };
            //prettier-ignore
            return new Date(this.email.sentAt).toLocaleDateString("en-US", options);
        },
    },
};
