import { Component, OnInit } from '@angular/core';

import { AppState } from '@app/shared/app.state';
import { MyEntityActions } from '@app/test/store/my-entity.actions';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';

    constructor(
        private store: Store<AppState>,
        private myEntityActions: MyEntityActions
    ) { }

    ngOnInit() {
        this.store.dispatch(this.myEntityActions.fetch('1234567890'));
    }
}
