<template>
    <div>
        <h1>{{ msg }}</h1>
        prop{{ activador }}
        <button class="search-button" @click="emmitttt" v-if="activador">
            <svg fill="none" width="16" height="16" viewBox="0 0 16 16" class="vtex-store-components-3-x-searchIcon"
                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <use href="#hpa-search" xlink:href="#hpa-search"></use>
            </svg>
        </button>


    </div>

</template>


<script>
export default {
    props: ['msg', 'activador'],
    data() {
        return {
            aleatorio: null,
        }
    },
    methods: {
        emmitttt() {
            this.aleatorio = Math.random()
            this.$emit('msgtext', this.aleatorio);

        }
    }
}
</script>