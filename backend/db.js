import {Sequelize} from 'sequelize';
export default async function () {
    const db = new Sequelize('Podcast', 'podcast_app_user', 'app_password', {
        host: 'localhost',
        dialect: 'mysql'
    });

    try {
        await db.authenticate();
        console.log("db initialized");
    } catch (error) {
        console.error("Unable to connect to the database", error);
        throw error;
    }

    return db;
}
