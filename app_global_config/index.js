// спроба прибрати вплив бекенда на данні, які також стосуються фронта
import Town from "../backend/town/Town.js";
import Event from '../backend/events/Event.js';
import Battle from '../backend/battle/Battle.js';
import Region from '../backend/region/Region.js';
import WorldMap from '../backend/globalMap/WorldMap.js';
import Resources from '../backend/resources/Resources.js';
import Caravan from '../backend/caravan/Caravan.js';

export default {
    Town,
    Event,
    Battle,
    Region,
    WorldMap,
    Resources,
    Caravan
}