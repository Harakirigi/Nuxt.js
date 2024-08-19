<template>
    <div class='info-cnt'>
        <p class='description'>{{ article.description }}</p>
    </div>
</template>

<script setup>
const { article } = defineProps(['article']);
const options = ref({
    month: 'long',
    day: 'numeric',
    year: 'numeric',
});
</script>

<style lang='scss'>
.info-cnt {
    width: 100%;

    .description {
        color: rgb(var(--fg), 0.6);
    }

    .form-link-cnt {
        width: max-content;

        .form-link {
            flex-direction: column;
            align-items: flex-start;
            padding: 4px 8px;

            .author {
                @include flex($gap: 4px);

                .image-cnt {
                    @include avatar(25px);
                }

                .name {
                    max-width: 150px;
                    text-wrap: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }

            .created-at {
                padding: 0 2px;
                font-size: 14px;
                color: rgba(var(--fg), 0.6);
            }
        }
    }
}
</style>