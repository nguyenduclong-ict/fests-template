import { Provider } from "@/utils/fesjs/mongo";
import Warehouse from "./model";

class WarehouseProvider extends Provider {}

export default new WarehouseProvider(Warehouse);
