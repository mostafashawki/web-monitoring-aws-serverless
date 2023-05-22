const fs = require('fs/promises');
module.exports.handler = async () => {
  try {
    const lastVisit = await fs.readFile('./src/db/last-visit.json','utf8');
    return lastVisit;

  } catch (err) {
    console.log(err);
    return err
  }

};
