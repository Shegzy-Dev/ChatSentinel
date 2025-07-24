// index.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config();

const TELEGRAM_BOT_TOKEN = process.env.TG_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TG_CHAT_ID;

console.log('TG:', TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID);

// === Init Telegram Bot ===
const tgBot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, // Use system Chromium!
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
});

// === CONFIG ===
const importantPeople = ['Shegzy Dev', 'Jane Smith']; // Replace with your real contact names
const importantGroups = ['Family', 'Work']; // Replace with real group names
const logGroupName = 'Alerts'; // The private group you made to get the alerts

// === QR Login ===
client.on('qr', (qr) => {
  console.log('Scan this QR code with your phone:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log(
    '✅ WhatsApp bot is ready and watching for important messages...'
  );
});

// === Incoming message handler ===
client.on('message', async (message) => {
  const chat = await message.getChat();

  if (chat.isGroup) {
    const groupName = chat.name;
    const contact = await message.getContact();
    const senderName = contact.pushname || contact.number;

    // Check if it matches your alert rules
    if (
      importantPeople.includes(senderName) &&
      importantGroups.includes(groupName)
    ) {
      console.log('🚨 ALERT: Important message detected!');

      console.log(
        `Group: ${groupName} | From: ${senderName} | Message: ${message.body}`
      );

      // Find your log group
      const chats = await client.getChats();
      const logGroup = chats.find((c) => c.isGroup && c.name === logGroupName);

      if (logGroup) {
        await logGroup.sendMessage(
          `🚨 *ALERT!*\nFrom: ${senderName}\nGroup: ${groupName}\nMessage: "${message.body}"`
        );
        console.log(`✅ Sent alert to log group: ${logGroupName}`);
      } else {
        console.log(
          `⚠️ Log group "${logGroupName}" not found! Make sure it exists.`
        );
      }

      //Telegram push alert
      tgBot
        .sendMessage(
          TELEGRAM_CHAT_ID,
          `🚨 *ChatSentinel Alert*\nFrom: ${senderName}\nGroup: ${groupName}\nMessage: "${message.body}"`
        )
        .then(() => console.log(`✅ Sent Telegram push`));
    }
  }
});

// Start it up
client.initialize();
