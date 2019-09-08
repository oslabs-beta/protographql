import tabs from './tabs';
import { build } from 'protobufjs';

const buildENV = URI => {
  let envString = `DB_URI=${URI}`;
  return envString;
}

export default buildENV;


