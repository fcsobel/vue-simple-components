const { createApp } = Vue;
      

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
    },
    created() {
    }
}); //.mount('#app')

// include components
include('./components/vue-edit-component.html',     document.currentScript); 
include('./components/vue-detail-component.html',   document.currentScript);
include('./components/vue-list-component.html',     document.currentScript);

app.mount('#app');
