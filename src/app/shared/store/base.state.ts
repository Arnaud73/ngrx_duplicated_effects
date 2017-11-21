import { BaseActions, TypedAction } from './base.actions';
import { cloneDeep, omit } from 'lodash';

import { Action } from '@ngrx/store';
import { CrudEntity } from '../model/crud-entity.model';
import { toDictionary } from '../helpers/object.helpers';

/**
 * Base state structure for entities E that comply with the "base" pattern
 */
export interface BaseState<E> {
    /**
     * Dictionary of entities, indexed by their ids
     */
    entities: { [id: string]: E };
}

export const BASE_INITIAL_STATE: BaseState<any> = {
    entities: {},
};

/**
 * WARNING : only actions listed here will automatically create a new state and are handled
 * in a default way by the baseReducer
 * This is important in order not to trigger every observable in the apo for actions that are not related
 * to the stores. For example the list or read should not create a new state, only the subsequent LOAD will.
 */
const BASE_REDUCER_ACTIONS = [
    BaseActions.LOAD
];

export function baseReducer(category: string, action: TypedAction<any>, state: BaseState<any>) {
    // check the action is for this reducer
    if (!action.type || !action.type.startsWith('[' + category + ']')) {
        return state;
    } else {
        const actionType = action.type ? action.type.replace(/\[[^]*] (.*)/, '$1') : '';

        if (!BASE_REDUCER_ACTIONS.includes(actionType)) {
            // do not create a new state if the action is not handled here, otherwise all observables
            // will trigger a new value
            return state;
        } else {
            const newState = cloneDeep(state);

            switch (actionType) {
                case BaseActions.LOAD:
                    return Object.assign({}, newState, {
                        entities: Object.assign(
                            {},
                            newState.entities,
                            toDictionary<CrudEntity>(action.payload))
                    });

                default: {
                    return newState;
                }
            }
        }
    }
}
