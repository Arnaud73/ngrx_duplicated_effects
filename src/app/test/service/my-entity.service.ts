import { CrudService } from '@app/shared/service/crud.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { MyEntity } from '../model/my-entity.model';

@Injectable()
export class MyEntityService extends CrudService<MyEntity> {

    constructor(
        http: Http
        ) {
        super(
            http,
            MyEntity,
            true,
            'https://my.domain.com/endpoint',
            'my-entity',
            'v0');
    }

}
