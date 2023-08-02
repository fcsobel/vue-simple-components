const template = `
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
                <tr v-for="worker in filteredWorkers" v-on:click="context.selectedItem=worker">
                    <td>{{ worker.name }}</td>
                    <td>{{ worker.position }}</td>
                    <td>{{ worker.office }}</td>
                    <td>{{ worker.age }}</td>
                    <td><a href="#" @click.prevent="EditItem(worker)">Edit</a></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Edit Modal -->
    <div id="editModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <vue-edit-component :context="context"></vue-edit-component>
                    <!--<component :is="vueEditComponent" :context="context" />-->
                </div>
            </div>
        </div>
    </div>    
`;

export default {
    props: ["context"],
    data() {
        return {
            sortColumn: "",
            order: "ASC",
        }
    },
    template: template,
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
    components: {
        VueEditComponent: Vue.defineAsyncComponent(() => import('./vue-edit-component.js')),
    },
    methods: {
        EditItem(item)
        {
            // set current item
            this.context.selectedItem = item;

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
}