import Products from "../models/Products.model.js";

export const getProductsByIds = async (ids) => {
  if (!ids.length) return [];

  return await Products.find({
    _id: { $in: ids },
  });
};
