import GuildSettingsModel, { IConfig } from "./IGuildSettingsController";
import { Snowflake, Guild } from "discord.js";
import { IGuildSettings } from "./IGuildSettingsController";

/**
 *
 * @param guildID Guild ID to search from.
 * @returns {Boolean} True if guild does exist.
 */
async function doesGuildExist(guildID: Snowflake) {
  return GuildSettingsModel.exists({ id: guildID });
}

async function getGuild(g: Guild): Promise<IGuildSettings> {
  let guild;
  let data = await GuildSettingsModel.findOne({ id: g.id });
  if (!data) {
    guild = await createGuildSettings(g);
  } else {
    guild = data;
  }
  return <IGuildSettings>(<unknown>guild);
}
async function createGuildSettings(
  guild: Guild,
  config?: IConfig
): Promise<IGuildSettings> {
  let cfg: IConfig = {
    prefix: ["+"],
    logChannel: "ASD",
    EventJoin: false,
    disabledCommandsPerChannel: new Map<string, string[]>(),
    disabledCategoriesPerChannel: new Map<string, string[]>(),
    disabledModulesPerChannel: new Map<string, string[]>(),
    disabledCategoriesServerWide: new Array<string>(),
    disabledCommandsServerWide: new Array<string>(),
    disabledModulesServerWide: new Array<string>(),
    modules: {
      nsfw: false,
      sb: false,
      xp: true,
      channels: {
        shChannel: "",
      },
    },
  };
  if (config) cfg = config;
  let data = await GuildSettingsModel.create({
    id: guild.id,
    owner: guild.ownerID,
    guildCreationDate: guild.createdAt,
    BotJoinDate: guild.joinedAt,
    config: cfg,
  });
  await data.save();
  return <IGuildSettings>(<unknown>data);
}

export default {
  doesGuildExist,
  getGuild,
  createGuildSettings,
};
