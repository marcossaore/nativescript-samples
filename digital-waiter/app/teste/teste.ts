import { EventData } from 'tns-core-modules/data/observable';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import { TesteViewModel } from './teste-view-model';

// Event handler for Page "pageLoaded" event attached in home-page.xml
export function pageLoaded(args: EventData) {
    /*
    This gets a reference this page’s <StackLayout> UI component. You can
    view the API reference of the Page to see what’s available at
    https://docs.nativescript.org/api-reference/classes/_ui_page_.page.html
    */
    let page = <any> args.object;
    page.bindingContext = new TesteViewModel();
}