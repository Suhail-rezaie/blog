const router = require("express").Router();
const Category = require("../models/Category");

//create category
router.post("/", async (req, res) => {
  const newcat = new Category(req.body);

  try {
    const savecat = await newcat.save();
    res.status(200).json(savecat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get category

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
