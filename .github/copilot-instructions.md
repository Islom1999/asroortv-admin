# AsroorTV Admin - AI Coding Guide

## Architecture Overview

**AsroorTV Admin** is an **Angular 19** admin panel using **NgZorro Ant Design**, built with NgModules (not standalone components), and backed by a **NestJS** REST API (`asroortv_anime_api`). This is a content management system for managing movies, books, users, and subscriptions for the BananaTV streaming platform.

### Core Architectural Patterns

**Base Component Pattern**: All CRUD modules follow an inheritance pattern:

- `BaseApiService<T>` (in `src/app/base/services/`) provides generic HTTP methods (CRUD + pagination)
- `BaseComponentList<T>` (in `src/app/base/components/`) handles list views with pagination, search, and table rendering
- Feature modules extend these bases: `class VideosService extends BaseApiService<IVideo>`
- Example: `VideosListComponent extends BaseComponentList<IVideo>`

**Module-Based Architecture**: Features are organized as NgModules (despite Angular 19 support for standalone):

- Each feature has its own module: `VideosModule`, `BooksModule`, `CategoryModule`, etc.
- Lazy-loaded via `loadChildren` in `app-routing.module.ts` → `layout-roting.module.ts`
- Components use `standalone: false` explicitly (see `angular.json` schematic defaults)

**Authentication Flow**:

1. JWT-based auth with `access_token` + `refresh_token` stored in localStorage
2. `AuthInterceptor` attaches tokens to all requests (except `/auth/signin/local`)
3. Refresh token auto-used for `/auth/refresh` endpoint
4. `AuthGuard` protects all routes under `LayoutModule`
5. 401 errors trigger redirect to `/login` via `ErrorInterceptor`

**Permissions System**:

- Uses `ngx-permissions` library
- Permissions loaded on app init in `AppComponent.ngOnInit()` from `PermissionService.getPermisssion()`
- Backend returns `Permission[]` enum values
- Applied via `*ngxPermissionsOnly` directive in templates

## Technology Stack

- **Angular 19.2.12** with NgModules (not standalone architecture)
- **NG-ZORRO 19.2.2** (Ant Design for Angular) - primary UI library
- **CKEditor 5** for rich text editing (books/movie descriptions)
- **ngx-doc-viewer** for document previews
- **jwt-decode** for token validation
- **RxJS 7.8** for reactive state management
- **Backend**: NestJS API at `https://api.bananatv.uz/api`

## Development Workflows

### Running the App

```bash
npm start  # Serves on http://localhost:4200
```

### Environment Configuration

- `src/environments/environment.ts` defines `apiUrl: 'https://api.bananatv.uz/api'`
- Change to `environment.development.ts` for local development
- API endpoints follow pattern: `${environment.apiUrl}/{resource}`

### Module Structure

Each feature module follows this pattern:

```
modules/{feature}/
  ├── components/
  │   ├── {feature}-list/        # Extends BaseComponentList
  │   └── {feature}-detail/      # Form for create/update
  ├── service/
  │   └── {feature}.service.ts   # Extends BaseApiService
  └── {feature}.module.ts        # NgModule with routing
```

### Creating New CRUD Modules

1. **Service** (extend `BaseApiService`):

```typescript
@Injectable({ providedIn: "root" })
export class BookService extends BaseApiService<IBook> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.apiUrl}/book`);
  }
}
```

2. **List Component** (extend `BaseComponentList`):

```typescript
export class BookListComponent extends BaseComponentList<IBook> {
  override breadcrumb: Breadcrumb = {
    header: "Kitoblar",
    label: "Kitoblar ro'yhati",
    url: "/book",
  };

  columns = [
    { title: "Name", key: "name" },
    { title: "Author", key: "author" },
  ];

  constructor(private _baseSrv: BookService) {
    super(_baseSrv);
  }
}
```

3. **Register module** in `layout-roting.module.ts`:

```typescript
{
  path: 'book',
  loadChildren: () => import('../modules').then((m) => m.BookModule),
}
```

## Critical Conventions

### Component Declaration

- **Always use `standalone: false`** - this project uses NgModules
- Declare components in module `@NgModule.declarations` array
- Import required NG-ZORRO modules in each feature module

### API Pagination

- Backend returns `IPagination<T[]>` with `{ data: T[], count: number }`
- Use `getAllPanination(params)` not `getAll()` for list views
- HttpParams pattern: `page`, `limit`, plus any filter fields
- Example: `?page=1&limit=10&file_name=video.mp4`

### File Uploads

- Upload endpoint: `${environment.apiUrl}/image/upload`
- Returns `IUploadRes` with image URLs
- Use NG-ZORRO `nz-upload` component with `customRequest` handler
- See `books-detail.component.ts` for upload implementation pattern

### Forms and Validation

- Use **Reactive Forms** (`FormGroup`, `FormControl`, `Validators`)
- CKEditor integration: `<ckeditor [editor]="Editor" formControlName="description">`
- Multi-select for relations: `nz-select` with `nzMode="multiple"`

### Breadcrumbs

- Managed by `BreadcrumbsService` (injectable)
- Set in component `ngOnInit()`: `this.breadcrumbService.setBreadcrumbs([...])`
- Rendered in `LayoutComponent` → `BreadcurmbComponent`

### Routing Conventions

- List view: `/feature` (e.g., `/book`)
- Create: `/feature/create`
- Edit: `/feature/update/:id`
- Detail: `/feature/info/:id`
- Access via `this.router.navigate(['update', id], { relativeTo: this.route })`

## Integration Points

### Backend API Communication

- **Base URL**: `https://api.bananatv.uz/api`
- **Auth endpoints**:
  - POST `/auth/signin/local` → returns `{ access_token, refresh_token }`
  - POST `/auth/refresh` → refresh access token (requires refresh_token in header)
- **CRUD pattern**: `GET /{resource}`, `GET /{resource}/pagination`, `POST /{resource}`, `PUT /{resource}/:id`, `DELETE /{resource}/:id`
- **Swagger docs** (Basic Auth protected):
  - Admin: `/swagger-admin` (user: admin, pass: admin123)
  - Client: `/swagger-client`

### Shared Services

- **`BreadcrumbsService`**: Manages breadcrumb navigation state
- **`PermissionService`**: Fetches user permissions from `/user-admin/permission`
- **`ImageService`**: Handles image upload/management (if needed)

### Error Handling

- `ErrorInterceptor` catches 401 errors globally → redirects to `/login`
- Use `NzMessageService` for user-facing error/success messages
- Pattern: `.subscribe({ error: (err) => this.nzMessageService.error(err.message) })`

### State Management

- **RxJS BehaviorSubject pattern** in `BaseApiService`:
  - `_dataSubject` holds current list data
  - `_data` observable exposes data to components
  - Auto-updates on `loadAll()` via `.pipe(tap())`
- Components subscribe to observables and use signals for local state

## Key Files Reference

- **Base Classes**: `src/app/base/services/base-api.service.ts`, `src/app/base/components/base-list.ts`
- **Auth**: `src/app/auth/auth.service.ts`, `src/app/shared/guards/auth-guard.ts`
- **Interceptors**: `src/app/shared/interceptors/token.interceptor.ts`, `error.interceptor.ts`
- **Layout**: `src/app/layout/layout.component.ts`, `layout-roting.module.ts`
- **Interfaces**: `src/interfaces/` (exports all domain models)
- **Enums**: `src/enumerations/` (BookType, StatusType, Permission, etc.)

## Common Tasks

### Adding a New Route

1. Create module in `src/app/modules/{feature}/`
2. Export from `src/app/modules/index.ts`
3. Add lazy route in `src/app/layout/layout-roting.module.ts`
4. Create interface in `src/interfaces/{feature}.ts` and export from `index.ts`

### Debugging Auth Issues

- Check localStorage for `access_token` and `refresh_token`
- Verify token not expired: `jwtDecode(token)` → check `exp` field
- Inspect Network tab for Authorization header in requests
- 401 response should auto-redirect to `/login` via `ErrorInterceptor`

### Working with Relations

- Backend returns IDs for relations (e.g., `category_id: string[]`)
- Load related data via separate service calls in component `ngOnInit()`
- Use `forkJoin` or combineLatest for multiple parallel requests
- Display relations using `nz-select` with `[nzOptions]` binding
