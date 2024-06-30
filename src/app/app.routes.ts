import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: '/upload', pathMatch: 'full' },
    { path: 'upload', loadChildren: () => import('./upload-csv/upload-csv.routes').then((m) => m.UploadCsvRoutes) },
    { path: 'preview', loadChildren: () => import('.//preview-table/preview-table.routes').then((m) => m.PreviewTableRoutes) },
    { path: 'summary', loadChildren: () => import('./validation-summary/validation-summary.routes').then((m) => m.ValidationSummaryRoutes) },
];
