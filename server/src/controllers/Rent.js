export const renderRentPage = (req, res) => {
  const { itemId } = req.params.itemId;
  res.render("index", { itemId });
};
