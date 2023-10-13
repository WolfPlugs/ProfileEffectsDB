import { Injector, Logger, webpack, common } from "replugged";
import db from "./example.json";
const { users } = common;

const inject = new Injector();
const logger = Logger.plugin("ProfileEffects DB");

// prfile id here replugged.webpack.getBySource('getProfileEffectById')

const data = await webpack.waitForProps("getUser", "getCurrentUser").then(Object.getPrototypeOf);
const userss = webpack.getByStoreName("UserProfileStore");

export async function start(): Promise<void> {
  inject.after(userss, "getUserProfile", (_, res) => {
    if (res?.userId) {
      if (db.userID === res.userId) {
        addEffects(res.userId);
        res.profileEffectID = "1139323075519852625";
      }
    }
  });
}

async function addEffects(userId: number) {
  const effects = webpack.getBySource("getProfileEffectById").profileEffects;
  const schema = {
    id: userId,
    config: {
      ...db,
      description: "User Effects",
    },
  };
  if (effects.find((e: any) => e.id === userId)) return;
  effects.push(schema);
}

export function stop(): void {
  inject.uninjectAll();
}
