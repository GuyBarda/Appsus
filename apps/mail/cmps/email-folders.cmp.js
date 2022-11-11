export default {
    props: [""],
    template: `
            <div class="email-folders">
                <!-- <button class="compose" @click="$emit('create')">Compose</button> -->
                <router-link to="/email/compose/1" >Compose</router-link>
                <button @click="changeCriteria('status' ,'inbox', $event)">Inbox</button>
                <button @click="changeCriteria('status' , 'starred', $event)">Starred</button>
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
                isStared: null,
                lables: ["important", "romantic"],
            },
        };
    },
    methods: {
        changeCriteria(key, value, ev) {
            this.criteria = {
                status: "",
                txt: "",
                isRead: null,
                isStared: null,
                lables: ["important", "romantic"],
            };
            ev.target.classList.add("active");
            this.criteria[key] = value;
            console.log(this.criteria);
            this.$emit("filter", this.criteria);
        },
    },
};
