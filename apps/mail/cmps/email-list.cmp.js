import emailPreview from "./email-preview.cmp.js";

export default {
    props: ["emails"],
    template: `
        <div class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails">
                    <email-preview @save="$emit('save', email)" @remove="$emit('remove', email.id)" @trash="$emit('trash', email)" @star="$emit('star')" :email="email"></email-preview>
                </li>
            </ul>
        </div>
    `,
    components: {
        emailPreview,
    },
};
