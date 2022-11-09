export default {
    template: `
        <input @change="$emit('filter', txt)" type="text" v-model="txt"/>
    `,
    data() {
        return {
            txt: "",
        };
    },
};
