const {getVisit, publishVisitIntoSNS} = require('./helpers')

module.exports.run = async (event, context) => {
  
  const visit = await getVisit();
  //handle if error here
  const SNSRes = await publishVisitIntoSNS(visit);
  // console.log('hey SNS RES ====>>>>>>>> ', SNSRes)
  console.log('visit ====>>>>>>>> ', visit)

};
