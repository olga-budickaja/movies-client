import neo4j from 'neo4j-driver';

const neo4jConfig = {
    uri: process.env.VUE_APP_NEO4J_SERVER,
    username: process.env.VUE_APP_USERNAME,
    password: process.env.VUE_APP_PASSWORD,
};

const url = neo4jConfig.uri || '';
const username = neo4jConfig.username || '';
const password = neo4jConfig.password || '';

const driver = neo4j.driver(
    url,
    neo4j.auth.basic(username, password)
);

export { neo4jConfig, driver };