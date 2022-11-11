export default {
    props: ["email"],
    template: `
        <router-link @click="goTo" :to="'/email/' +email.id">
            <div class="email-preview" :class="{read: email.isRead}">
                <!-- <input @click.stop="$emit('save', email)" type="checkbox" v-model="email.isRead"/> -->
                <button class="btn-star" @click.prevent.stop="$emit('star')">
                    <i class="fa-regular fa-star"></i>
                </button>
                <p>{{email.from}}</p>
                <p>{{email.subject}}-<span>{{email.body}}</span></p>
                <p>{{formattedDate}}</p>
                <div class="actions ">
                    <button v-if="email.isTrash" @click.prevent="$emit('remove', email.id)">remove</button>
                    <button v-else @click.prevent="$emit('trash', email)">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                    <!-- <button @click.prevent="$emit('star')">
                        <i class="fa-regular fa-star"></i>
                    </button> -->
                    <input @click.stop="$emit('save', email)" type="checkbox" v-model="email.isRead"/>
                </div>
            </div>
        </router-link>
    `,
    methods: {
        goTo() {
            this.$emit("review", true);
            console.log(this.email.isDraft);
            this.email.isDraft
                ? this.$router.push(
                      "/email/compose/" + JSON.stringify(this.email)
                  )
                : this.$router.push("/email/" + this.email.id);
        },
    },
    computed: {
        formattedDate() {
            var options = { day: "numeric", month: "short" };
            //prettier-ignore
            return new Date(this.email.sentAt).toLocaleDateString("en-US", options);
        },
    },
};
