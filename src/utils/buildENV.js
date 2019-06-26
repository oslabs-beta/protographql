import tabs from './tabs';

const buildENV = URI => {
  let SQLPool = `DB_URI=${URI}`;
  return SQLPool;
}

export default buildENV;


