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
    },
    created() {
    }
}); //.mount('#app')

// include components
include('./components/vue-edit-component.html',     document.currentScript); 
include('./components/vue-detail-component.html',   document.currentScript);
include('./components/vue-list-component.html',     document.currentScript);

app.mount('#app');
