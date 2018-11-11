import { ObservableProperty } from "../observable-property-decorator";
import { Observable } from 'tns-core-modules/data/observable';
import { AnimationCurve } from "ui/enums";

export class TesteViewModel extends Observable {
    @ObservableProperty() isBusy: boolean = true;

    constructor() {
        super();
    }
}