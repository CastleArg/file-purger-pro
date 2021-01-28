// allow users to enter their personal settings in a non scary config file - not tampering with my code!
let { rootDirectory, prefixesToPurge } = require('../config.json');
const { getDirectoriesToPurge, purgeDirectories } = require('./fileDeleter');
const { userConfirm } = require('./userPrompter');


const main = async () => {
    if (prefixesToPurge.length < 1) {
        throw new Error('please declare prefixes to purge')
    }
    rootDirectory = rootDirectory || __dirname;

    // this was a little complicated so I abstracted it to another module
    const directoriesToPurge = await getDirectoriesToPurge(rootDirectory, prefixesToPurge)

    if (directoriesToPurge.length === 0) {
        console.log('great news! no directories to purge.');
        process.exit()
    }

    if (await userConfirm(directoriesToPurge)) {
        await purgeDirectories(directoriesToPurge)
        console.log(`${directoriesToPurge.length} directories purged.   Have a great day!`)
    }
}

main();

