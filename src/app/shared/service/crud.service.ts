import 'rxjs/add/operator/map';

import { Headers, Http, RequestOptions, URLSearchParams } from '@angular/http';

import { CrudEntity } from '../model/crud-entity.model';
import { Observable } from 'rxjs/Observable';
import { Type } from '@angular/core/core';
import { isNil } from 'lodash';

/**
 * Base service to perform CRUD operations.
 *
 * @export
 * @abstract
 * @class CrudService
 * @template E
 */
export abstract class CrudService<E extends CrudEntity> {
    /**
     * URL for accessing this entity on the backend.
     *
     * @protected
     * @type {string}
     * @memberof CrudService
     */
    protected CRUD_PATH: string;

    /**
     * Creates an instance of CrudService.
     *
     * @param {Http} http
     * @param {Type<E>} entityConstructor
     * @param {boolean} [sameHost=false]
     * @param {string} apiBaseUrl
     * @param {string} entity
     * @param {string} [entityVersion='v0']
     * @memberof CrudService
     */
    constructor(
        protected http: Http,
        private entityConstructor: Type<E>,
        sameHost = false,
        apiBaseUrl: string,
        entity: string,
        entityVersion = 'v0'
    ) {
        this.CRUD_PATH =
            (sameHost ? location.origin : '') + apiBaseUrl + '/' +
            entityVersion + '/' +
            entity;
    }

    /**
     * Fetch an entity by id.
     *
     * @param entityId the id of the entity to fetchById
     */
    fetchById(entityId: string): Observable<E> {
        console.log('fetchById for', entityId);
        return this.http
            .get(this.getPath(entityId))
            .map(response => new this.entityConstructor(response.json()));
    }

    /**
     * Fetch entities from backend, filtered by criteria.
     *
     * @param criteria : simple dictionary of strings which will be used to create the query string.
     */
    fetchByCriteria(criteria: { [key: string]: string | boolean }): Observable<E[]> {
        const params: URLSearchParams = new URLSearchParams();
        Object.keys(criteria).map((key: string) => {
            if (!isNil(criteria[key])) {
                params.set(key, '' + criteria[key]);
            }
        });
        return this.http.get(this.CRUD_PATH, { search: params })
            .map(response => response.json().map(entity => new this.entityConstructor(entity)));
    }

    /**
     * Creates an entity in the backend.
     *
     * @param entity the entity to create
     */
    create(entity: E): Observable<E> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.post(this.CRUD_PATH, JSON.stringify(entity), options)
            .map(response => new this.entityConstructor(response.json()));
    }

    /**
     * Update an entity by id.
     *
     * @param entityId the id of the entity to update
     * @param entity the data to update
     */
    update(entityId: string, entity: E): Observable<E> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        return this.http.put(this.getPath(entityId), JSON.stringify(entity), options)
            .map(response => new this.entityConstructor(response.json()));
    }

    /**
     * Delete an entity by id.
     *
     * @param entityId the id of the entity to delete
     * @param entity the data to update
     */
    delete(entityId: string) {
        return this.http.delete(this.getPath(entityId));
    }

    /**
     * Return the URL to access this entity.
     *
     * @protected
     * @param {string} entityId
     * @returns
     * @memberof CrudService
     */
    protected getPath(entityId: string) {
        return `${this.CRUD_PATH}/${entityId}`;
    }

}
