import moment from 'moment';

export const returnMonthlyDollarDataContainer = () => ({
  Jan: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Feb: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Mar: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Apr: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  May: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  June: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Jul: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Aug: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Sep: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Oct: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Nov: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Dec: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
});

export const returnMonthlyDealNumberDataContainer = () => ({
  Jan: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Feb: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Mar: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Apr: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  May: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  June: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Jul: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Aug: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Sep: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Oct: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Nov: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
  Dec: {
    'Com Sales': 0.001,
    'Com Rentals': 0.001,
    'Res Sales': 0.001,
    'Res Rentals': 0.001,
  },
});

export const returnNumberDealsDataContainer = () => {
  const currentYear = moment().year();
  const years = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];

  const data = {};

  years.forEach(year => {
    data[year] = {
      'Com Sales': 0.001,
      'Com Rentals': 0.001,
      'Res Sales': 0.001,
      'Res Rentals': 0.001,
    };
  });

  return data;
};

export const returnYearlyDollarDealsDataContainer = () => {
  const currentYear = moment().year();
  const years = [
    currentYear,
    currentYear - 1,
    currentYear - 2,
    currentYear - 3,
    currentYear - 4,
  ];

  const data = {};

  years.forEach(year => {
    data[year] = {
      'Com Sales': 0.001,
      'Com Rentals': 0.001,
      'Res Sales': 0.001,
      'Res Rentals': 0.001,
    };
  });

  return data;
};
