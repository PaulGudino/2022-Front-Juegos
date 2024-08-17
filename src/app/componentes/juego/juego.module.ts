import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegoRoutingModule } from './juego-routing.module';
import { JuegoComponent } from './juego.component';
import {SharedModule} from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
//components
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ScanViewComponent } from './pages/scan-view/scan-view.component';
import { PublicityComponent } from './publicity/publicity.component';
import { PlayViewComponent } from './pages/play-view/play-view.component';
import { LogoComponent } from './logo/logo.component';
import { ResultMessageComponent } from './result-message/result-message.component';
import { RolldiceViewComponent } from './pages/rolldice-view/rolldice-view.component';
import { SelectiongameViewComponent } from './pages/selectiongame-view/selectiongame-view.component';
import { PrecisionViewComponent } from './pages/precision-view/precision-view.component';
import { PuertasViewComponent } from './pages/puertas-view/puertas-view.component';
import { BackArrowComponent } from './back-arrow/back-arrow.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    JuegoComponent,
    GenericButtonComponent,
    KeyboardComponent,
    ScanViewComponent,
    PublicityComponent,
    PlayViewComponent,
    LogoComponent,
    ResultMessageComponent,
    RolldiceViewComponent,
    SelectiongameViewComponent,
    PrecisionViewComponent,
    PuertasViewComponent,
    BackArrowComponent,
  ],
  imports: [
    CommonModule,
    JuegoRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule
  ]
})
export class JuegoModule { }
