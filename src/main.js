"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const PRODUCTION = 'PRODUCTION-202204182202-676015380';
const BASE_PATH = './generated/';
const FULL_PATH = `${BASE_PATH}${PRODUCTION}`;
const getHeaders = async () => {
    try {
        // Get headers from sulek API
        const { data } = await axios_1.default.get(`https://api.sulek.dev/releases/${PRODUCTION}/messages`);
        const { messages: { outgoing, incoming } } = data;
        // Create folder to place all PRODUCTIONS
        if (!fs_1.default.existsSync(BASE_PATH)) {
            fs_1.default.mkdirSync(BASE_PATH, { recursive: true });
        }
        // Create PRODUCTION folder
        if (!fs_1.default.existsSync(FULL_PATH)) {
            fs_1.default.mkdirSync(FULL_PATH, { recursive: true });
        }
        // Write ServerPacketHeader
        const outgoingEdited = outgoing.map(header => `public const int ${header.name} = ${header.id};\n`).join().replaceAll(',', '');
        fs_1.default.writeFile(`${FULL_PATH}/ServerPacketHeader.txt`, outgoingEdited, err => {
            if (err) {
                console.error(err);
            }
        });
        // Write ClientPacketHeader
        const incomingEdited = incoming.map(header => `public const int ${header.name} = ${header.id};\n`).join().replaceAll(',', '');
        fs_1.default.writeFile(`${FULL_PATH}/ClientPacketHeader.txt`, incomingEdited, err => {
            if (err) {
                console.error(err);
            }
        });
    }
    catch (e) {
        console.log('Occured any error, check if PRODUCTION is correct');
    }
};
getHeaders();
