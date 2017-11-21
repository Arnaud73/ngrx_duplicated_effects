import { BaseActions } from '@app/shared/store/base.actions';
import { Injectable } from '@angular/core';
import { MyEntity } from '../model/my-entity.model';

@Injectable()
export class MyEntityActions extends BaseActions<MyEntity, any> {
    static CATEGORY = 'MY-ENTITY';

    static FETCH = `[${MyEntityActions.CATEGORY}] FETCH`;
    static LOAD = `[${MyEntityActions.CATEGORY}] LOAD`;

    category() {
        return MyEntityActions.CATEGORY;
    }
}
