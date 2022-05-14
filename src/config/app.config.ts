export enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT'
}

export enum ServiceMapping {
    getProjectGroup = 'groups'
}

export enum ConsoleMessage {
    TITLE = 'Git CLI',
    BANNER = 'Generate git log excel between specif date time',
    ERROR = 'ERROR: ',
    SUCCESS = 'SUCCESS: ',
    INFO = 'INFO: ',
    GENERATE = 'GENERATE: ',
    CREATE = 'CREATE: ',
    UPDATE = 'UPDATE: ',
    START_GENERATING = 'Start generating all the recommended files...',
}

export const CONFIG = {
    GIT_URL: "http://199.188.246.131:8888/api/v4/",
    PERSONAL_TOKEN: "6vBUVoveHPm8wBsGwqiY"
}