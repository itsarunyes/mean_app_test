var envSettings = {
    default:{
        base_url:'mongodb://localhost:27017/'
    }
}
exports.getEnvSettings = function getEnvSettings(env) {
    return envSettings[env] || envSettings.default;
};