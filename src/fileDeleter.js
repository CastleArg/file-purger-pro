const fs = require('fs').promises;
const path = require('path');

const purgeDirectories = async (directoriesToPurge) => {
    console.log('beginning purge...')
    directoriesToPurge.forEach(async dir => {
        await fs.rmdir(dir, { recursive: true })
        console.log(`you just purged: ${dir}`)
    });
}

const matchesPurgeList = (dirName, purgeList) => {
    return purgeList.find(x => dirName.startsWith(x))
}

const getDirectoriesToPurge = async (rootDirectory, purgeList) => {
    const allItems = await fs.readdir(rootDirectory, { withFileTypes: true });

    return allItems
        .filter(x => x.isDirectory())
        .map(x => x.name)
        .filter(x => matchesPurgeList(x, purgeList))
        .map(x => path.join(rootDirectory, x));
}




module.exports = { purgeDirectories, getDirectoriesToPurge }