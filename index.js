const Discord = require("discord.js")
const client = new Discord.Client();
const express = require("express")
const server = express();

server.all('/', (req, res) => {
    res.write('haloh')
    res.end();
})

function keepAlive() {
    server.listen(5000)
    console.log("Server is Online")
}

keepAlive()

function checkString(string, include) {
    const memeg = include.toLowerCase()
    if (string.indexOf(memeg) !== -1) {
        return true;
    } else {
        return false;
    }
}

client.on('ready', () => {
    console.log(client.user.tag + " is online")

    client.user.setActivity("Join Hoki Store!")
})

client.on('message', async message => {
    // anti server advertisement

    const prefix = "!"
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix).trim().split(/ +/g);
    const body = args.shift().toLowerCase();
    const command = body.slice(1)

    if (command == "embed") {
        if (args.length == 0) return message.reply('Please specify your message.')

        const msg = message.content.slice(6)

        const emk = new Discord.MessageEmbed()
        emk.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        emk.setColor('RANDOM')
        emk.setTitle(`**Embedded Message created by** ${message.author.username}#${message.author.discriminator}`)
        emk.setDescription(msg)

        message.delete()

        message.channel.send(emk)
    }

    else if (command == "edit") {
        if (message.member.roles.cache.some(r => r.id === "959391265361899525")) {
            if (args.length == 0) return message.reply('Please specify your message.')

            const msg = message.content.slice(5)

            try {
                message.channel.messages.fetch().then(memek => {
                    memek.forEach(eachMemeks => {
                        if (eachMemeks.id == message.reference.messageID) {
                            const emk = new Discord.MessageEmbed()
                            emk.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                            emk.setColor('RANDOM')
                            emk.setTitle(`**Embedded Message created by** ${message.author.username}#${message.author.discriminator}`)
                            emk.setDescription(msg)
                            message.delete()

                            eachMemeks.edit(emk)
                        }
                    })
                })
            } catch (err) {
                if (err.message == "Cannot read properties of null (reading 'messageID')") {
                    return message.reply("Please reply to the message you wanted to edit!")
                }
            }
        } else {
            return message.reply("You don't have permission to use this command!")
        }
    }
})

client.login(process.env.TOKEN9)