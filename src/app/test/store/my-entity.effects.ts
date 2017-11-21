import { Actions } from '@ngrx/effects';
import { AppState } from '@app/shared/app.state';
import { BaseEffects } from '@app/shared/store/base.effects';
import { Injectable } from '@angular/core';
import { MyEntity } from '../model/my-entity.model';
import { MyEntityActions } from './my-entity.actions';
import { MyEntityService } from '../service/my-entity.service';
import { Store } from '@ngrx/store';

@Injectable()
export class MyEntityEffects extends BaseEffects<MyEntity> {

    constructor(
        protected store: Store<AppState>,
        protected actions$: Actions,
        protected myEntityActions: MyEntityActions,
        protected myEntityService: MyEntityService
    ) {
        super(store, actions$, myEntityActions, myEntityService);
    }

}
