import { Coach, Fitness } from "src/fetcher";

export type CardProps = (Coach | Fitness) & { type: "coach" | "fitness" };
