export const fetchService = async () => {
  return await fetch('../data/service.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(res => res.json());
};
