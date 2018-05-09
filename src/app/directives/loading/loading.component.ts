import { Component, OnInit, Input } from '@angular/core';

import { LoadingService } from './shared/loading.service';

@Component({
    moduleId: module.id.toString(),
    selector: 'loading',
    templateUrl: 'loading.component.html'
})

export class LoadingComponent {
    loading: boolean;

    constructor(private loadingService: LoadingService) {
        this.loading = true;
    }

    ngOnInit() {
        this.loadingService.loader(this.loading);
    }
}