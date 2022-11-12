export default {
    props: ["email"],
    template: `
        <router-link @click="goTo" :to="'/email/' +email.id">
            <div class="email-preview" :class="{read: email.isRead}">
                <!-- <input @click.stop="$emit('save', email)" type="checkbox" v-model="email.isRead"/> -->
                <button class="btn-star" @click.prevent.stop="starEmail" :class="{'btn-star-active': email.isStarred}">
                    <i class="fa-regular fa-star"></i>
                </button>
                <p>{{from}}</p>
                <p>{{email.subject}}-<span>{{email.body}}</span></p>
                <p>{{formattedDate}}</p>
                <div class="actions ">
                    <button @click.stop.prevent="sendToNote" title="Send to keepApp">
                        <i class="fa-regular fa-paper-plane"></i>
                    </button>
                    <button @click.stop.prevent="toggleIsRead" title="Mark as read">
                        <i class="fa-regular fa-envelope-open"></i>
                    </button>
                    <button v-if="email.isTrash" @click.stop.prevent="$emit('remove', email.id)" title="Delete email">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                    <button v-else @click.stop.prevent="$emit('trash', email)" title="Move to trash" >
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
        </router-link>
    `,

    methods: {
        goTo() {
            this.$emit("review", true);
            this.email.isRead = true;
            this.email.isDraft
                ? this.$router.push(
                      "/email/compose/" + JSON.stringify(this.email)
                  )
                : this.$router.push("/email/" + this.email.id);
        },
        toggleIsRead() {
            this.email.isRead = !this.email.isRead;
            this.$emit("save", this.email);
        },
        starEmail() {
            this.email.isStarred = !this.email.isStarred;
            this.$emit("star", this.email);
        },
        sendToNote() {
            const { subject, body } = this.email;
            let note = {
                title: subject,
                txt: body,
            };
            this.$router.push("/keep/compose/" + JSON.stringify(note));
        },
    },
    computed: {
        formattedDate() {
            var options = { day: "numeric", month: "short" };
            //prettier-ignore
            return new Date(this.email.sentAt).toLocaleDateString("en-US", options);
        },
        from() {
            const { from, to } = this.email;
            return from === "OG@appsus.com"
                ? `You - to ${to.slice(0, to.indexOf("@"))}`
                : from.slice(0, from.indexOf("@"));
        },
    },
};
