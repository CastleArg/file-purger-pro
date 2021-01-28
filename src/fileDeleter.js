const fs = require('fs').promises;

const purgeDirectories = async (directoriesToPurge) => {
    await fs.rmdir('/Users/markchurcher/Documents/dev/Developers-Institute-Classrooms-WDD03_001_Main_Project', { recursive: true })
    directoriesToPurge.forEach(dir => {
        fs.rmdir(dir, { recursive: true })
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
        .filter(x => matchesPurgeList(x, purgeList));

}




module.exports = { purgeDirectories, getDirectoriesToPurge }