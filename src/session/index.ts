import { Vue } from "vue-property-decorator";

interface neo4Plugin extends Vue {
    $neo4j: {
        connect: Function;
        getDriver: Function;
        getSession: Function;
    };
    testQuery(): Promise<void>;
    getMovies(): Promise<void>;
}

export const session = function(this: Vue & neo4Plugin) {
    this.$neo4j.getSession();
}