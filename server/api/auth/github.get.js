import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const { code } = getQuery(event);

    if (!code) {
        return createError({
            statusCode: 400,
            data: {
                msg: 'Code not provided',
            },
        });
    }

    const config = useRuntimeConfig(event);

    const { login, avatar_url, email, verified } = await getGithubUser(config, code);

    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            'SELECT * FROM User WHERE email=?', [email],
        );

        if (!user) {
            return {
                user: { login, avatar_url, email, verified },
                newOAuthUser: true,
            };
        }

        const token = await authenticate(event, user.id);

        const { password, ...userData } = user;

        return {
            token: token,
            user: { ...userData },
            msg: `Сіз ${user.name} ретінде сәтті кірдіңіз`,
        };
    } catch (err) {
        return createError({
            statusCode: 500,
            data: {
                msg: 'There was an error during GitHub OAuth',
            },
        });
    } finally {
        await conn.end();
    }
});