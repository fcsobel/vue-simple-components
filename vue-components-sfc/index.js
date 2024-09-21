const { createApp } = Vue;
const { loadModule } = window['vue3-sfc-loader'];
let options = sfcOptions;
const vueListComponent = loadModule('./components/vue-list-component.vue', options);
const vueEditComponent = loadModule('./components/vue-edit-component.vue', options);
const vueDetailComponent = loadModule('./components/vue-detail-component.vue', options);
const app = createApp({
    data() {
        return {
            context: {
                headers: [],
                items: [],
                selectedItem: null,
            }
        }
    },
    components: {
        VueListComponent: Vue.defineAsyncComponent(() => vueListComponent),
        VueEditComponent: Vue.defineAsyncComponent(() => vueEditComponent),
        vueDetailComponent: Vue.defineAsyncComponent(() => vueDetailComponent),
    },
    methods: {
        async getItems() {
            const items = [
                { name: "Oliver", position: "Accountant", office: "Living Room", age: 8, image: "http://placekitten.com/210/200" },
                { name: "Milo", position: "Chief Executive Officer (CEO)", office: "Monica's room", age: 7, image: "http://placekitten.com/g/200/200" },
                { name: "Cedric", position: "Senior Javascript Developer", office: "Kitchen", age: 5, image: "http://placekitten.com/202/203" },
                { name: "Sprinkles", position: "Regional Director", office: "Basement", age: 6, image: "http://placekitten.com/g/203/200" },
            ];
            const headers = [
                { key: "name", value: "Name" },
                { key: "position", value: "Position" },
                { key: "office", value: "Office" },
                { key: "age", value: "Age" },
            ];
            this.context.headers = headers;
            this.context.items = items;
            this.context.selectedItem = this.context.items[0];
            this.context.searchString = "";
        }
    },
    mounted() {
        this.getItems();
    }
}).mount('#app')
