import { createConnection } from 'mysql2/promise';

export default defineEventHandler(async (event) => {
    const userId = await checkAuth(event);

    const config = useRuntimeConfig(event);
    const conn = await createConnection(config.databaseURL);

    try {
        const [[user]] = await conn.query(
            'SELECT name, imageHash FROM User WHERE id=?', [userId],
        );

        if (user.imageHash) {
            await del(event, user.imageHash);
        }

        await conn.query(
            'DELETE FROM User WHERE id=?', [userId],
        );

        await conn.commit();
        return;
    } catch (err) {
        await conn.rollback();
        return createError({
            statusCode: 500,
            data: {
                msg: 'An error occurred while deleting an account',
            },
        });
    } finally {
        await conn.end();
    }
});