export default {
    props: ['note'],
    template: `
        <div class="note-video-container">
            <!-- <iframe class="video" src="https://www.youtube.com/embed?v=DWuAn6C8Mfc&t" ></iframe> -->

            <iframe class="video" :src="videoUrl" frameborder="0"
                        allowfullscreen>
            </iframe>
        </div>
    `,

    data() {
        return {

        }
    },

    computed: {
        videoUrl() {
            return this.note.info.url
        },
    }
}