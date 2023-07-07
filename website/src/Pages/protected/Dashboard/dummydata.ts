export const user = {
  _id: {
    $oid: "64288f2967746143ec840e34",
  },
  username: "name1",
  password: "$2b$10$959o122e8SFYYm2gJQ1wbumA7NTp3.FkjI/2FWqLzXz6rTd.aiMOe",
  email: "lukas@seznam.cz",
  emailUpdate: {
    value: null,
    validTo: {
      $date: "2023-04-01T20:08:09.660Z",
    },
  },
  fitnessOwned: ["64289ef7dbc058577a6a7c6a"],
  coachOwned: ["64a58fa3c0ec9f98694dee10"],
  isAdmin: true,
  agreement: {
    terms: {
      status: true,
      awarded: {
        $date: "2023-04-01T20:08:09.660Z",
      },
    },
    dataProcessingForPropagation: {
      status: true,
      awarded: {
        $date: "2023-04-01T20:08:09.660Z",
      },
    },
  },
};
export const fitness = [
  {
    _id: {
      $oid: "64289ef7dbc058577a6a7c6a",
    },
    name: "FitnessNameUpdate2",
    street: "Hokajova 675",
    town: 12,
    region: 1,
    IN: 25596641,
    priceLevel: 2,
    contact: {
      tel: 123456789,
      email: "fitness@seznam.cz",
      facebook: "www.facebook.com",
      google: "www.gooogle.cz",
      instagram: "www.instagram.cz",
      mobile: 123456789,
      twitter: "www.twitter.cz",
      web: "www.fitness.cz",
      youtube: "www.youtube.com",
    },
    filters: {
      equipment: ["1", "2", "4", "8"],
      general: ["1", "2", "4"],
      others: ["1", "2", "3"],
    },
    open: {
      mon: {
        from: 8,
        to: 16,
      },
      tue: {
        from: 8,
        to: 16,
      },
      wed: {
        from: 8,
        to: 16,
      },
      thu: {
        from: 8,
        to: 16,
      },
      fri: {
        from: 8,
        to: 16,
      },
      sat: {
        from: 8,
        to: 16,
      },
      sun: {
        from: 8,
        to: 16,
      },
    },
    descriptionBasic: "some basic description...",
    descriptionFull: "full description...",
    pictures: {
      card: "6428a16adbc058577a6a7c74",
      detail: {
        main: "6428a16adbc058577a6a7c74",
        others: [],
      },
    },
    agreement: {
      terms: {
        status: true,
        awarded: {
          $date: "2023-04-01T21:15:35.093Z",
        },
      },
      dataProcessingForPropagation: {
        status: true,
        awarded: {
          $date: "2023-04-01T21:15:35.093Z",
        },
      },
    },
    owner: "64288f2967746143ec840e34",
    topped: {
      value: false,
      toDate: null,
    },
    approved: false,
    views: 8,
    popularity: ["64288f2967746143ec840e34"],
    __v: 0,
  },
];

export const coaches = [
  {
    _id: {
      $oid: "64a58fa3c0ec9f98694dee10",
    },
    name: "CoachName",
    alias: "Alias",
    workPlace: "FitnessName",
    town: 11,
    region: 1,
    street: "Hokajova 675",
    priceLevel: 2,
    contact: {
      tel: 774876504,
      mobile: 123456789,
      email: "coach5@seznam.cz",
      web: "www.coach.cz",
      facebook: "www.facebook.com",
      twitter: "www.twitter.cz",
      google: "www.gooogle.cz",
      instagram: "www.instagram.cz",
      youtube: "www.youtube.com",
    },
    filters: {
      gender: "1",
      specialization: ["1", "2", "3", "4"],
      others: ["1"],
    },
    descriptionBasic: "some basic description...",
    descriptionFull: "full description...",
    pictures: {
      card: "64a5a4ecc0ec9f98694dee13",
      detail: {
        main: "64a5a4ecc0ec9f98694dee14",
        others: ["64a5a4ecc0ec9f98694dee15"],
      },
    },
    agreement: {
      terms: {
        status: true,
        awarded: {
          $date: "2023-07-05T15:43:31.235Z",
        },
      },
      dataProcessingForPropagation: {
        status: true,
        awarded: {
          $date: "2023-07-05T15:43:31.235Z",
        },
      },
    },
    owner: "64288f2967746143ec840e34",
    topped: {
      value: false,
      toDate: null,
    },
    approved: false,
    views: 0,
    popularity: [],
    __v: 0,
  },
];

export const fitnessLiked = [{ _id: "64a58fa3c0ec9f98694dee10", name: "FitnessNameUpdate2", town: 12, region: 1 }];
export const coachLiked = [{ _id: "64a58fa3c0ec9f98694dee10", name: "CoachName", town: 11, region: 1 }];
