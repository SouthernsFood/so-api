import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController";
import { protect } from "../middleware/authMiddleware";
const events = express();


events.post("/", protect, createEvent);
events.get("/", protect, getEvents);
events.put("/:id", protect, updateEvent);
events.delete("/:id", protect, deleteEvent);

export default events;
