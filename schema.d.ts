import { CommentsComponent, DefaultComponent, EarthquakeComponent, HypocenterHeight, IntensityComponent, LatLonCoordinate, Magnitude, QuakeDepth } from "./component";
import { EEW_TYPE, LAND_OR_SEA, ShindoValue } from "./types";
/**
 * earthquake-information Data Schema (decoded_body.body)
 */
export interface EarthquakeInformationSchemaBody extends DefaultComponent {
    earthquake: EarthquakeComponent;
    intensity: IntensityComponent;
    comments: CommentsComponent;
}
interface Zone {
    code: string;
    name: string;
    kind: {
        code: string;
        name: EEW_TYPE;
        last_kind: {
            code: string;
            name: EEW_TYPE;
        };
    };
}
interface ZoneIntensityUpdate {
    code: string;
    name: string;
    forecastMaxInt: {
        from: ShindoValue;
        to: ShindoValue;
    };
    forecastMaxLgInt: {
        from: ShindoValue;
        to: ShindoValue;
    };
    isPlum: boolean;
    isWarning: boolean;
    kind: {
        name: EEW_TYPE;
        code: string;
    };
    condition: string;
}
/**
 * eew-information Data Schema (decoded_body.body)
 */
export interface EEWInformationSchemaBody extends DefaultComponent {
    isLastInfo: boolean;
    isCanceled: boolean;
    isWarning: boolean;
    zones: Array<Zone>;
    prefectures: Array<Zone>;
    regions: Array<Zone>;
    earthquake: {
        originTime: string;
        arrivalTime: string;
        hypocenter: {
            code: string;
            name: string;
            coordinate: {
                latitude: LatLonCoordinate;
                longitude: LatLonCoordinate;
                height: HypocenterHeight;
                geodeticSystem: '日本測地系';
            };
            depth: QuakeDepth;
            reduce: {
                code: string;
                name: string;
            };
            landOrSea: LAND_OR_SEA;
            accuracy: {
                epicenters: Array<string>;
                depth: string;
                magnitudeCalculation: string;
                numberOfMagnitudeCalculation: string;
            };
        };
        magnitude: Magnitude;
    };
    intensity: {
        forecastMaxInt: {
            from: ShindoValue;
            to: ShindoValue;
        };
        forecastMaxLgInt: {
            from: ShindoValue;
            to: ShindoValue;
        };
        appendix: {
            maxIntChange: string;
            maxLgIntChange: string;
            maxIntChangeReason: string;
        };
        regions: Array<ZoneIntensityUpdate>;
    };
    comments: CommentsComponent;
}
export {};
