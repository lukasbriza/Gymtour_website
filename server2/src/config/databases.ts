export enum DB {
  images = "images",
  gymtour = "gymtour",
}
export const databases = {
  imgDatabase: {
    name: "gymtourImg",
    imgBucket: DB.images,
  },
  docDatabase: {
    name: DB.gymtour,
  },
};
