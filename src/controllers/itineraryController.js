const Itinerary = require('../models/Itinerary');
const Category = require('../models/Category');

const createItinerary = async (req, res) => {
  try {
    const { title, description, categoryName, location, duration, price } = req.body;

    let category = await Category.findOne({ name: categoryName });
    if (!category) {
      category = new Category({ name: categoryName, description: `Category for ${categoryName}` });
      await category.save();
    }

    const itinerary = new Itinerary({
      title,
      description,
      category: category._id,
      creator: req.user._id,
      location,
      duration,
      price,
      highlights
    });

    await itinerary.save();
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getItineraries = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};

    const itineraries = await Itinerary.find(query)
      .populate('category', 'name')
      .populate('creator', 'name')
      .sort({ createdAt: -1 });

    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate('category', 'name')
      .populate('creator', 'name');

    if (!itinerary) {
      return res.status(404).json({ message: 'Itinerary not found' });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { createItinerary, getItineraries, getItineraryById };