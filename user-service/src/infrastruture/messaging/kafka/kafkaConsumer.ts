import kafka from '../../../../config/kafka';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { EventEmitter } from 'events';

class KafkaConsumer {
  private consumer: Consumer;
  private eventEmitter: EventEmitter;

  constructor(private topicName: string) {
    this.consumer = kafka.consumer({ groupId: 'my-group' });
    this.eventEmitter = new EventEmitter();
  }

  async run(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topicName });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
        if (message.value !== null) {
          const value = JSON.parse(message.value.toString());

          // Emit an event or invoke callback functions with the received message
          
          this.eventEmitter.emit('messageReceived', value);
        }
      },
    });
  }

  onMessageReceived(callback: (message: any) => void): void {
    this.eventEmitter.on('messageReceived', callback);
  }
}

export default KafkaConsumer;


