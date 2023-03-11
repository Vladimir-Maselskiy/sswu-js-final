export const fetchService = async () => {
  return await fetch('../data/service.json').then(res => res.json());
};
