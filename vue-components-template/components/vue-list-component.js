export default {
    template: '#portfolio-list-template',
     props: ["context"],
    data() {
        return {
            sortColumn: "",
            order: "ASC",
        }
    },
    //template: template, // Not used in SFC component
    //components: {
      //  VueEditComponent: vueEditComponent
    //},
    //setup() {    },
    methods: {
        SelectItem(item)
        {
            // set current item
            this.context.selectedItem = item;
        },
        EditItem(item)
        {
            // set current item
            this.context.selectedItem = item;

            // show modal to edit
            var myModal = new bootstrap.Modal(document.getElementById('editModal'));
            myModal.show();
        },
        DeleteItem(index)
        {
            if (index == 0)            
            {
                // get next item
                var item = this.context.items[1];
            }
            else
            {
                // get previos item
                var item = this.context.items[index - 1];
            }            

            // remove item at index
            this.context.items.splice(index, 1);

            // set current item after delete
            this.context.selectedItem = item;
        },
        AddItem()
        {
            // set current item
            let offset = Math.floor(Math.random() * 10);
            let width = 200 + offset;
            offset = Math.floor(Math.random() * 10);
            let length = 200 + offset;
            this.context.selectedItem = { age :1, image : `https://placecats.com/${length}/${width}`};
            this.context.items.push(this.context.selectedItem);
            // show modal to edit
            var myModal = new bootstrap.Modal(document.getElementById('editModal'));
            myModal.show();
        },
        setSortColumn(column) {
            if (this.sortColumn === column) {
                this.order = this.order === "ASC" ? "DESC" : "ASC";
            } else {
                this.order = "ASC";
                this.sortColumn = column;
            }
        },
    },
    computed: {
        filteredItems() {
            const filteredItems = this.context.searchString === ""
                ? this.context.items
                : this.context.items.filter(wo => Object.values(wo).join("").indexOf(this.context.searchString) !== -1);

            const column = this.sortColumn
            const order = this.order;

            filteredItems.sort(function (a, b) {
                var nameA = a[column] + "".toUpperCase();
                var nameB = b[column] + "".toUpperCase();
                if (order === "DESC" && nameA > nameB) {
                    return -1;
                }
                if (order === "DESC" && nameA < nameB) {
                    return 1;
                }
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });

            return filteredItems;
        },
    },
}