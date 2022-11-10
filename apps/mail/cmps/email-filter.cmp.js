export default {
    template: `
        <div class="search">
            <input class="email-filter" @change="$emit('filter', txt)" type="text" v-model="txt" placeholder="search"/>
            <button @click="$emit('sort', 'ab')" class="sort">
                <i class="fa-solid fa-arrow-down-a-z"></i>
            </button>
            <button @click="$emit('sort', 'date')" class="sort">
                <i class="fa-solid fa-arrow-down-1-9"></i>
            </button>
        </div>
    `,
    data() {
        return {
            txt: "",
        };
    },
};
