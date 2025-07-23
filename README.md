# ChatSentinel

**ChatSentinel** is your personal WhatsApp watchdog. It monitors your WhatsApp groups for messages from specific important contacts and automatically forwards an alert to a private log group, so you never miss vital messages hidden in the daily flood of group chatter.

## 📌 Features

- ✅ Runs on your personal WhatsApp account via WhatsApp Web
- ✅ Watches all incoming group messages
- ✅ Matches messages from your chosen *important people* in *important groups*
- ✅ Sends custom alerts to your private log group on WhatsApp
- ✅ Fully private — runs on your own server or PC
- ✅ Powered by [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)

## ⚙️ How it works

1. ChatSentinel logs into your WhatsApp via a QR code, just like WhatsApp Web
2. It keeps your session alive on your machine or server
3. It listens for incoming messages
4. When it detects a message from a priority contact in a target group, it forwards an alert to your designated private log group
5. You check just your log group and never miss an important update again!

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/shegzy-dev/chatsentinel.git
cd chatsentinel
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure your rules

Open `index.js` and edit these parts:

```js
const importantPeople = ['John Doe', 'Jane Smith'];
const importantGroups = ['Work Team', 'Family Chat'];
const logGroupName = 'My Alerts'; // The private log group you create yourself
```

- Replace `importantPeople` with exact contact names
- Replace `importantGroups` with your group names
- Replace `logGroupName` with the name of your private log group (make this manually on WhatsApp — just add yourself)

### 4️⃣ Run the bot

```bash
node index.js
```

When you run it the first time, you'll see a QR code in your terminal — scan it with your WhatsApp app, just like logging into WhatsApp Web.

### 5️⃣ Keep it alive

To run it 24/7, use PM2:

```bash
npm install -g pm2
pm2 start index.js --name chatsentinel
pm2 save
pm2 startup
```

Your bot will now restart automatically on reboot.

## 💡 Where should I run this?

ChatSentinel works best if you run it on:

- Your personal laptop/PC (as long as it stays online)
- A Raspberry Pi (low power, always on)
- A small VPS (AWS Free Tier works great for a year)

## 🔐 Privacy Note

- This bot uses your own WhatsApp account via an automated WhatsApp Web session
- It does not store or share your messages anywhere else
- You control where it runs
- Never share your session files!

## ⚠️ Disclaimer

- This tool uses an unofficial WhatsApp Web library (whatsapp-web.js)
- Use responsibly. Excessive automation may violate WhatsApp's Terms of Service — run this only for your own personal messages

## ✨ Credits

- Built with [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- QR code generation by [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)

## 📬 License

MIT License — do whatever you want, but use at your own risk.

## 📣 Contributing

Pull requests welcome! Ideas for enhancements — like Telegram fallback, smarter AI message filters, or push notifications — are highly encouraged.

**Happy Watching! 🛡️✨**
