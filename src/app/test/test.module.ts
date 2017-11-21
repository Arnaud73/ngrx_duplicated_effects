import { ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MyEntityActions } from './store/my-entity.actions';
import { MyEntityQueries } from './store/my-entities.queries';
import { MyEntityService } from './service/my-entity.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class TestModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TestModule,
            providers: [
                MyEntityActions,
                MyEntityQueries,
                MyEntityService
            ]
        };
    }
}
