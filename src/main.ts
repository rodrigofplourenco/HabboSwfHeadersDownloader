import axios from 'axios';
import { IReceivedData } from './types';
import fs from 'fs';

const PRODUCTION = 'PRODUCTION-202204182202-676015380';
const BASE_PATH = './generated/';
const FULL_PATH = `${BASE_PATH}${PRODUCTION}`;

const getHeaders = async () => {
  // Get headers from sulek API
  const { data } = await axios.get<IReceivedData>(`https://api.sulek.dev/releases/${PRODUCTION}/messages`);
  const { messages: { outgoing, incoming } } = data;

  // Create folder to place all PRODUCTIONS
  if (!fs.existsSync(BASE_PATH)){
    fs.mkdirSync(BASE_PATH, { recursive: true });
  }

  // Create PRODUCTION folder
  if (!fs.existsSync(FULL_PATH)){
    fs.mkdirSync(FULL_PATH, { recursive: true });
  }

  // Write ServerPacketHeader
  const outgoingEdited = outgoing.map(header => `public const int ${header.name} = ${header.id};\n`).join().replaceAll(',', '');
  fs.writeFile(`${FULL_PATH}/ServerPacketHeader.txt`, outgoingEdited, err => {
    if (err) {
      console.error(err);
    }
  });

  // Write ClientPacketHeader
  const incomingEdited = incoming.map(header => `public const int ${header.name} = ${header.id};\n`).join().replaceAll(',', '');
  fs.writeFile(`${FULL_PATH}/ClientPacketHeader.txt`, incomingEdited, err => {
    if (err) {
      console.error(err);
    }
  });
}

getHeaders();