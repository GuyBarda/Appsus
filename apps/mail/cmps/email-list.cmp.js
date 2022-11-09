import emailPreview from "./email-preview.cmp.js";

export default {
    props: ["emails"],
    template: `
        <div class="email-list">
            <ul class="clean-list">
                <li v-for="email in emails">
                    <email-preview :email="email"></email-preview>
                </li>
            </ul>
        </div>
    `,
    components: {
        emailPreview,
    },
};
