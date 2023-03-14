export const fetchService = async () => {
  return await fetch('../data/service.json', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(res => {
      console.log('res.json', res.json());
      return res.json();
    })
    .catch(error => console.log('error in fetchService', error));
};
