import { CrudEntity } from '@app/shared/model/crud-entity.model';

export class MyEntity extends CrudEntity {
    myAttribute: string;

    constructor(entity: Partial<MyEntity>) {
        super();

        if (entity) {
            this.myAttribute = entity.myAttribute;
        }
    }
}
