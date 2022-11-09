export default {
    props: ["email"],
    template: `
        <router-link :to="'/email/' + email.id">
            <div class="email-preview" :class="{read: email.isRead}">
                <input type="checkbox" v-model="email.isRead"/>
                <p>{{email.to}}</p>
                <p>{{email.subject}}-<span>{{email.body}}</span></p>
                <p>{{formattedDate}}</p>
                <div class="actions">
                    <button @click.prevent="$emit('remove', email.id)">x</button>
                    <button @click.prevent="$emit('star')">star</button>
                </div>
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
