<template>
    <div v-if='user' class='profile'>
        <div class='header'>
            <div class='image-cnt'>
                <img class='image' :src='user.image' />
            </div>
            <div class='info'>
                <div class='name'>
                    {{ user.name }}
                </div>
                <div class='created-at'>
                    {{ new Date(user.createdAt).toLocaleDateString('en-US', options) }} Қосылды
                </div>
                <div v-if='user.birth' class='birth'>
                    Туылған күні: {{ formatDate(user.birth) }}
                </div>
            </div>
            <div v-if='params.id == useUserStore().user?.id' class='actions'>
                <FormLink class='action' link-class='primary' to='/settings'>
                    <Icon name='lets-icons:setting-fill' size='24' />
                    <span>Параметрлер</span>
                </FormLink>
                <FormLink v-if='1 == useUserStore().user?.id' class='action' link-class='primary' to='/admin'>
                    <Icon name='eos-icons:admin-outlined' size='24' />
                    <span>Басқару тақтасы</span>
                </FormLink>
            </div>
        </div>
        <hr>
        <div class='grid-cnt'>
            <div class='grid'>
                <NuxtLink v-for='item in items' :to='`/articles?tags=${item.tag}`' class='item'>
                    <div class='icon'>
                        <Icon :name='item.icon' size='32' />
                    </div>
                    <div class='title'>
                        {{ item.title }}
                    </div>
                    <div class='subtitle'>
                        {{ item.subtitle }}
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
    <Loader v-else />
</template>

<script setup>
const { users } = useUsersStore();
const { params } = useRoute();

const items = ref([
    {
        tag: 'python',
        icon: 'ion:logo-python',
        title: 'Python-ға кіріспе',
        subtitle: 'Көп функциялы веб-қосымшалар жасауға және тапсырмаларды автоматтандыруға мүмкіндік беретін Python қуаты мен икемділігін біздің курспен зерттеңіз.',
    },
    {
        tag: 'html',
        icon: 'ion:logo-html5',
        title: 'HTML негіздері',
        subtitle: 'Веб-беттің құрылымын құрудан бастап, мазмұнды безендіру үшін тегтерге тереңірек үңіле отырып, HTML көмегімен веб-әзірлеу негіздерін меңгеріңіз.',
    },
    {
        tag: 'css',
        icon: 'ion:logo-css3',
        title: 'CSS негіздері',
        subtitle: 'Әр түрлі қасиеттер мен селекторларды қолдана отырып, веб-беттеріңізге сұлулық пен стиль қосуға көмектесетін CSS курсымен стильдер әлеміне еніңіз.',
    },
    {
        tag: 'javascript',
        icon: 'ion:logo-javascript',
        title: 'JavaScript негіздері',
        subtitle: 'Интерактивті және динамикалық веб-қосымшаларды құруға, беттегі элементтердің әрекетін басқаруға және пайдаланушы оқиғаларын өңдеуге мүмкіндік беретін JavaScript күшін біліңіз.',
    },
]);

const user = ref(null);
const options = ref({
    month: 'short',
    day: 'numeric',
    year: 'numeric',
});

watch(() => params.id, (userId) => {
    const data = users.find((user) => {
        return user.id == userId;
    });

    if (data) {
        user.value = data;
    } else {
        showError({ statusCode: 404 });
    }
}, { immediate: true });

useHead({ title: `Profile | ${user.value?.name}` });
</script>

<style lang='scss' scoped>
.profile {
    margin: 25px 64px;

    .header {
        @include flex(flex-start, flex-start);

        .image-cnt {
            @include avatar(100px);
        }

        .info {
            @include flex($y: flex-start, $dir: column);
            flex: 1;
            height: 100px;
            margin: 0 15px;

            .name {
                font-size: 18px;
            }

            .created-at,
            .birth {
                font-size: 14px;
                color: rgba(var(--fg), 0.8);
            }
        }

        .actions {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
    }

    hr {
        border-color: #808080;
        border-width: 1px;
        width: 100%;
        border-style: solid;
        border-radius: 8px;
        margin-top: 25px
    }

    .grid-cnt {
        @include flex();
        background-image: radial-gradient(rgba(var(--primary), 0.1), rgb(var(--bg)) 40%);
        padding: 50px 0;

        .grid {
            @include flex($wrap: wrap, $gap: 32px);

            .item {
                @include flex($y: flex-start, $dir: column);
                flex-basis: 100%;
                padding: 24px;
                background-color: rgba(var(--fg), 0.01);
                border: 3px solid rgba(var(--fg), 0.1);
                border-radius: 16px;
                transition: 0.3s;

                .icon {
                    margin-bottom: 6px;
                }

                .title {
                    font-weight: 600;
                }

                .subtitle {
                    color: rgba(var(--fg), 0.6);
                    font-size: 14px;
                }

                &:hover {
                    background-color: rgba(var(--fg), 0.03);
                    scale: 1.01;
                }
            }
        }
    }
}

@media (max-width: 650px) {
    .profile {
        margin: 10px 16px;

        .header {
            position: relative;
            flex-direction: column;
            align-items: center;

            .info {
                align-items: center;
            }

            .actions {
                position: absolute;
                justify-content: space-between;
                flex-direction: row-reverse;
                width: 80%;
                top: 50%;
                transform: translateY(-50%);

                .action {
                    width: max-content;

                    span {
                        display: none;
                    }
                }
            }
        }
    }
}
</style>