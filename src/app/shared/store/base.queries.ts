import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { AppState } from '../app.state';
import { BaseState } from './base.state';
import { Observable } from 'rxjs/Observable';
import { compose } from '@ngrx/store';
import { dictionaryValues } from '../helpers/object.helpers';

/**
 * Base store queries for common CRUD entities.
 *
 * @param E the type of entity
 * @param ES the type of state
 */
export abstract class BaseQueries<E, ES extends BaseState<E>> {

    /**
     * returns the name at which the ES state is registered in the global state
     */
    abstract stateName(): string;

    /**
     * Returns an Observable of the entities matching a specific predicate
     * @param predicate the function used to filter the entities
     * @return filtered Observable<E[]>
     */
    list(predicate: (entity: E) => boolean, withEmpty: boolean = false): (state$: Observable<AppState>) => Observable<E[]> {
        return compose((state$: Observable<ES>): Observable<E[]> =>
            state$
                .distinctUntilChanged()
                .map(s => dictionaryValues(s.entities).filter((e: E) => predicate(e)))
                .filter(list => withEmpty ? true : list.length > 0)
            , this.getState());
    }

    /**
     * Returns an Observable of an entity selected by its id
     * @param entityId the id of the entity to observe
     * @return Observable<E> corresponding to the entityId
     */
    getById(entityId: string): (state$: Observable<AppState>) => Observable<E> {
        return compose((state$: Observable<ES>) =>
            state$
                .distinctUntilChanged()
                .map(s => s.entities[entityId])
                .filter(entity => !!entity)
            , this.getState());
    }

    /**
     * When applied to the store, returns an observable of boolean indicating if the list
     * of entities matching the predicate is empty or not.
     */
    isEmpty(predicate: (entity: E) => boolean): (state$: Observable<AppState>) => Observable<boolean> {
        return compose((state$: Observable<ES>): Observable<boolean> =>
            state$
                .map(s => dictionaryValues(s.entities).filter(e => predicate(e)).length === 0)
                .distinctUntilChanged()
            , this.getState());
    }

    /**
     * Returns an Observable of the "E" part of the global state, given the global state as only param
     * @return {function(Observable<AppState>): Observable<E>}
     */
    protected getState(): (state$: Observable<AppState>) => Observable<ES> {
        return (state$: Observable<AppState>): Observable<ES> => {
            return state$.map(s => s[this.stateName()]);
        };
    }

}
