export const checkFavorite = (target, items) => {
  return items.find((item) => {
    const id = target.id ? target.id : target.name;
    return id.toString() === item;
  });
};

export const updateArray = (arr, target) => {
  arr.forEach((item, i) => {
    if (item === target) {
      arr.splice(i, 1);
    }
  });
  arr.push(target);
};

export const remove = (arr, target) => {
  if (!arr) {
    return;
  }
  arr.forEach((item, i) => {
    if (item === target) {
      arr.splice(i, 1);
    }
  });
};
