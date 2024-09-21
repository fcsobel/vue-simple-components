<template>
    <div v-if="context.selectedItem">
        <div class="col-12">
            <label for="Name" class="form-label">Name: {{context.selectedItem.name}}</label>
        </div>
        <div class="col-12">
            <label for="Position" class="form-label">Position: {{ context.selectedItem.position }}</label>
        </div>
        <div class="col-12">
            <label for="Office" class="form-label">Office: {{ context.selectedItem.office }}</label>
        </div>
        <div class="col-12">
            <label for="Office" class="form-label">Age: {{ context.selectedItem.age }}</label>
        </div>
        <div class="col-12">
            <img style="width: 100%;" :src="context.selectedItem.image">
        </div>
    </div>
</template>

<script>
export default {
    props: ["context"],
    data() {
        return {}
    },
    computed: {},
    methods: {},
}
</script>