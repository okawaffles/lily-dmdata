import { CommentsComponent, DefaultComponent, EarthquakeComponent, IntensityComponent } from "./component";
/**
 * earthquake-information Data Schema
 */
export interface EarthquakeInformationSchema extends DefaultComponent {
    earthquake: EarthquakeComponent;
    intensity: IntensityComponent;
    comments: CommentsComponent;
}
export interface EEWInformationSchema extends DefaultComponent {
    body: {
        isLastInfo: boolean;
        isCanceled: boolean;
        text: string;
    };
}
