export const fetchWeather = async () => {
  const key = 'e8ba45d968ebb1df789279ceed3d5e53';
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=50.36846&lon=30.45608&units=metric&appid=${key}`
  )
    .then(res => res.json())
    .catch(error => {
      console.log(error.message);
    });
};
