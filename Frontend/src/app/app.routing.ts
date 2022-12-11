import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UserPerfilComponent } from './components/user-perfil/user-perfil.component';
import { MensajesComponent } from './components/mensajes/mensajes.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'inicio', component: InicioComponent, canActivate: [AuthGuard]},
    {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
    {path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard]},
    {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
    {path: 'perfil/:name', component: UserPerfilComponent, canActivate: [AuthGuard]},
    {path: 'mensajes', component: MensajesComponent, canActivate: [AuthGuard]},
    {path: '*', redirectTo: '/login', pathMatch: 'full'}
]

export const appRoutingProviders: any[] = []
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes)