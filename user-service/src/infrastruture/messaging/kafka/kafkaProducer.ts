import kafka from '../../../../config/kafka';
import { Producer, ProducerRecord } from 'kafkajs';

class KafkaProducer {
  private producer: Producer;

  constructor(private message, private topicName: string) {
    this.producer = kafka.producer();
  }

  async run(): Promise<void> {
    await this.producer.connect();

    const record: ProducerRecord = {
      topic: this.topicName,
      messages: [{ value: this.message }]
    };

    await this.producer.send(record);

    await this.producer.disconnect();
  }
}

export default KafkaProducer;
