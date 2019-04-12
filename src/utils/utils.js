export const checkFavorite = (target, items) => {
	return items.find(item => {
		const id = target.id ? target.id : target.fullName;
		return id.toString() === item;
	})
};
