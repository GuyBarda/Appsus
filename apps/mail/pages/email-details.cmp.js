import emailService from "../services/email-service.js";

export default {
    props: [""],
    template: `
        <!-- <pre>{{email}}</pre> -->
        <div v-if="email" class="email-details">
            <div class="actions">
                <!-- <div class="navigation-links">
                    <router-link>next</router-link>
                    <router-link>back</router-link>
                </div> -->
                <div class="buttons">
                    <button class="btn-star" @click.prevent.stop="starEmail" :class="{'btn-star-active': email.isStarred}">
                    <i class="fa-regular fa-star"></i>
                    </button>
                    <button @click.stop.prevent="sendToNote" title="Send to keepApp">
                        <i class="fa-regular fa-paper-plane"></i>
                    </button>
                    <button @click.stop.prevent="toggleIsRead" title="Mark as read">
                        <i class="fa-regular fa-envelope-open"></i>
                    </button>
                    <button v-else @click.stop.prevent="$emit('trash', email)" title="Move to trash" >
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </div>
            <header class="details-header">
                <h3>{{email.from}} <p></p></h3>
                <p>{{formattedDate}}</p>
            </header>
            <main class="details-content">
                <h2>{{email.subject}}</h2>
                <p>{{email.body}}</p>
            </main>
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
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
            };
            //prettier-ignore
            return new Date(this.email.sentAt).toLocaleDateString("en-US", options);
        },
    },
};
