# 마이링크 (MyLink) PRD (제품 요구사항 정의서)

## 문서 이력
| 버전 | 작성일 | 주요 변경 내용 |
| --- | --- | --- |
| v1.0 | 2026-05-16 | PRD 초안 작성 |
| v1.1 | 2026-05-16 | 불필요한 기능(드래그앤드롭 등) 제거 및 Firestore 모델링 추가 |
| v1.2 | 2026-05-25 | 프로필 이미지/테마 기능 제거, 인라인 편집 모드 추가, 구글 파비콘 API 명시 |
| v1.3 | 2026-05-25 | URL slug를 displayName으로 통합 (Gmail ID 기반 초기화), DB 필드 최적화(faviconUrl 제거) |
| v1.4 | 2026-05-25 | 데이터베이스 모델링을 JSON 스키마(Schema) 형태로 변경 및 컬렉션 분리 |

---

## 1. 프로젝트 개요
- **프로젝트명:** 마이링크 (MyLink)
- **목적:** 개발자 및 크리에이터를 위한 여러 개의 링크를 하나의 통합된 페이지로 모아서 공유할 수 있게 해주는 마이크로 랜딩 페이지 서비스 (Linktree 클론)
- **대상 사용자:** 
  - 다양한 소셜 미디어 채널을 운영하는 크리에이터
  - 깃허브(GitHub), 기술 블로그, 포트폴리오를 한 곳에 모아 공유하고 싶은 개발자 및 디자이너

## 2. 핵심 기능 목록

### 필수 기능 (MVP - Minimum Viable Product)
- **회원가입 및 로그인:** Firebase를 활용한 구글 소셜 로그인 전용
- **프로필 관리 (인라인 편집):** 표시 이름(displayName), 한 줄 소개(Bio) 등록 및 수정
- **링크 관리 (CRUD 및 인라인 편집):**
  - 링크 추가, 수정, 삭제
  - 수정 시 인라인 모드(Inline Editing) 적용
  - 정렬: 최신순(가장 최근에 추가한 링크가 상단에 위치) 정렬 고정
  - 파비콘: 구글 API를 활용하여 등록된 URL을 기반으로 동적 렌더링
- **개인화된 페이지 제공:** `mylink.com/displayName` 형태의 고유 URL 제공 (displayName이 곧 URL slug)
- **UI 시스템:** shadcn/ui 기반의 직관적인 디자인 (별도 커스텀 테마 기능 없음)

## 3. 기능 상세 설명

### 3.1 회원가입 및 로그인
- **Firebase Authentication의 구글 로그인**을 사용하여 사용자가 단 1번의 클릭으로 가입 및 로그인할 수 있도록 합니다.
- **초기 프로필 설정:** 가입 시 사용자의 구글 계정 이메일(지메일 아이디 부분, 예: `abc@gmail.com`의 `abc`)을 추출하여 초기 `displayName` 값으로 자동 설정합니다.

### 3.2 프로필 관리
- **이미지 없음:** 텍스트 위주의 깔끔한 구성을 위해 프로필 이미지 업로드 기능은 제공하지 않습니다.
- **인라인 편집 (Inline Editing):** 
  - **표시 이름 (displayName):** 페이지 상단에 표시되는 이름이자 동시에 **개인 페이지 URL (slug)**로 사용됩니다. 텍스트를 클릭하여 바로 수정할 수 있으며, URL로 사용되므로 수정 시 실시간 중복 검사가 필요합니다.
  - **한 줄 소개 (Bio):** 방문자에게 자신을 소개할 수 있는 텍스트 필드입니다. 인라인 편집 모드를 지원합니다.

### 3.3 링크 관리
- **추가/삭제:** 직관적인 UI를 통해 링크 블록을 새롭게 추가하거나 삭제할 수 있습니다.
- **인라인 편집 (Inline Editing):** 생성된 링크의 타이틀이나 URL을 클릭하면 별도 모달 없이 바로 수정 상태로 변경됩니다.
- **정렬 방식:** 별도의 순서 변경 기능 없이, 링크 생성일자(`createdAt`)를 기준으로 내림차순(최신순)으로 자동 정렬됩니다.
- **파비콘(Favicon) 동적 연동:** 별도로 DB에 파비콘 주소를 저장하지 않고, 프론트엔드 단에서 링크의 `url` 데이터를 바탕으로 구글 API(`https://www.google.com/s2/favicons?domain={url}`)를 호출해 즉시 파비콘을 렌더링합니다.
- **유효성 검사:** 입력된 URL 형식이 올바른지 검사합니다 (http/https 포함 여부).

### 3.4 UI 및 디자인 시스템 (shadcn/ui)
- 관리자 대시보드와 사용자 노출 페이지 모두 **shadcn/ui** 기반의 컴포넌트를 활용하여 통일감 있고 깔끔한 디자인을 구현합니다.

## 4. 데이터베이스 모델링 (Firebase Firestore)

Firestore의 NoSQL 특성에 따라 컬렉션과 서브 컬렉션을 분리하여 모델링합니다. 
(아래 JSON은 각 컬렉션 문서(Document)의 스키마 구조를 나타냅니다.)

### 4.1 `displayNames` 컬렉션 (중복 검사 최적화용)
회원가입(초기 설정) 및 displayName 수정 시 문서 ID 조회를 통해 빠르게 중복 여부를 파악합니다.

```json
{
  "_documentId": "jane_doe", // 사용자가 설정한 displayName (string)
  "uid": "abc123xyz456" // 해당 displayName을 소유한 사용자의 Auth UID (string)
}
```

### 4.2 `users` 메인 컬렉션
사용자의 기본 프로필 정보를 저장합니다.

```json
{
  "_documentId": "abc123xyz456", // Firebase Auth UID (string)
  "email": "jane@gmail.com", // 사용자 이메일 (string)
  "username": "jane_doe", // 사용자 고유 아이디 (string)
  "photoURL": "https://example.com/photo.jpg", // 사용자 프로필 이미지 URL (string)
  "displayName": "Jane Doe", // 화면 상단 표시 이름 겸 URL slug (string)
  "bio": "프론트엔드 개발자입니다.", // 한 줄 소개 (string)
  "createdAt": "2026-05-25T17:10:24Z", // 계정 생성일자 (timestamp)
  "updatedAt": "2026-05-25T17:10:24Z" // 계정 마지막 수정일자 (timestamp)
}
```

### 4.3 `links` 서브 컬렉션 (`users/{uid}/links`)
특정 사용자가 등록한 링크 목록을 저장합니다. 파비콘은 프론트엔드에서 `url`을 기반으로 동적 렌더링하므로 DB에 저장하지 않습니다.

```json
{
  "_documentId": "link_987654321", // 자동 생성된 링크 고유 ID (string)
  "title": "나의 GitHub", // 링크 제목 (string)
  "url": "https://github.com/janedoe", // 연결될 목적지 URL 주소 (string)
  "createdAt": "2026-05-25T17:10:24Z", // 링크 생성일자 (timestamp, 최신순 정렬 시 사용)
  "updatedAt": "2026-05-25T17:10:24Z" // 링크 마지막 수정일자 (timestamp)
}
```

## 5. 기술 스택
- **프론트엔드:** Next.js (React), Tailwind CSS, shadcn/ui
- **백엔드/인증/데이터베이스:** Firebase (Authentication, Firestore)
