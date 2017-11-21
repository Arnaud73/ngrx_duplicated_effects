import { BaseQueries } from '@app/shared/store/base.queries';
import { BaseState } from '@app/shared/store/base.state';
import { Injectable } from '@angular/core';
import { MyEntity } from '../model/my-entity.model';

@Injectable()
export class MyEntityQueries extends BaseQueries<MyEntity, BaseState<MyEntity>> {
    stateName(): string {
        return 'myEntity';
    }
}
