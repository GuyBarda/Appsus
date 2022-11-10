import emailService from "../services/email-service.js";

export default {
    props: [""],
    template: `
        <!-- <pre>{{email}}</pre> -->
        <div v-if="email" class="email-details">
            <div className="actions">
                <div class="navigation-links">
                    <!-- <router-link>next</router-link> -->
                    <!-- <router-link>back</router-link> -->
                </div>
                <div class="buttons">
                    <button @click="">Delete</button>
                    <button @click="">Star</button>
                    <button @click="">Favorite</button>
                    <button @click="">Categories</button>
                </div>
            </div>
            <h2>{{email.subject}}</h2>
            <h3>{{email.from}} <p>at {{formattedDate}}</p></h3>
            <p>{{email.body}}</p>
        </div>
    `,
    data() {
        return {
            email: null,
            // isReview: false,
        };
    },
    created() {
        console.log("details");
        const id = this.$route.params.id;
        emailService.get(id).then((email) => {
            this.email = email;
            console.log(this.email);
        });
    },
    unmounted() {
        console.log("bye");
        this.$emit("review", false);
    },
    computed: {
        formattedDate() {
            var options = {
                day: "numeric",
                month: "short",
                hour: "numeric",
                minute: "numeric",
            };
            //prettier-ignore
            return new Date(this.email.sentAt).toLocaleDateString("en-US", options);
        },
    },
};
