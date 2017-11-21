import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Actions, Effect, toPayload } from '@ngrx/effects';
import { BaseActions, TypedAction } from './base.actions';

import { AppState } from '../app.state';
import { CrudEntity } from '../model/crud-entity.model';
import { CrudService } from '../service/crud.service';
import { Store } from '@ngrx/store';

export abstract class BaseEffects<E extends CrudEntity> {

    /**
     * Get entity by id from the backend.
     */
    @Effect() fetch$ = this.getFetch();

    /**
     * Allow for overriding the default fetchById effect
     */
    protected getFetch() {
        return this.actions$
            .ofType(this.baseActions.actionTypeTemplate(BaseActions.FETCH))
            .map((action: TypedAction<string>) => action.payload)
            .do(payload => console.log(payload))
            .mergeMap(entityId => this.crudService
                .fetchById(entityId)
                .map(entity => this.baseActions.load([entity]))
                .catch(BaseActions.errorHandlerBuilder())
            );
    }

    /**
     * Creates an instance of BaseEffects.
     *
     * @param {Store<AppState>} store
     * @param {Actions} actions$
     * @param {BaseActions<E, any>} baseActions
     * @param {CrudService<E>} crudService
     * @memberof BaseEffects
     */
    constructor(
        protected store: Store<AppState>,
        protected actions$: Actions,
        protected baseActions: BaseActions<E, any>,
        protected crudService: CrudService<E>
    ) {
        this.fetch$.subscribe(store);
    }

}
