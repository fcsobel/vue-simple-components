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
    // local component registration
    // components: {
    //     VueListComponent: Vue.defineAsyncComponent(() => vueListComponent),
    //     VueEditComponent: Vue.defineAsyncComponent(() => vueEditComponent),
    //     vueDetailComponent: Vue.defineAsyncComponent(() => vueDetailComponent),
    // },
    methods: {
        async getItems() {

            const headers = [
                { key: "name", value: "Name" },
                { key: "position", value: "Position" },
                { key: "office", value: "Office" },
                { key: "age", value: "Age" },
            ];
            this.context.headers = headers;
            this.context.searchString = "";

            fetch('/data/users.json')
                .then(res => res.json())
                .then(items => {
                    this.context.items = items;
                    this.context.selectedItem = this.context.items[0];
                });
        }
    },
    mounted() {
        this.getItems();
    }
}); //.mount('#app')

// global registration - can be used anywhere
app.component('vue-list-component', Vue.defineAsyncComponent(() => vueListComponent)); 
app.component('vue-edit-component', Vue.defineAsyncComponent(() => vueEditComponent)); 
app.component('vue-detail-component', Vue.defineAsyncComponent(() => vueDetailComponent)); 

app.mount('#app');
