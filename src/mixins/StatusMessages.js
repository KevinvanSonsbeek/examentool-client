export default({
    data () {
        return {
            statusMessages: []
        }
    },
    // computed: {
    //     errorMessages: function() {return []}
    // },
    methods: {
        _addStatusMessage(type, message, code = undefined) {
            this.statusMessages.push({type: type, code: code, message: message});
        },
    }
});
