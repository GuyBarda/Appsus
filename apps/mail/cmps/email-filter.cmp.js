export default {
    template: `
        <input class="email-filter" @change="$emit('filter', txt)" type="text" v-model="txt" placeholder="search"/>
    `,
    data() {
        return {
            txt: "",
        };
    },
};
