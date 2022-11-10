export default {
    props: ["email"],
    template: `
        <router-link :to="'/email/' + email.id">
            <div class="email-preview" :class="{read: email.isRead}">
                <input @click.stop="$emit('save', email)" type="checkbox" v-model="email.isRead"/>
                <p>{{email.to}}</p>
                <p>{{email.subject}}-<span>{{email.body}}</span></p>
                <p>{{formattedDate}}</p>
                <div class="actions ">
                    <button v-if="email.isTrash" @click.prevent="$emit('remove', email.id)">remove</button>
                    <button v-else @click.prevent="$emit('trash', email)">trash</button>
                    <button @click.prevent="$emit('star')">star</button>
                </div>
            </div>

        </router-link>
    `,
    methods: {
        save() {},
    },
    computed: {
        formattedDate() {
            var options = { day: "numeric", month: "short" };
            //prettier-ignore
            return new Date(this.email.sentAt).toLocaleDateString("en-US", options);
        },
    },
};
