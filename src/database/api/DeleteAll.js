import { database } from '../db';

/**
 * Deletes all data from the WatermelonDB database.
 */
async function deleteEverythingInDB() {
    await database.write(async () => {
        const collections = database.collections;

        // Iterate through all collections and delete data
        for (const collectionName in collections.map) {
            const collection = collections.get(collectionName);
            await collection.query().destroyAllPermanently();
        }
    });
    console.log('All data deleted from the database.');
}

export { deleteEverythingInDB };
