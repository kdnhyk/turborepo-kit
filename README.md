# Turborepo-kit

Tuborepo-kit은 Turborepo를 기반으로 한 Production용 모노레포 보일러플레이트입니다.

Web(Next.js), App(React Native Expo), Program(Tauri) 3가지 환경에서 공용으로 사용할 수 있는 Supabase, Tailwindcss, TanStack Query, React-hook-form 기반의 패키지가 준비되어 있습니다.

## File Tree

```
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ app
  |   ├─ Expo SDK 51
  |   ├─ React Native using React 18
  |   ├─ Navigation using Expo Router
  |   └─ Tailwind CSS using NativeWind
  ├─ program
  |   ├─ Tauri 1.6
  |   ├─ Next.js 14 using React 18
  |   ├─ Auth using tauri-plugin-oauth
  |   └─ Tailwind CSS
  └─ web
      ├─ Next.js 14
      ├─ React 18
      ├─ Tailwind CSS
      └─ @supabase/ssr
packages
  ├─ api
  |   └─ Api using Supabase client
  ├─ eslint-config
  |   └─ Shared eslint configuration
  ├─ query
  |   └─ State management using Tanstack-query
  ├─ supabase
  |   └─ Supabase client, Edge functions
  ├─ tailwind-config
  |   └─ Shared tailwind configuration
  ├─ types
  |   └─ Shared types
  ├─ typescript-config
  |   └─ Shared tsconfig
  ├─ ui
  |   └─ Shared ui using React-hook-form
  └─ utils
      └─ Shared utils

```

## Quick Start

```bash
git clone https://github.com/01-works/turborepo-kit.git
```

```bash
pnpm i
```

## Setup

### **1. Environment Variables**

```bash
cp .env.example .env.local
```

각 프로젝트에서 Supabase 환경변수를 설정해줍니다.

### 2. Supabase

```sql
create table
  public.profile (
    user_id uuid primary key,
    profile_image text,
    nickname text not null,
    foreign key (user_id) references auth.users (id)
  );
```

[Supabase](https://supabase.com/)에서 프로젝트를 생성하고 profile 테이블과 profile 스토리지를 생성해줍니다. (RLS 설정 생략)

```bash
supabase init
supabase login
supabase link
```

위 명령어를 순서대로 실행하고 `pnpm gen-types` 를 입력하면 `database.types.ts` 파일이 생성됩니다.

### 3. Run

각 환경별 사전 설정은 [Expo](https://docs.expo.dev/), [Next.js](https://nextjs.org/docs), [Tauri](https://tauri.app/ko/v1/guides/) 공식문서를 참고해주시길 바랍니다.

- app
    
    ```bash
    pnpm run dev
    ```
    
- program
    
    ```bash
    pnpm tauri dev
    ```
    
- web
    
    ```bash
    pnpm run dev
    ```
