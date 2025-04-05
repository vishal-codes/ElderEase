// lib/appwrite.ts
import { Client, Databases, Account, ID, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // replace with your endpoint if self-hosted
  .setProject('67f1787000274f96fa64'); // get this from Appwrite console

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account, ID , Query};
