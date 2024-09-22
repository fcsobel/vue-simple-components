// componnets
import Edit from './components/vue-edit-component.js'
import List from './components/vue-list-component.js'
import Detail from './components/vue-detail-component.js'
import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'
//import { jsonp } from 'https://unpkg.com/vue-jsonp?module'
import { jsonp, VueJsonp } from 'https://unpkg.com/vue-jsonp?module'

createApp({
    List,
    Detail,
    Edit,
    context: {
        headers: [],
        items: [],
        selectedItem: null,
        searchString: 'Test'
    },
    // async getTestData() {
    //     //jsonp('/some-jsonp-url');
    //     fetch('https://dummyjson.com/products')
    //         .then(res => res.json())
    //         .then(json => console.log(json));
            
    //     fetch('https://dummyjson.com/users')
    //         .then(res => res.json())
    //         .then(json => console.log(json));

    //      fetch('/data/users.json')
    //         .then(res => res.json())
    //         .then(items => {
    //             console.log(items)
    //             this.context.items = items;
    //             this.context.selectedItem = this.context.items[0];
    //         });
    //     },
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
    },
    mounted() {
        this.getItems();
    }
}).mount();

