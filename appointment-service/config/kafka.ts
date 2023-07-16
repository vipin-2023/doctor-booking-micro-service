import { Kafka, KafkaConfig } from 'kafkajs';

const kafkaConfig: KafkaConfig = {
  clientId: 'my-kafka-app',
  brokers: ['localhost:9092'] // Array of Kafka broker addresses
};

const kafka = new Kafka(kafkaConfig);

export default kafka;
