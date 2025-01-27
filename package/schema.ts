import { CommentsComponent, EarthquakeComponent, IntensityComponent } from "./component";

/**
 * earthquake-information Data Schema
 */
export interface EarthquakeInformationSchema {
    earthquake: EarthquakeComponent,
    intensity: IntensityComponent,
    comments: CommentsComponent
}