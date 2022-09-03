const config = require("../../../config/rpg")
const daily_basic_coins = config.daily_basic_coins

const daily_basic_daimonds_min = config.daily_basic_daimonds_min
const daily_basic_daimonds_max = config.daily_basic_daimonds_max

const daily_basic_xp_min = config.daily_basic_xp_min
const daily_basic_xp_max = config.daily_basic_xp_max

const Discord = require('discord.js');
const { QuickDB } = require("quick.db");
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = (ilość_h) => {

    const coins = daily_basic_coins

    //diamenty
}