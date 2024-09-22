<template>
    <div v-if="context.items.length === 0">No items available.</div>
    <div v-else>
        <table class="table table-striped table-bordered table-sm" style="margin:0;">
            <thead>
                <tr>
                    <th v-for="header in context.headers" @click="setSortColumn(header.key)">
                        {{ header.value }}
                        <span class="arrow" :class="{ active: sortColumn === header.key && order === 'ASC' }">&#8593;</span>
                        <span class="arrow" :class="{ active: sortColumn === header.key && order === 'DESC' }">&#8595;</span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in filteredItems" v-on:click="SelectItem(item)"
                    :class="{ 'table-success': item === context.selectedItem }">
                    <td>{{ item.name }}</td>
                    <td>{{ item.position }}</td>
                    <td>{{ item.office }}</td>
                    <td>{{ item.age }}</td>
                    <td style="text-align: center;">
                        <a href="#" @click.stop.prevent="EditItem(item)"><i class="rb-2 fa-solid fa-cat"></i></a>
                    </td>
                    <td style="text-align: center;">
                        <a href="#" @click.stop.prevent="DeleteItem(index)"><i class="rb-2 fa-solid fa-trash"></i></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td style="text-align: center;">
                        <a href="#" @click.stop.prevent="AddItem()"><i class="fa-solid fa-plus"></i></a>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <!-- Edit Modal -->
    <div id="editModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Cat</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <vue-edit-component :context="context"></vue-edit-component>
                    <!--<component :is="vueEditComponent" :context="context" />-->
                </div>
            </div>
        </div>
    </div>    
</template>

<script setup>
    //// Local Component Registration (not needed when global)
    //import vueEditComponent from './vue-edit-component.vue';

    //const { createApp } = Vue;
    //const { loadModule } = window['vue3-sfc-loader'];
    //let options = sfcOptions;
    //let vueEditComponent = loadModule('./vue-components/vue-edit-component.vue', options);
</script>

<script>
export default {
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
            this.context.selectedItem = { age :1, image : `http://placecats.com/${length}/${width}`};
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
</script>