import 'rxjs/add/observable/from';

import { Action } from '@ngrx/store';
import { JsonApiErrors } from '../model/json-api-errors.model';
import { Observable } from 'rxjs/Observable';

/**
 * Extension of an Action with a typed payload.
 *
 * @export
 * @interface TypedAction
 * @extends {Action}
 * @template T
 */
export interface TypedAction<T> extends Action {
    payload?: T;
}

/**
 * Basic actions supported for the generic entities.
 *
 * @export
 * @abstract
 * @class BaseActions
 * @template E
 * @template T
 */
export abstract class BaseActions<E, T> {

    static FETCH = `FETCH`;
    static LOAD = `LOAD`;
    static ERROR = `ERROR`;
    static NO_OP = `NO_OP`;

    /**
     * Creates an action that does nothing (useful to end effects chains).
     *
     * @static
     * @returns {TypedAction<any>}
     * @memberof BaseActions
     */
    static noop(): TypedAction<any> {
        return { type: BaseActions.NO_OP };
    }

    /**
     * Builds a function to handle errors, using the provided error handlers for specific cases.
     *
     * This version directly returns the actions (no Observable), it is meant to be used in direct service
     * calls (as opposed to calls from effects).
     *
     * @static
     * @param {any} jsonApiErrorHandlers the specific handlers
     * @returns {(err: any) => TypedAction<any>[]} - Action[] the actions to play has error handling
     * @memberof BaseActions
     */
    static errorHandlerBuilderInstant(...jsonApiErrorHandlers): (err: any) => TypedAction<any>[] {
        return (err) => {
            const actions: TypedAction<any>[] = [];
            try {
                (<JsonApiErrors>err.json()).errors.forEach(error => {
                    jsonApiErrorHandlers.forEach(handler => {
                        // try the handler, if it doesn't return an action, it wasn't
                        // designed to handle this specific error
                        const action = handler(error);
                        if (action) {
                            // if it was designed for this error, add the resulting actions
                            actions.push(action);
                        }
                    });
                    if (actions.length === 1) {
                        // if no dedicated handler was able to handle the error, default to a snack message based on the http status
                        actions.push({
                            type: BaseActions.ERROR,
                            payload: { code: err.status }
                        });
                    }
                });
            } catch (e) {
                // if the error wasn't in the jsonApi format, default to a snack message based on the http status
                actions.push({
                    type: BaseActions.ERROR,
                    payload: { code: err.status }
                });
            }
            // and return the actions
            return actions;
        };
    }

    /**
     * Builds a function to handle errors, using the provided error handlers for specific cases.
     *
     * This version is the default one to use in catch() blocks in effects.
     *
     * @param jsonApiErrorHandlers the specific handlers
     * @returns Observable<Action> the actions to play has error handling
     */
    static errorHandlerBuilder(...jsonApiErrorHandlers): (err: any) => Observable<Action> {
        return (err) => Observable.from(BaseActions.errorHandlerBuilderInstant(...jsonApiErrorHandlers)(err));
    }

    /**
     * Fetch an entity by its id.
     *
     * @param {string} entityId - the id of the entity to fetch on the backend
     * @returns {TypedAction<string>}
     * @memberof BaseActions
     */
    fetch(entityId: string): TypedAction<string> {
        return {
            type: this.actionTypeTemplate(BaseActions.FETCH),
            payload: entityId
        };
    }

    /**
     * Load a collection of entities into the store.
     *
     * @param {E[]} entities - collection of E ()
     * @returns {TypedAction<E[]>}
     * @memberof BaseActions
     */
    load(entities: E[]): TypedAction<E[]> {
        return {
            type: this.actionTypeTemplate(BaseActions.LOAD),
            payload: entities
        };
    }

    /**
     * Return a type for an action based on its category.
     *
     * @param {string} actionType
     * @returns {string}
     * @memberof BaseActions
     */
    actionTypeTemplate(actionType: string): string {
        return `[${this.category()}] ${actionType}`;
    }

    /**
     * Returns the category of concrete Action (eg: 'USER').
     *
     * @abstract
     * @returns {string}
     * @memberof BaseActions
     */
    abstract category(): string;

}
