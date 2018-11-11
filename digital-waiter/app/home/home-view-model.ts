import { ObservableProperty } from "../observable-property-decorator";
import { Observable } from 'tns-core-modules/data/observable';
import { AnimationCurve } from "ui/enums";
import { Frame, topmost } from "tns-core-modules/ui/frame";


export class HomeViewModel extends Observable {
    @ObservableProperty() isBusy: boolean = true;

    constructor() {
        super();
    }

    signIn(args: any) {
        let button = args.object;
        button.isEnabled = false;
        button.animate({
            duration: 2000,
            opacity: 0,
            curve: AnimationCurve.easeInOut
        }).then(() => { 
            button.opacity = 1;
            button.width = 40;
            button.height = 40;
            button.marginBottom = 8;
            button.borderRadius = "0.2";
            button.text = "";
            button.animate({
                rotate: 360,
                scale: {x: 0.5, y: 0.5},
                duration: 1000,
                curve: AnimationCurve.easeInOut
            }).then(() => { 
                button.animate({
                    rotate: -360,
                    scale: { x: 1.0, y: 1.0 },
                    duration: 1500,
                    curve: AnimationCurve.easeInOut
                }).then(() => { 
                    button.width = "auto";
                    button.height = "auto";
                    button.text = "Cadastrar";
                    button.borderRadius = 20;
                    button.isEnabled = true;
                    topmost().navigate("./teste/teste")
                })    
            })
        })
    }
}