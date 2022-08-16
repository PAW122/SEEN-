//sprawdza ilość lvla i jeżeli jest ospowiednio wysyka zwiększa nasz lvl
//musi być wywoływane po urzyciu każdej komendy z rpg//start tworzy profil gracza
//musi miec przekazywany inter żeby mógł stwirdzić id urzytkownik itp
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = (inter) => {
async function leweling(inter){
    await new Promise(r => setTimeout(r, 2000));

    const guildId = inter.guild.id
    const userId = inter.user.id
    const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });


    const ilość_lvla = await db.get(`${userId}.xp`)
    const lewel = await db.get(`${userId}.lvl`)

    if (ilość_lvla >= 1000 && ilość_lvla < 2000) {
        var lvl = 1
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 2000 && ilość_lvla < 4000) {
        var lvl = 2
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 4000 && ilość_lvla < 8000) {
        var lvl = 3
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 8000 && ilość_lvla < 16000) {
        var lvl = 4
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 16000 && ilość_lvla < 32000) {
        var lvl = 5
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 32000 && ilość_lvla < 60000) {
        var lvl = 6
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 6000 && ilość_lvla < 100000) {
        var lvl = 7
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 100000 && ilość_lvla < 130000) {
        var lvl = 8
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 130000 && ilość_lvla < 160000) {
        var lvl = 9
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 160000 && ilość_lvla < 190000) {
        var lvl = 10
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 190000 && ilość_lvla < 220000) {
        var lvl = 11
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 220000 && ilość_lvla < 250000) {
        var lvl = 12
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 250000 && ilość_lvla < 280000) {
        var lvl = 13
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 280000 && ilość_lvla < 310000) {
        var lvl = 14
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 310000 && ilość_lvla < 340000) {
        var lvl = 15
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 340000 && ilość_lvla < 370000) {
        var lvl = 16
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 370000 && ilość_lvla < 400000) {
        var lvl = 17
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 400000 && ilość_lvla < 430000) {
        var lvl = 18
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 430000 && ilość_lvla < 460000) {
        var lvl = 19
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 460000 && ilość_lvla < 490000) {
        var lvl = 20
        return await db.set(`${userId}.lvl`, lvl)
    } else if (ilość_lvla >= 490000 && ilość_lvla < 520000) {
        var lvl = 21
        return await db.set(`${userId}.lvl`, lvl)
    }

    if(lvl > lewel){
        inter.reply(`wbiłeś ${lvl} lewel`)
    }
    console.log("lvling")
}
leweling(inter)

} 