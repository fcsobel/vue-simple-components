import List from './components/vue-list-component.js'
import Edit from './components/vue-edit-component.js'
import Detail from './components/vue-detail-component.js'

const { createApp } = Vue;
        
const app = createApp({
     components: {
         'vue-list-component': List,
         'vue-edit-component': Edit,
         'vue-detail-component': Detail
       },
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
    }
}).mount('#app')