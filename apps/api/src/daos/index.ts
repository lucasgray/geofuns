import FlightpathDao from './flightpath.dao';
import PoiDao from './poi.dao';
import CannedFlightpathDao from './canned.flightpath.dao';
import CannedPoiDao from './canned.poi.dao';

// its kinda silly to have two DAOs to support canned/uncanned data,
// but this was easy in the interest of time

// also these singletons are a poor man's dependency injection, again easy
// enough for this demo

export const flightpathDao = new FlightpathDao();
export const cannedFlightpathDao = new CannedFlightpathDao();
export const poiDao = new PoiDao();
export const cannedPoiDao = new CannedPoiDao();
