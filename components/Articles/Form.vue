<template>
    <form v-if='fields' class='form' @submit.prevent='(e) => article ? edit(e) : create(e)'>
        <h1 class='title'>{{ article ? 'Сабақты өңдеу' : 'Жаңа сабақ құру' }}</h1>
        <FormField v-for='field in fields.slice(0, 3)' class='field' :error='field.error'>
            <FormInput v-bind='field' @update:value='field.value = $event' @reset:error='field.error = $event' />
        </FormField>
        <ClientOnly>
            <TipTap class='field' v-model='fields[3]' @update:value='fields[3].value = $event'
                @reset:error='fields[3].error = $event' />
        </ClientOnly>
        <div class='thumbnail'>
            <FormButton class='upload' btn-class='primary' type='button' @click='upload.click()'>
                <Icon name='solar:upload-bold-duotone' size='24' />Суретті жүктеу
            </FormButton>
            <FormButton class='reset' type='button' :disabled='!blob' @click='unsetBlob'>
                <Icon name='f7:xmark' size='20' />Жүктелген суретті жою
            </FormButton>
            <FormButton v-if='article?.thumbnail' class='delete' btn-class='danger' type='button' @click='isVisible = true'>
                <Icon name='material-symbols:delete-outline-rounded' size='24' />Суретті жою
            </FormButton>
        </div>
        <div class='thumbnail-preview'>
            <img v-if='blob || article?.thumbnail' :src='blob || article.thumbnail' />
        </div>
        <div class='btns'>
            <FormButton type='button' class='btn' @click='$router.back()'>
                <Icon name='f7:xmark' size='20' />Бас тарту
            </FormButton>
            <FormButton class='btn' btn-class='primary' :is-submitting='isSubmitting'>
                Сақтау
            </FormButton>
        </div>
        <FormError :error='rootError' />
        <slot></slot>
        <input class='thumbnail-input' type='file' id='thumbnail' name='thumbnail' ref='upload' @change='setBlob' />
    </form>
    <FormModal :is-visible='isVisible' :is-submitting='isDeleteSubmitting' @setIsVisible='isVisible = $event'
        @onClick='delThumbnail'>
        Жүктеп салынған суретті жойғыңыз келе ме?
    </FormModal>
</template>

<script setup>
const { article } = defineProps(['article']);
const { fetchArticles } = useArticlesStore();
const { user } = useUserStore();
const { back } = useRouter();

const isVisible = ref(false);
const isDeleteSubmitting = ref(false);
const isSubmitting = ref(false);
const rootError = ref(null);
const upload = ref(null);
const blob = ref(false);

async function delThumbnail() {
    isDeleteSubmitting.value = true;

    const { data } = await useSubmit({
        url: `/api/articles/${article.id}/thumbnail`,
        method: 'delete',
    });

    if (data) {
        article.thumbnail = null;
        isVisible.value = false;
    }

    isDeleteSubmitting.value = false;
}

async function edit(e) {
    isSubmitting.value = true;
    rootError.value = null;

    const formData = new FormData(e.currentTarget);
    formData.append('content', fields.value[3].value);

    const { data, error } = await useSubmit({
        url: `/api/articles/${article.id}`,
        method: 'patch',
        body: formData,
    });

    if (data) {
        await fetchArticles();
        useNotification('Сіз сабақты сәтті өңдедіңіз');
        back();
    } else if (error) {
        if (error.field) {
            for (const field of fields.value) {
                if (field.id === error.field) {
                    field.error = error.msg;
                    document.querySelector(`#${field.id}`)?.focus();
                }
            }
        } else {
            rootError.value = error.msg;
        }
    }

    isSubmitting.value = false;
}

async function create(e) {
    isSubmitting.value = true;
    rootError.value = null;

    const formData = new FormData(e.currentTarget);
    formData.append('content', fields.value[3].value);
    formData.append('authorId', user.id);

    const { data, error } = await useSubmit({
        url: '/api/articles',
        method: 'post',
        body: formData,
    });

    if (data) {
        await fetchArticles();
        useNotification('Сіз жаңа сабақты сәтті құрдыңыз');
        back();
    } else if (error) {
        if (error.field) {
            for (const field of fields.value) {
                if (field.id === error.field) {
                    field.error = error.msg;
                    document.querySelector(`#${field.id}`)?.focus();
                }
            }
        } else {
            rootError.value = error.msg;
        }
    }

    isSubmitting.value = false;
}

function setBlob(e) {
    if (e.target.files[0]) {
        blob.value = URL.createObjectURL(e.target.files[0]);
    }
}

function unsetBlob() {
    blob.value = null;
    upload.value.value = null;

    if (upload.value.value) {
        upload.value.type = 'text';
        upload.value.type = 'file';
    }
}

if (!user) back();

const fields = ref([
    {
        id: 'title',
        label: 'Тақырып',
        value: article?.title || '',
        error: '',
    },
    {
        id: 'tags',
        label: 'Тегтер',
        value: article?.tags || '',
        error: '',
    },
    {
        id: 'description',
        label: 'Сабақ туралы',
        value: article?.description || '',
        error: '',
    },
    {
        id: 'content',
        label: 'Мазмұны',
        value: article?.content || '',
        error: '',
    },
]);
</script>

<style lang='scss' scoped>
.form {
    padding: 32px;

    .title {
        font-size: 28px;
        margin-bottom: 16px;
    }

    .field {
        margin-top: 4px;
    }

    .thumbnail {
        @include flex(flex-start, $gap: 30px);
        margin: 16px 0;
        font-size: 14px;

        .form-button-cnt {
            width: max-content;
        }
    }

    .thumbnail-preview {
        @include flex();

        img {
            max-width: 80%;
        }
    }

    .btns {
        @include flex(flex-start, $gap: 30px);
        margin-top: 15px;

        .form-button-cnt,
        .form-link-cnt {
            width: max-content;
        }
    }

    .thumbnail-input {
        display: none;
    }
}

@media (max-width: 800px) {
    .form {
        padding: 16px;

        .thumbnail {
            flex-direction: column;
            gap: 15px;

            .form-button-cnt {
                width: 100%;
            }
        }
    }
}
</style>