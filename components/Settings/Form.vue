<template>
    <form class='form' @submit.prevent='update'>
        <FormField v-for='field in fields' class='field' :error='field.error'>
            <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
        </FormField>
        <slot name='btns'>
            <FormButton v-if='props.btnClasses' :btn-class='props.btnClasses' :btn-style='props.btnStyles'
                class='btn primary' :is-submitting='isSubmitting'>
                Сақтау</FormButton>
            <div v-else class='btns'>
                <FormLink class='btn' :to='`/users/${user.id}`'>
                    <Icon name='f7:xmark' size='18' />Бас тарту
                </FormLink>
                <FormButton class='btn' btn-class='primary' :is-submitting='isSubmitting'>Сақтау</FormButton>
            </div>
        </slot>
        <FormError :error='rootError' />
    </form>
</template>

<script setup>
const { fetchUsers } = useUsersStore();
const { fetchUser } = useUserStore();
const props = defineProps(['user', 'btnClasses', 'btnStyles']);

const isSubmitting = ref(false);
const rootError = ref(null);
const user = ref(props.user);

async function update() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        url: `/api/users/${user.value.id}`,
        fieldsArray: fields.value,
        method: 'patch',
    });

    isSubmitting.value = false;

    if (data) {
        await fetchUser();
        await fetchUsers();
    } else if (error) {
        rootError.value = error.msg;
    }
}

const fields = ref([
    {
        id: 'email',
        label: 'Email',
        value: user.value.email,
        error: '',
    },
    {
        id: 'name',
        label: 'Name',
        value: user.value.name,
        error: '',
    },
    {
        id: 'bio',
        label: 'Bio',
        value: user.value.bio || '',
        error: '',
    },
    {
        type: 'date',
        id: 'birth',
        label: 'Birth',
        value: user.value.birth ? formatDate(user.value.birth) : '',
        error: '',
    },
]);
</script>

<style lang='scss' scoped>
@import '~/assets/settings.scss';
</style>