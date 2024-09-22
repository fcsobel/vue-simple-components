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
            const items = [
                { name: "Oliver", position: "Accountant", office: "Living Room", age: 8, image: "http://placecats.com/210/200" },
                { name: "Milo", position: "Chief Executive Officer (CEO)", office: "Monica's room", age: 7, image: "http://placecats.com/g/200/200" },
                { name: "Cedric", position: "Senior Javascript Developer", office: "Kitchen", age: 5, image: "http://placecats.com/202/203" },
                { name: "Sprinkles", position: "Sleeping", office: "Basement", age: 6, image: "http://placecats.com/g/203/200" },
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