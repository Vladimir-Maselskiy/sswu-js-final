export const getFilteredSesvices = (filterButton, serviceContent) => {
  let res = [];
  switch (filterButton) {
    case 'all':
      serviceContent.forEach(group => {
        res.push({
          id: group.data[0].id,
          group: group.id,
          name: group.name,
          description: group.data[0].description,
        });
      });
      break;

    case 'interior': {
      serviceContent[0].data.forEach(project => {
        res.push({
          id: project.id,
          group: serviceContent[0].id,
          name: serviceContent[0].name,
          description: project.description,
        });
      });
      break;
    }
    case 'architecture': {
      serviceContent[1].data.forEach(project => {
        res.push({
          id: project.id,
          group: serviceContent[1].id,
          name: serviceContent[1].name,
          description: project.description,
        });
      });
      break;
    }
    case 'planning': {
      serviceContent[2].data.forEach(project => {
        res.push({
          id: project.id,
          group: serviceContent[2].id,
          name: serviceContent[2].name,
          description: project.description,
        });
      });
      break;
    }
  }
  return res;
};
