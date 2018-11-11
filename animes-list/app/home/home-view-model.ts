import { Observable } from 'tns-core-modules/data/observable';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { ImageSource, fromFile, fromResource, fromBase64, fromNativeSource } from "tns-core-modules/image-source";

const Cache = require("tns-core-modules/ui/image-cache").Cache;
const cache = new Cache();

cache.placeholder = fromFile("~/images/album-image.jpg");
cache.maxRequests = 10;

import * as http from 'http';

export class HomeViewModel extends Observable {

    public animes = new ObservableArray<ItemAnime>()
    public countPage: number = 0;

    constructor() {
        super();
        this.getAnimes(this.countPage)
    }

    getAnimes(page: number) {
        http.request({
            url: `https://kitsu.io/api/edge//anime?page[limit]=10&page[offset]=${this.countPage}`,
            method: "GET"
        }).then((response) => {
            const allAnimes = response.content.toJSON().data
            const onlyAttributes = allAnimes.map(element => element.attributes)
            for (let i = 0; i < onlyAttributes.length; i++) {
                this.animes.push(new ItemAnime(onlyAttributes[i]))
            }
        }, (e) => {
            console.log(e)
        });
    }

    onLoadMoreItemsRequested(args: any) {
        const listView: any = args.object
        if (this.animes.length > 0) {
            setTimeout(() => {
                this.countPage += 10
                this.getAnimes(this.countPage)
                listView.notifyLoadOnDemandFinished()
            }, 1000);
            args.returnValue = true
        } else {
            args.returnValue = false
            listView.notifyLoadOnDemandFinished(true)
        }
    }
}

export class ItemAnime extends Observable {
    private canonicalTitle
    private synopsis
    private image_url
    private episodeCount
    private ranking
    private ageRatingGuide

    constructor(element) {
        super()
        this.canonicalTitle = element.canonicalTitle
        this.synopsis = element.synopsis
        this.image_url = cache.placeholder
        this.episodeCount = element.episodeCount
        this.ranking = element.averageRating
        this.ageRatingGuide = element.ageRatingGuide

        cache.enableDownload()

        let cachedImageSource
        const myImage = cache.get(element.coverImage.original)

        if (myImage) {
            // If present -- use it.
            cachedImageSource = fromNativeSource(myImage)
            this.image_url = cachedImageSource
        } else {
            // If not present -- request its download + put it in the cache.
            cache.push({
                key: element.coverImage.original,
                url: element.coverImage.original,
                completed: (image, key) => {
                    if (element.coverImage.original === key) {
                        cachedImageSource = fromNativeSource(image)
                        this.image_url = cachedImageSource  // set the downloaded image
                    }
                }
            })
        }
    }
}