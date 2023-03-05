import { FilterModel } from "../model";

export const get = async () => {
  const data = await FilterModel.findOne().exec();
};
