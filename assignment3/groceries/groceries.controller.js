const groceries = [];

const GetGroceries = (req, res) => {
  res.status(200).send({
    data: groceries,
    error: null,
  });
};

const getOneGrocery = (req, res) => {
  const id = req.params.id;
  const foundGrocery = groceries.find((grocery) => grocery.id == parseInt(id));
  if (!foundGrocery) {
    res.status(404).send(`Grocery not found`);
  }
  res.status(200).send(foundGrocery);
};

const createGrocery = (req, res) => {
  const grocery = req.body;
  groceries.push({
    ...grocery,
    id: Math.floor(Math.random() * 500).toString(),
  });

  return res.status(201).send({
    data: groceries,
    error: null,
  });
};

const updateGrocery = (req, res) => {
  const groceryId = req.params.id;
  let foundGroceryIndex = groceries.findIndex(
    (grocery) => grocery.id === groceryId
  );
  if (foundGroceryIndex === -1) {
    res.status(404).send(`Grocery not found`);
  }
  groceries[foundGroceryIndex] = {
    ...req.body,
    id: groceries[foundGroceryIndex].id,
  };
  res.status(201).send({
    data: groceries[foundGroceryIndex],
    error: null,
  });
};

const deleteGrocery = (req, res) => {
  const groceryId = req.params.id;
  let foundGroceryIndex = groceries.findIndex(
    (grocery) => grocery.id == groceryId
  );
  if (foundGroceryIndex === -1) {
    res.status(404).send(`Grocery not found`);
  }
  groceries.splice(foundGroceryIndex, 1);
  res.send({
    data: `Grocery with ${groceryId} removed from Database`,
    error: null,
  });
};

module.exports = {
  GetGroceries,
  getOneGrocery,
  createGrocery,
  updateGrocery,
  deleteGrocery,
};
