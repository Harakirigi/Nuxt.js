<template>
    <input :type='type' :id='id' :name='id' :value='value' :class='{ "not-empty": value !== "", "is-error": error !== "" }'
        v-bind='$attrs' class='form-input' autocomplete='off'
        @input='$emit("update:value", $event.target.value); $emit("reset:error", "")' />
    <div class='form-label'>{{ label }}</div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'text',
    },
    id: String,
    label: String,
    value: String,
    error: {
        type: String,
        default: '',
    },
});
defineEmits(['update:value', 'reset:error']);
</script>

<style lang='scss'>
.form-input {
    @include input();
}
</style>