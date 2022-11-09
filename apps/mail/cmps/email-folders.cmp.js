export default {
    props: [""],
    template: `
        <ul class="clean-list">
            <li>
                <button>Compose</button>
                <button @click="$emit('filter', inbox)">Inbox</button>
                <button @click="$emit('filter', starred)">Starred</button>
                <button @click="$emit('filter', read)">Read</button>
                <button @click="$emit('filter', sent)">Sent</button>
                <button @click="$emit('filter', drafts)">Drafts</button>
                <button @click="$emit('filter', trash)">Trash</button>
            </li>
        </ul>
    `,
};
