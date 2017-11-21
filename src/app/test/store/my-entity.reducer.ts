import { BASE_INITIAL_STATE, BaseState, baseReducer } from '@app/shared/store/base.state';

import { Action } from '@ngrx/store';
import { MyEntity } from '../model/my-entity.model';
import { MyEntityActions } from './my-entity.actions';

export function myEntityReducer(state: BaseState<MyEntity> = BASE_INITIAL_STATE, action: Action): BaseState<MyEntity> {
    const newState = baseReducer(MyEntityActions.CATEGORY, action, state);

    switch (action.type) {
        default:
            return newState;
    }
}
