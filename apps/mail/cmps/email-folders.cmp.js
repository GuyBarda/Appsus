export default {
    props: [""],
    template: `
            <div class="email-folders">
                <!-- <button class="compose" @click="$emit('create')">Compose</button> -->
                <router-link class="compose" to="/email/compose/1" >Compose</router-link>
                <button @click="changeCriteria('status' ,'inbox', $event)">
                    <i class="fa-solid fa-inbox"></i>
                    <span>Inbox</span>
                </button>
                <button @click="changeCriteria('isStarred' , true, $event)">
                    <i class="fa-regular fa-star"></i>
                    <span>Starred</span>
                    
                </button>
                <button @click="changeCriteria('isRead' , true , $event)">
                    <i class="fa-solid fa-envelope-open"></i>
                    <span>Read</span>
                </button>
                <button @click="changeCriteria('status' , 'sent', $event)">
                    <i class="fa-solid fa-paper-plane"></i>
                    <span>Sent</span>                  
                </button>
                <button @click="changeCriteria('status' , 'draft', $event)">
                    <i class="fa-solid fa-box"></i>
                    <span>Draft</span>  
                </button>
                <button @click="changeCriteria('status' , 'trash', $event)">
                    <i class="fa-solid fa-trash-can"></i>
                    <span>Trash</span>
                </button>
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
            // ev.target.classList.add("active");
            this.criteria[key] = value;
            this.$emit("filter", this.criteria);
            this.$router.push("/email/");
        },
    },
};
