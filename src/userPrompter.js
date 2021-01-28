
const { Confirm } = require('enquirer');

const userConfirm = async (directoriesToPurge) => {
    const prompt = new Confirm({
        name: 'question',
        message: `delete the following directories? ${directoriesToPurge.join('\n')}`
    });
    const answer = await prompt.run();
    return answer;
}

module.exports = { userConfirm }