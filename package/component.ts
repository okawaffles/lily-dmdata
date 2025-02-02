import { ShindoValue } from "./types"

export interface QuakeDepth {
    type: '深さ',
    unit: 'km',
    value: string
}

export interface HypocenterHeight {
    type: '高さ',
    unit: 'm',
    value: string
}

export interface LatLonCoordinate {
    text: string, value: string
}

export interface Magnitude {
    type: 'マグニチュード',
    value: string,
    unit: 'Mj'
}

interface CodeNameIntensity {
    code: string,
    name: string,
    maxInt: ShindoValue
}

interface CodeNameIntensityStation {
    code: string,
    name: string,
    int: ShindoValue
}


export interface EarthquakeComponent {
    originTime: string,
    arrivalTime: string,
    hypocenter: {
        name: string,
        code: string,
        coordinate: {
            latitude: LatLonCoordinate,
            longitude: LatLonCoordinate,
            height: HypocenterHeight,
            geodeticSystem: string,
        },
        depth: QuakeDepth,
    },
    magnitude: Magnitude
}

export interface IntensityComponent {
    maxInt: ShindoValue,
    prefectures: Array<CodeNameIntensity>,
    regions: Array<CodeNameIntensity>,
    cities: Array<CodeNameIntensity>,
    stations: Array<CodeNameIntensityStation>
}

export interface CommentsComponent {
    forecast?: {
        text: string,
        codes: Array<string>
    },
    warning?: {
        text: string,
        codes: Array<string>
    },
    var?: {
        text: string,
        codes: Array<string>
    },
}

// TODO: check docs to see if some of these
// have static/enum-able values
export interface DefaultComponent {
    _originalId: string,
    _schema: {
        type: string,
        version: string
    },
    type: string,
    title: string,
    status: string,
    infoType: string,
    editorialOffice: string,
    publishingOffice: Array<string>,
    pressDateTime: string,
    reportDateTime: string,
    targetDateTime: string,
    eventId: string,
    serialNo: string,
    infoKind: string,
    infoKindVersion: string,
    headline: string | null,
}