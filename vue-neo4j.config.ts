import Vue from 'vue'
interface Neo4jPlugin extends Vue {
    $neo4j: {
        connect: Function;
        getDriver: Function;
        getSession: Function;
    };
}
export function connect(this: Neo4jPlugin) {
    const protocol: string = process.env.VUE_APP_PROTOCOL;
    const host: string = process.env.VUE_APP_HOST;
    const port: number = process.env.VUE_APP_PORT;
    const username: string = process.env.VUE_APP_USERNAME;
    const password: string = process.env.VUE_APP_PASSWORD;

    return this.$neo4j.connect(protocol, host, port, username, password)
}

export function driver(this: Neo4jPlugin) {
    return this.$neo4j.getDriver()
}

