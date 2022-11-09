export default {
    props: [""],
    template: `
            <div class="email-folders">

                <button @click="$emit('create')">Compose</button>
                <button @click="$emit('filter', 'inbox')">Inbox</button>
                <button @click="$emit('filter', 'starred')">Starred</button>
                <button @click="$emit('filter', 'read')">Read</button>
                <button @click="$emit('filter', 'sent')">Sent</button>
                <button @click="$emit('filter', 'draft')">Draft</button>
                <button @click="$emit('filter', 'trash')">Trash</button>
            </div>

    `,
    data() {
        return {
            criteria: {
                status: "inbox/sent/trash/draft",
                txt: "puki", // no need to support complex text search
                isRead: true, // (optional property, if missing: show all)
                isStared: true, // (optional property, if missing: show all)
                lables: ["important", "romantic"], // has any of the labels
            },
        };
    },
    methods: {
        changeCriteria(value) {
            console.log(value);
        },
    },
};
