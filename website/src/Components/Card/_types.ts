import { Coach, Fitness } from "@fetchers";

export type CardProps = (Coach | Fitness) & { type: "coach" | "fitness" };
