import kafka from '../../../../config/kafka';
import { Producer, ProducerRecord } from 'kafkajs';

class KafkaProducer {
  private producer: Producer;

  constructor() {
    this.producer = kafka.producer();
  }

  async run( message:any, topicName: string): Promise<void> {
    await this.producer.connect();

    const record: ProducerRecord = {
      topic: topicName,
      messages: [{ value: JSON.stringify(message) }]
    };

    await this.producer.send(record);

    await this.producer.disconnect();
  }
}

export default KafkaProducer;
