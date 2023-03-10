import asyncHandler from "express-async-handler";
import Event from "../database/models/event.model";

/**
 * @desc Create a new event
 * @route POST /api/events
 * @access Private
 */
const createEvent = asyncHandler(async (req, res) => {
  const {
    venue,
    address,
    instagramHandle,
    description,
    dayOfWeek,
    timeStart,
    timeEnd,
  } = req.body;

  if (!venue || !address || !dayOfWeek || !timeStart || !timeEnd) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }

  const event = await Event.create({
    venue,
    address,
    instagramHandle,
    description,
    dayOfWeek,
    timeStart,
    timeEnd,
  });

  if (event) {
    res.status(201).json({
      id: event._id,
      venue: event.venue,
      address: event.address,
      instagramHandle: event.instagramHandle,
      description: event.description,
      day: event.dayOfWeek,
      start: event.timeStart,
      end: event.timeEnd,
    });
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

/**
 * @desc Get all events
 * @route GET /api/events
 * @access Private
 */
const getEvents = asyncHandler(async (req, res) => {
  let events: any = await Event.find();

  events = events.map((event: any) => ({
    id: event._id,
    venue: event.venue,
    address: event.address,
    instagramHandle: event.instagramHandle,
    description: event.description,
    day: event.dayOfWeek,
    start: event.timeStart,
    end: event.timeEnd,
    image: event.image,
  }));

  if (events) {
    res.status(200).json(events);
  } else {
    res.status(400);
    throw new Error("No events found");
  }
});

/**
 * @desc Update an event
 * @route PUT /api/events/:id
 * @access Private
 */
const updateEvent = asyncHandler(async (req, res) => {
  const {
    venue,
    address,
    instagramHandle,
    description,
    day: dayOfWeek,
    start: timeStart,
    end: timeEnd,
    image,
  } = req.body;

  if (!venue || !address || !dayOfWeek || !timeStart || !timeEnd) {
    res.status(400);
    throw new Error("Please enter required fields");
  }

  const event = await Event.findByIdAndUpdate(req.params.id, {
    venue,
    address,
    instagramHandle,
    description,
    dayOfWeek,
    timeStart,
    timeEnd,
    image,
  });

  if (event) {
    res.status(200).json({
      id: event._id,
      venue: event.venue,
      address: event.address,
      description: event.description,
      instagramHandle: event.instagramHandle,
      day: event.dayOfWeek,
      start: event.timeStart,
      end: event.timeEnd,
      image: event.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

/**
 * @desc Delete an event
 * @route DELETE /api/events/:id
 * @access Private
 */
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (event) {
    res.status(200).json({
      id: event._id,
      venue: event.venue,
      address: event.address,
      description: event.description,
      instagramHandle: event.instagramHandle,
      day: event.dayOfWeek,
      start: event.timeStart,
      end: event.timeEnd,
    });
  } else {
    res.status(400);
    throw new Error("Invalid event data");
  }
});

export { createEvent, getEvents, updateEvent, deleteEvent };
