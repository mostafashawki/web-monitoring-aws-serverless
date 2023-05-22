const fs = require('fs/promises');
module.exports.handler = async (event) => {
  const message = event.Records[0].Sns.Message;
  try {
    await fs.writeFile('./src/db/last-visit.json', message);
    return {
        statusCode: 200,
        body: message
    }
  } catch (err) {
    console.log(err);
    return err
  }

};
