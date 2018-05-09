import { Component, OnInit, Input } from '@angular/core';

import { LoadingService } from './shared/loading.service';

@Component({
    selector: 'loading',
    templateUrl: 'loading.component.html'
})

export class LoadingComponent {
    loading: boolean;

    constructor(private loadingService: LoadingService) {
        this.loadingService.loaderObservable().subscribe(loading => { this.loading = loading; });
    }
}