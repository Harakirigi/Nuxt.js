<template>
    <div v-if='isExpanded' class='dropdown-wrapper' @click='() => isExpanded = false'></div>
    <div v-if='store.user' class='menu'>
        <button class='image-cnt' type='button' @click='() => isExpanded = !isExpanded'>
            <img class='image' :src='store.user.image' />
            <div class='arrow' :class='{ active: isExpanded }'>
                <Icon name='material-symbols:arrow-drop-down' size='16' />
            </div>
        </button>
        <div class='dropdown' :class='{ active: isExpanded }' @click='() => isExpanded = false'>
            <NuxtLink v-for='link in links' class='link' :to='link.path' @click.prevent='!link.path && useSignout()'>
                <Icon :name='link.icon' size='24' />
                {{ link.label }}
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const store = useUserStore();
const isExpanded = ref(false);

const links = ref([
    {
        label: 'Жеке кабинет',
        path: `/users/${store.user.id}`,
        icon: 'lets-icons:user-circle',
    },
    {
        label: 'Параметрлер',
        path: '/settings',
        icon: 'lets-icons:setting-fill',
    },
    {
        label: 'Сабақтар',
        path: '/articles',
        icon: 'material-symbols:article-rounded',
    },
    {
        label: 'Шығу',
        icon: 'lets-icons:sign-out-squre-fill',
    },
]);
</script>

<style lang='scss' scoped>
.dropdown-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    z-index: 1;
}

.menu {
    position: relative;
    z-index: 10;

    .image-cnt {
        @include avatar(40px);
        transition: 0.2s;

        .arrow {
            @include flex();
            position: absolute;
            bottom: 0;
            right: 0;
            background-color: rgba(var(--bg), 0.8);
            border-radius: 8px;
            transition: 0.2s;

            &.active {
                rotate: 180deg;
            }
        }

        &:hover {
            filter: brightness(1.2);

            .arrow {
                box-shadow: inset 0 0 10px rgba(var(--fg), 0.3);
            }
        }

        &:active {
            transition: 0s;
            filter: brightness(1.5);
        }
    }
}

.dropdown {
    @include flex($dir: column);
    position: absolute;
    width: 200px;
    top: 100%;
    right: 0;
    padding: 6px 0;
    background-color: rgba(var(--bg), 0.8);
    box-shadow: inset 0 0 200px rgba(var(--fg), 0.1);
    border: 1px solid rgba(var(--fg), 0.2);
    border-radius: 8px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: scale(0.9);
    transition: 0.15s;

    .link {
        @include flex(flex-start, $gap: 8px);
        width: 100%;
        padding: 8px 12px;
        color: rgba(var(--fg), 0.8);
        text-wrap: nowrap;
        transition: 0.3s;

        &:hover,
        &.router-link-exact-active {
            color: rgb(var(--fg));
            background-color: rgba(var(--fg), 0.05);
        }
    }

    &.active {
        top: 125%;
        opacity: 1;
        visibility: visible;
        pointer-events: all;
        transform: scale(1);
    }
}
</style>