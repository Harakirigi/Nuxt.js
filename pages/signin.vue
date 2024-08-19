<template>
    <div class='form-cnt'>
        <form class='form' @submit.prevent='signin'>
            <header class='header'>
                <h1 class='title'>Кіру</h1>
                <p class='subtitle'>Оралуыңызбен!</p>
            </header>
            <FormField v-for='field in fields' class='field' :error='field.error'>
                <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </FormField>
            <FormButton class='btn' btn-class='primary' :is-submitting='isSubmitting'>Кіру</FormButton>
            <FormError :error='rootError' />
            <AuthProviders />
        </form>
    </div>
</template>

<script setup>
definePageMeta({ middleware: 'check-auth' });
useHead({ title: 'Кіру' });

const { $patch } = useUserStore();
const { push } = useRouter();

const isSubmitting = ref(false);
const rootError = ref(null);

const fields = ref([
    {
        id: 'email',
        label: 'Электрондық пошта',
        value: '',
        error: '',
    },
    {
        type: 'password',
        id: 'password',
        label: 'Құпиясөз',
        value: '',
        error: '',
    },
]);

async function signin() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        method: 'post',
        url: '/api/auth',
        fieldsArray: fields.value,
    });

    if (data) {
        $patch({ user: data.user });
        push(`/users/${data.user.id}`);
    } else if (error) {
        rootError.value = error.msg;
    }

    isSubmitting.value = false;
}
</script>

<style lang='scss' scoped>
@import '~/assets/form.scss';
</style>