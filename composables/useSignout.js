export default async function () {
    useNotification('Сіз аккаунтыңыздан сәтті шықтыңыз');
    const token = useCookie('token');
    const store = useUserStore();
    const router = useRouter();

    token.value = null;
    store.$reset();
    await router.push('/');
}