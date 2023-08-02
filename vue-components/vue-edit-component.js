const template = `
    <div v-if="context.selectedItem">
        <div class="col-12">
            <label for="Name" class="form-label">Name</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="context.selectedItem.name">
        </div>
        <div class="col-12">
            <label for="Position" class="form-label">Position</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="context.selectedItem.position">
        </div>
        <div class="col-12">
            <label for="Office" class="form-label">Office</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="context.selectedItem.oAgeffice">
        </div>
        <div class="col-12">
            <label for="Age" class="form-label">Age</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="context.selectedItem.age">
        </div>
        <div class="col-12">
            <label for="Age" class="form-label">Image</label>
            <img style="width: 100%;" :src="context.selectedItem.image">
        </div>
    </div>
`;


export default {
    props: ["context"],
    data() {
        return {}
    },
    template: template,
    computed: {},
    methods: {},
}
