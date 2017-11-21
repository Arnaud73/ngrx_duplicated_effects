import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { HttpModule } from '@angular/http';
import { MyEntity } from './test/model/my-entity.model';
import { MyEntityEffects } from './test/store/my-entity.effects';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { TestModule } from './test/test.module';
import { environment } from '@env/environment';
import { myEntityReducer } from './test/store/my-entity.reducer';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,        
        SharedModule,
        TestModule.forRoot(),
        StoreModule.forRoot({
            myEntity: myEntityReducer
        }),
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
        EffectsModule.forRoot([
            MyEntityEffects
        ]),
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
