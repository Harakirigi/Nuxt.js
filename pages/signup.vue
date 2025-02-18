<template>
    <div class='form-cnt'>
        <form class='form' @submit.prevent='signup'>
            <header class='header'>
                <h1 class='title'>Тіркелу</h1>
                <p class='subtitle'>Жаңа аккаунт құру</p>
            </header>
            <FormField v-for='field in fields.slice(0, 3)' class='field' :error='field.error'>
                <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
            </FormField>
            <FormButton class='btn' btn-class='primary' :is-submitting='isSubmitting'>Тіркелу</FormButton>
            <FormError :error='rootError' />
        </form>
    </div>
</template>

<script setup>
definePageMeta({ middleware: 'check-auth' });
useHead({ title: 'Тіркелу' });

const { fetchUsers } = useUsersStore();
const { fetchUser } = useUserStore();
const { push } = useRouter();
const { query } = useRoute();

const isSubmitting = ref(false);
const rootError = ref(null);
const user = ref({});

watch(() => query.user, (userData) => {
    if (userData) {
        const qs = decodeURIComponent(atob(userData));

        const keyValuePairs = qs.split('&');

        keyValuePairs.forEach((keyValuePair) => {
            const [key, value] = keyValuePair.split('=');
            user.value[key] = decodeURIComponent(value.replace(/\+/g, ' '));
        });
    }
}, { immediate: true });

async function signup() {
    isSubmitting.value = true;
    rootError.value = null;

    const { data, error } = await useSubmit({
        method: 'post',
        url: '/api/users',
        fieldsArray: fields.value,
    });

    if (data) {
        await fetchUsers();
        await fetchUser();
        useNotification('Сіз сәтті тіркелдіңіз');
        push(`/users/${data.userId}`);
    } else if (error) {
        rootError.value = error.msg;
    }

    isSubmitting.value = false;
}

const fields = ref([
    {
        id: 'name',
        label: 'Есіміңіз',
        value: user.value?.name || user.value?.login || '',
        error: '',
    },
    {
        id: 'email',
        label: 'Электрондық пошта',
        value: user.value?.email || '',
        error: '',
        disabled: user.value?.email || false,
    },
    {
        type: 'password',
        id: 'password',
        label: 'Құпиясөз',
        value: '',
        error: '',
    },
    {
        id: 'image',
        value: user.value?.picture || user.value?.avatar_url || null,
    },
    {
        id: 'verified',
        value: (user.value?.verified_email || user.value?.verified) === 'true' ? 1 : 0,
    },
]);
</script>

<style lang='scss' scoped>
@import '~/assets/form.scss';
</style>