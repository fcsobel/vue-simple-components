
export default function (props) {
    return {
        $template: '#vue-list-component',
        context: props.context,
        inc() {
            this.count++
        },
        sortColumn: "",
        order: "ASC",
        mounted() {
            console.log(`counter is mounted!`)
        },
        SelectItem(item) {
            // set current item
            this.context.selectedItem = item;
        },
        EditItem(item) {
            // set current item
            this.context.selectedItem = item;

            // show modal to edit
            var myModal = new bootstrap.Modal(document.getElementById('editModal'));
            myModal.show();
        },
        DeleteItem(index) {
            // remove item at index
            this.context.items.splice(index, 1);

            if (index >= this.context.items.length) {
                index = this.context.items.length - 1;
            }

            // set current item after delete
            this.context.selectedItem = this.context.items[index];
        },
        AddItem() {
            // set current item
            let offset = Math.floor(Math.random() * 10);
            let width = 200 + offset;
            offset = Math.floor(Math.random() * 10);
            let length = 200 + offset;
            this.context.selectedItem = { name: '', position:'', office:'', age: 1, image: `https//placecats.com/${length}/${width}` };
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
    }
}
