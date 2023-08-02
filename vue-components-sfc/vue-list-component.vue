<template>
    <div v-if="context.workers.length === 0">No workers available.</div>
    <div v-else>
        <table class="table table-striped table-bordered table-sm" style="margin:0;">
            <thead>
                <tr>
                    <th v-for="header in context.headers" @click="setSortColumn(header.key)">
                        {{ header.value }}
                        <span class="arrow" :class="{ active: this.sortColumn === header.key && this.order === 'ASC' }">&#8593;</span>
                        <span class="arrow" :class="{ active: this.sortColumn === header.key && this.order === 'DESC' }">&#8595;</span>
                    </th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(worker,index) in filteredWorkers" v-on:click="context.selectedItem=worker"
                    :class="{ 'table-success': worker === context.selectedItem }">
                    <td>{{ worker.name }}</td>
                    <td>{{ worker.position }}</td>
                    <td>{{ worker.office }}</td>
                    <td>{{ worker.age }}</td>
                    <td style="text-align: center;">
                        <a href="#" @click.prevent="EditItem(worker)"><i class="rb-2 fa-solid fa-cat"></i></a>
                    </td>
                    <td style="text-align: center;">
                        <a href="#" @click.prevent="DeleteItem(index)"><i class="rb-2 fa-solid fa-trash"></i></a>
                    </td>
                </tr>
                <tr>
                    <td colspan="4"></td>
                    <td style="text-align: center;">
                        <a href="#" @click.prevent="AddItem()"><i class="fa-solid fa-plus"></i></a>
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
                    <!--<vue-edit-component :context="context"></vue-edit-component>-->
                    <component :is="vueEditComponent" :context="context" />
                </div>
            </div>
        </div>
    </div>    
</template>

<script setup>
    import vueEditComponent from './vue-edit-component.vue';
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
    components: {
        VueEditComponent: vueEditComponent
    },
    //setup() {    },
    methods: {
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
            // remove item at index
            this.context.workers.splice(index, 1);

            if (index >= this.context.workers.length) 
            {
                index = this.context.workers.length - 1;
            }

            // set current item after delete
            this.context.selectedItem = this.context.workers[index];
        },
        AddItem()
        {
            // set current item
            let offset = Math.floor(Math.random() * 10);
            let width = 200 + offset;
            offset = Math.floor(Math.random() * 10);
            let length = 200 + offset;
            this.context.selectedItem = { age :1, image : `http://placekitten.com/${length}/${width}`};
            this.context.workers.push(this.context.selectedItem);
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
        filteredWorkers() {
            const filteredWorkers = this.context.searchString === ""
                ? this.context.workers
                : this.context.workers.filter(wo => Object.values(wo).join("").indexOf(this.context.searchString) !== -1);

            const column = this.sortColumn
            const order = this.order;

            filteredWorkers.sort(function (a, b) {
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

            return filteredWorkers;
        },
    },
}
</script>