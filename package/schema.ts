import { CommentsComponent, DefaultComponent, EarthquakeComponent, IntensityComponent } from "./component";

/**
 * earthquake-information Data Schema
 */
export interface EarthquakeInformationSchema extends DefaultComponent {
    earthquake: EarthquakeComponent,
    intensity: IntensityComponent,
    comments: CommentsComponent
}

// might not be full since this is from a test report ws push
export interface EEWInformationSchema extends DefaultComponent {
    body: {
        isLastInfo: boolean,
        isCanceled: boolean,
        isWarning: boolean,
        earthquake: {
            originTime: string,
            arrivalTime: string,
            hypocenter: {
                code: string
            }
        }
    }
}