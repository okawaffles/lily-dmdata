import { ShindoValue } from "./types";
interface QuakeDepth {
    type: '深さ';
    unit: 'km';
    value: string;
}
interface HypocenterHeight {
    type: '高さ';
    unit: 'm';
    value: string;
}
interface LatLonCoordinate {
    text: string;
    value: string;
}
interface Magnitude {
    type: 'マグニチュード';
    value: string;
    unit: 'Mj';
}
interface CodeNameIntensity {
    code: string;
    name: string;
    maxInt: ShindoValue;
}
interface CodeNameIntensityStation {
    code: string;
    name: string;
    int: ShindoValue;
}
export interface EarthquakeComponent {
    originTime: string;
    arrivalTime: string;
    hypocenter: {
        name: string;
        code: string;
        coordinate: {
            latitude: LatLonCoordinate;
            longitude: LatLonCoordinate;
            height: HypocenterHeight;
            geodeticSystem: string;
        };
        depth: QuakeDepth;
    };
    magnitude: Magnitude;
}
export interface IntensityComponent {
    maxInt: ShindoValue;
    prefectures: Array<CodeNameIntensity>;
    regions: Array<CodeNameIntensity>;
    cities: Array<CodeNameIntensity>;
    stations: Array<CodeNameIntensityStation>;
}
export interface CommentsComponent {
    forecast: {
        text: string;
        codes: Array<string>;
    };
    var: {
        text: string;
        codes: Array<string>;
    };
}
export {};
