//sprawdza ilość expa i jeżeli jest ospowiednio wysyka zwiększa nasz lvl
//musi być wywoływane po urzyciu każdej komendy z rpg//start tworzy profil gracza
//musi miec przekazywany inter żeby mógł stwirdzić id urzytkownik itp
const { QuickDB } = require("quick.db");
const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports =(inter) => {

    await new Promise(r => setTimeout(r, 2000));
   
        const guildId = inter.guild.id
        const userId = inter.user.id
        const db = new QuickDB({ filePath: process.cwd() + `/db/rpg/${guildId}.sqlite` });


           const ilość_expa = await db.get(`${userId}.xp`)

           if(ilość_expa >= 1000 && ilość_expa <2000) {
            const lvl = 1
            return await db.set(`${userId}.exp`,lvl)
           }else if(ilość_expa >= 2000 && ilość_expa <4000) {
            const lvl = 2
            return await db.set(`${userId}.exp`,lvl)
           }else if(ilość_expa >= 4000 && ilość_expa <8000) {
            const lvl = 3
            return await db.set(`${userId}.exp`,lvl)
           }else if(ilość_expa >= 8000 && ilość_expa <16000) {
            const lvl = 4
            return await db.set(`${userId}.exp`,lvl)
           }else if(ilość_expa >= 16000 && ilość_expa <32000) {
            const lvl = 5
            return await db.set(`${userId}.exp`,lvl)
           }else if(ilość_expa >= 32000 && ilość_expa <60000) {
            const lvl = 6
            return await db.set(`${userId}.exp`,lvl)
           }else if(ilość_expa >= 6000 && ilość_expa <100000) {
            const lvl = 7
            return await db.set(`${userId}.exp`,lvl)
           }else if(ilość_expa >= 100000 && ilość_expa <130000) {
            const lvl = 8
            return await db.set(`${userId}.exp`,lvl)
           }else {
            //jakiś lvl musi już być przypisany
            var exp_up = 100000
            var lewel = 8
            const level = await db.get(`${userId}.lvl`) -8
            level.forEach(element => {
                exp_up + 30000
                lewel += 1
            });
            
            await db.set(`${userId}.lvl`,lewel)
            return await db.set(`${userId}.exp`,exp_up)
           }
        } 




    


