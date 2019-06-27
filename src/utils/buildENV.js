import tabs from './tabs';

const buildENV = URI => {
  let envString = `DB_URI=${URI}`;
  return envString;
}

export default buildENV;


