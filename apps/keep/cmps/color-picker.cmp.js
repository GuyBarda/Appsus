export default {
    props: ['note'],
    template: `
        <div ref="colorPicker" class="color-container">
            <div @click.stop.prevent="setBgColor('#ffeaa7')" style="background-color: #ffeaa7;"></div>
            <div @click.stop.prevent="setBgColor('#fab1a0')" style="background-color: #fab1a0;"></div>
            <div @click.stop.prevent="setBgColor('#fd79a8')" style="background-color: #fd79a8;"></div>
            <div @click.stop.prevent="setBgColor('#a29bfe')" style="background-color: #a29bfe;"></div>
            <div @click.stop.prevent="setBgColor('#81ecec')" style="background-color: #81ecec;"></div>
            <div class="white" @click.stop.prevent="setBgColor('white')"></div>
          
        </div>   

    `,

    data() {
        return {
            backgroundColor: 'white'
        }
    },

    mounted() {
        console.log(this.$refs.colorPicker.offsetWidth)
    },

    methods: {
        setBgColor(bgColor) {
            this.$emit('color', bgColor)
        },
    },




}