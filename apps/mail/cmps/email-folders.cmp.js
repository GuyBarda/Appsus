export default {
    props: [""],
    template: `
            <div class="email-folders">

                <button class="compose" @click="$emit('create')">Compose</button>
                <button @click="changeCriteria('status' ,'inbox')">Inbox</button>
                <button @click="changeCriteria('status' , 'starred')">Starred</button>
                <button @click="changeCriteria('isRead' , true)">Read</button>
                <button @click="changeCriteria('status' , 'sent')">Sent</button>
                <button @click="changeCriteria('status' , 'draft')">Draft</button>
                <button @click="changeCriteria('status' , 'trash')">Trash</button>
            </div>

    `,
    data() {
        return {
            criteria: {
                status: "",
                txt: "", // no need to support complex text search
                isRead: null, // (optional property, if missing: show all)
                isStared: null, // (optional property, if missing: show all)
                lables: ["important", "romantic"], // has any of the labels
            },
        };
    },
    methods: {
        changeCriteria(key, value) {
            this.criteria[key] = value;
            console.log(this.criteria);
            this.$emit("filter", this.criteria);
        },
    },
};
