export default {
    props: ['previewWidth'],
    template: `
        <div ref="colorPicker" class="color-container">
            <div @click.stop.prevent="setBgColor('#d63031')" style="background-color: #d63031;"></div>
            <div @click.stop.prevent="setBgColor('#e17055')" style="background-color: #e17055;"></div>
            <div @click.stop.prevent="setBgColor('#fdcb6e')" style="background-color: #fdcb6e;"></div>
            <div @click.stop.prevent="setBgColor('#0984e3')" style="background-color: #0984e3;"></div>
            <div @click.stop.prevent="setBgColor('#00cec9')" style="background-color: #00cec9;"></div>
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
            this.backgroundColor = bgColor
            this.$emit('color', this.backgroundColor)
        },
    },

    computed: {
        // setPos() {
        //     return { left: (this.previewWidth - this.$refs.colorPicker.offsetWidth) / 2 }
        // }
    },


}