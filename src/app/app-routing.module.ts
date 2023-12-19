import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { SetupComponent } from './setup/setup.component';
import { ToastNoAnimationModule } from 'ngx-toastr';
import { RulesComponent } from './rules/rules.component';
import { FinishedGamesComponent } from './finished-games/finished-games.component';

const routes: Routes = [
  { path: '', redirectTo: 'setup', pathMatch: 'full' },

  {
    path: 'setup',
    component: SetupComponent,
  },
  {
    path: 'rules',
    component: RulesComponent,
  },
  {
    path: 'game',
    component: GameComponent,
  },
  {
     path: 'finished',
     component: FinishedGamesComponent,
  },
  { path: '**', redirectTo: 'setup', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ToastNoAnimationModule.forRoot(), ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
