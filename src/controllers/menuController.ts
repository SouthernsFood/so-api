import asyncHandler from "express-async-handler";
import Menu from "../database/models/menu.model";


/**
 * @desc Create a new menu item
 * @route POST /api/menu
 * @access Private
 */
const createMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, featured, image, allergens } = req.body;

  if (!name || !price) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }

  const menuItem = await Menu.create({
    name,
    description,
    price,
    image,
    featured,
    allergens,
  });

  if (menuItem) {
    res.status(201).json({
      id: menuItem._id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      image: menuItem.image,
      featured: menuItem.featured,
      allergens: menuItem.allergens,
    });
  } else {
    res.status(400);
    throw new Error("Invalid menu item data");
  }
});

/**
 * @desc Get all menu items
 * @route GET /api/menu
 * @access Public?
 */
const getMenuItems = asyncHandler(async (req, res) => {
  let menuItems: any = await Menu.find();

  menuItems = menuItems.map((menuItem: any) => ({
    id: menuItem._id,
    name: menuItem.name,
    description: menuItem.description,
    price: menuItem.price,
    image: menuItem.image,
    featured: menuItem.featured,
    allergens: menuItem.allergens,
  }));

  if (menuItems) {
    res.status(200).json(menuItems);
  } else {
    res.status(400);
    throw new Error("No menu items found");
  }
});

/**
 * @desc Get a single menu item
 * @route GET /api/menu/:id
 * @access Private
 */
const getMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await Menu.findById(req.params.id);

  if (menuItem) {
    res.status(200).json({
      id: menuItem._id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      image: menuItem.image,
      featured: menuItem.featured,
      allergens: menuItem.allergens,
    });
  } else {
    res.status(400);
    throw new Error("Invalid menu item id");
  }
});

/**
 * @desc Update a menu item
 * @route PUT /api/menu/:id
 * @access Private
 */
const updateMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, featured, allergens, image } = req.body;

  if (!name || !price) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }

  const menuItem = await Menu.findByIdAndUpdate(req.params.id, {
    name,
    description,
    price,
    image,
    featured,
    allergens,
  });

  if (menuItem) {
    res.status(200).json({
      id: menuItem._id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      image: menuItem.image,
      featured: menuItem.featured,
      allergens: menuItem.allergens,
    });
  } else {
    res.status(400);
    throw new Error("Invalid menu item id");
  }
});

/**
 * @desc Delete a menu item
 * @route DELETE /api/menu/:id
 * @access Private
 */
const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItem = await Menu.findByIdAndDelete(req.params.id);

  if (menuItem) {
    res.status(200).json({
      id: menuItem._id,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      image: menuItem.image,
      featured: menuItem.featured,
      allergens: menuItem.allergens,
    });
  } else {
    res.status(400);
    throw new Error("Invalid menu item id");
  }
});

export {
  createMenuItem,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
