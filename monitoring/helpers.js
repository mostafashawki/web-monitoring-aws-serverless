const axios = require("axios");
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const snsClient = new SNSClient();

/**
 * use axios to intercept a GET request start time before and after the request 
 * to check performance and status
 * @returns visit object
 */
async function getVisit() {

    //intercept
    axios.interceptors.request.use((config) => {
        config.metadata = { startTime: new Date() }
        return config;
      }, (error) => Promise.reject(error));
    
      axios.interceptors.response.use( (response) => {
        response.config.metadata.endTime = new Date()
        response.duration = response.config.metadata.endTime - response.config.metadata.startTime
        return response;
      }, (error) => Promise.reject(error));

    let visit = {}
    try {
      const response = await axios.get(process.env.URL_TO_CHECK);
      visit = {
        timestamp: new Date(),
        responseDuration: response.duration,
        successful: true
      };
      return visit
    } catch (error) {
      visit = {
        timestamp: new Date(),
        successful: false
      };
      console.log(error);
      return visit
    }
  }

  const publishVisitIntoSNS = async (visit) => {
    const params = {
      Message: JSON.stringify(visit),
      TopicArn: process.env.SNS_ARN
    };
    
  
    try {
      const data = await snsClient.send(new PublishCommand(params));
      console.log("Success.",  data);
      return data; // For unit tests.
    } catch (err) {
      //you should save to dead-letter queue (DLQ)
      console.log("Error", err.stack);
      return err;
    }
  
  
  };

  module.exports = {
    getVisit, publishVisitIntoSNS
  };