/**
 * This class is the root class for all entities that shall be manipulated through a CRUD Rest API Interface.
 *
 * @export
 * @class CrudEntity
 */
export class CrudEntity {
    /**
     * UUID of the manipulated entity.
     *
     * @type {string}
     * @memberof CrudEntity
     */
    id: string;

    /**
     * Creates an instance of CrudEntity.
     *
     * @memberof CrudEntity
     */
    constructor(entity?: Partial<CrudEntity>) {
        if (entity) {
            this.id = entity.id;
        }
    }

}
