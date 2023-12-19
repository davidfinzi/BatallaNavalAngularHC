import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { SetupComponent } from './setup/setup.component';
import { RulesComponent } from './rules/rules.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';

@NgModule({
  declarations: [AppComponent, GameComponent, SetupComponent, RulesComponent, FinishedGamesComponent],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
