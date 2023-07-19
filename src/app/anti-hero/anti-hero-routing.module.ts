import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { formGuard } from '../core/guards/form.guard';

const routes: Routes = [
  {
    path: "",
    component: ListComponent
  },
  {
    path: "form",
    children: [
      {
        path: "",
        canDeactivate: [formGuard],
        component: FormComponent
      },
      {
        path: ":id",
        canDeactivate: [formGuard],
        component: FormComponent
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AntiHeroRoutingModule {}
