export default defineNuxtConfig({
    devtools: { enabled: true },
    runtimeConfig: {
        databaseURL: '',
        jwtKey: '',
        googleOAuthClientSecret: '',
        githubOAuthClientSecret: '',
        imgurOAuthClientSecret: '',
        public: {
            googleOAuthRedirectURI: 'http://192.168.1.93.nip.io:3000/oauth',
            googleOAuthClientID: '',
            githubOAuthClientID: '',
            imgurOAuthClientID: '',
        },
    },
    modules: [
        'nuxt-icon',
        '@pinia/nuxt',
        'nuxt-tiptap-editor',
    ],
    css: [
        '~/assets/main.scss',
        '~/assets/vars.scss',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/mixins.scss" as *;',
                },
            },
        },
    },
    tiptap: {
        prefix: 'Tiptap',
        lowlight: {
            theme: 'github-dark',
        },
    },
});