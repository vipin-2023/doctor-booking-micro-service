import KafkaProducer from "./kafkaProducer";
import KafkaConsumer from "./kafkaConsumer";
import KafkaTopics from "./kafkaTopics";
import {ClientService} from "../../../domain/client/service/ClientService";
import {DoctorService} from "../../../domain/doctor/service/DoctorService";

const clientService = new ClientService();
const doctorService = new DoctorService();
const consumerUserAsked = new KafkaConsumer(KafkaTopics.UserNotification);


consumerUserAsked.run().catch(console.error);
consumerUserAsked.onMessageReceived(async (message) => {

try {
    if(message){
    
      const user = await clientService.getByClientId(message.id);
      if(user){
      const update ={
        $push:{notification :{ 
            type: "New-appointment-request",
            message: `A new Appointment Request from ${user.name}`,
            onCLickPath: "/user/appointments",
      }}
      }
      const userUpdate = await clientService.updateClient(message.id,update);
      if(userUpdate){
        const producer = new KafkaProducer();
        
      }
     

      }
       
       

    //   if (!doctor) {
    //    await producer.run(doctor,KafkaTopics.UserResponse).catch(console.error);
    //   }else{
    //     producer.run(false,KafkaTopics.UserResponse).catch(console.error);
    //   } 
    }
    
} catch (error) {
    console.log(error)
} 
});