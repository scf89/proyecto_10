const Event = require('../models/Event');

const createEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    if (req.file) {
      event.image = req.file.path;
    }

    const savedEvent = await event.save();
    return res.status(201).json(savedEvent);
  } catch (error) {
    return res.status(500).json("Error creating event");
  }
};


const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees');
    return res.json(events);
  } catch (error) {
    return res.status(500).json("Error fetching events");
  }
};




module.exports = {
  createEvent,
  getEvents,
};
