declare module '@/vue-apollo.js' {
    import VueApollo from 'vue-apollo';
    const createProvider: VueApollo['provide'];
    export default createProvider
}