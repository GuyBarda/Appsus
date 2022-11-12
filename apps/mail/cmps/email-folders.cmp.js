export default {
    props: [""],
    template: `
            <div class="email-folders">
                <!-- <button class="compose" @click="$emit('create')">Compose</button> -->
                <router-link class="compose" to="/email/compose/1" >Compose</router-link>
                <button @click="changeCriteria('status' ,'inbox', $event)">Inbox</button>
                <button @click="changeCriteria('isStarred' , true, $event)">Starred</button>
                <button @click="changeCriteria('isRead' , true , $event)">Read</button>
                <button @click="changeCriteria('status' , 'sent', $event)">Sent</button>
                <button @click="changeCriteria('status' , 'draft', $event)">Draft</button>
                <button @click="changeCriteria('status' , 'trash', $event)">Trash</button>
            </div>
    `,
    data() {
        return {
            criteria: {
                status: "",
                txt: "",
                isRead: null,
                isStarred: null,
            },
        };
    },
    methods: {
        changeCriteria(key, value, ev) {
            this.criteria = {
                status: "",
                txt: "",
                isRead: null,
                isStarred: null,
            };
            ev.target.classList.add("active");
            this.criteria[key] = value;
            this.$emit("filter", this.criteria);
            this.$router.push("/email/");
        },
    },
};
