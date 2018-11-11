import { Observable } from 'tns-core-modules/data/observable';
import { ObservableProperty } from "../observable-property-decorator";

export class HomeViewModel extends Observable {

    private _height: string;
    private _weight: string;
    private _info: string;



    public get height() {
        return this.get('_height');
    }

    public set height(value: any) {
        this.set('_height', value);
    }

    public get weight() {
        return this.get('_weight');
    }

    public set weight(value: any) {
        this.set('_weight', value);
    }

    public get info() {
        return this.get('_info');
    }

    public set info(value: any) {
        this.set('_info', value);
    }


    constructor() {
        super();
    }

    calcularImc() {
        const height = Number(this.height) / 100;
        const weight = Number(this.weight)
        const imc = weight / (height * height)

        if (imc < 17) {
            this.info = "Peso bolha de sabão ipê!";
        } else if (imc >= 17 && imc < 18.49) {
            this.info = "Na capa da costela!";
        } else if (imc > 18.49 && imc <= 24.99) {
            this.info = "Tá normal.. Igual minha vida!";
        } else if (imc > 24.99 && imc <= 29.99) {
            this.info = "Tá gordinho... Ja da pra rolar no morro!";
        } else if (imc > 29.99 && imc <= 34.99) {
            this.info = "Modo xupeta de baleia ativado!";
        } else if (imc > 34.99 && imc <= 39.99) {
            this.info = "Pior que o professor aloprado!";
        } else if (imc > 39.99) {
            this.info = "Acho que vc tem mais um ano de vida!";
        } else {
            this.info = ""
        }

        if (isNaN(this.info)) {
            this.info += `\n ${imc.toPrecision(4)}`
        }

    }
}