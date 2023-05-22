const {sendEmail} = require('./helpers')
module.exports.handler = async (event) => {

  const message = JSON.parse(event.Records[0].Sns.Message);
    
  if(!message.successful){
    const res = await sendEmail();
   return res
  }
   return {
      statusCode: 200,
      body: 'the website is up!'
   }

};
