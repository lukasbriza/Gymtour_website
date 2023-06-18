import { Coach, Fitness } from "src/fetcher/_index";

export type CardProps = (Coach | Fitness) & { type: "coach" | "fitness" };
