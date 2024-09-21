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
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="context.selectedItem.office">
        </div>
        <div class="col-12">
            <label for="Age" class="form-label">Age</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="context.selectedItem.age">
        </div>
        <div class="col-12">
            <label for="Image" class="form-label">Image</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" v-model="context.selectedItem.image">
        </div>
        <div class="col-12">
            <label for="Image" class="form-label">Preview</label>
            <div>
                <img style="width: 50px;" :src="context.selectedItem.image">
            </div>
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
