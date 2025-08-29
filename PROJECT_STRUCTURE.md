# SplitCounter 프로젝트 구조

React Native + TypeScript + 클린 아키텍쳐 기반 1~6분할 카운터 앱

## 📂 파일 구조

```
SplitCounter/
├── src/
│   ├── core/                    # 핵심 로직 (프레임워크 독립적)
│   │   ├── constants/
│   │   │   └── index.ts        # 앱 전역 상수
│   │   ├── types/
│   │   │   └── index.ts        # TypeScript 타입 정의
│   │   └── utils/
│   │       └── index.ts        # 유틸리티 함수
│   │
│   ├── data/                    # 데이터 액세스 계층
│   │   ├── datasources/
│   │   │   └── storage.ts      # MMKV 스토리지 데이터소스
│   │   └── repositories/
│   │       └── AppRepository.ts # 리포지토리 구현체
│   │
│   ├── domain/                  # 비즈니스 로직 계층
│   │   └── usecases/
│   │       └── CounterUseCases.ts # 카운터 유스케이스
│   │
│   ├── presentation/            # 프레젠테이션 계층
│   │   ├── components/
│   │   │   └── SectionItem.tsx  # 개별 섹션 컴포넌트
│   │   ├── screens/
│   │   │   ├── HomeScreen.tsx   # 메인 화면
│   │   │   ├── SettingsScreen.tsx # 설정 화면
│   │   │   └── SectionEditScreen.tsx # 섹션 편집 화면
│   │   └── navigation/
│   │       └── AppNavigator.tsx # 앱 네비게이션
│   │
│   └── store/                   # 상태 관리 계층
│       ├── store.ts            # Zustand 스토어 + Reducer
│       ├── hooks.ts            # 커스텀 훅
│       ├── actions/            # Redux 스타일 액션 (참고용)
│       ├── reducers/           # Redux 스타일 리듀서 (참고용)
│       └── types/              # 스토어 관련 타입 (참고용)
│
├── __tests__/                  # 테스트 파일
│   ├── App.test.tsx           # 앱 렌더링 테스트
│   └── store/
│       └── store.test.ts      # 비즈니스 로직 테스트
│
├── android/                    # Android 네이티브 코드
├── ios/                       # iOS 네이티브 코드
├── App.tsx                    # 앱 진입점
├── package.json               # 의존성 및 스크립트
├── SETUP_GUIDE.md            # 설치 및 실행 가이드
└── PROJECT_STRUCTURE.md      # 이 파일
```

## 🏗️ 아키텍쳐 패턴

### Clean Architecture + MVVM
- **Core**: 비즈니스 로직과 엔티티
- **Data**: 외부 데이터 액세스
- **Domain**: 유스케이스와 비즈니스 규칙
- **Presentation**: UI와 상태 관리

### 상태 관리: Zustand + Reducer 패턴
- **Zustand**: 가벼운 상태 관리 라이브러리
- **Reducer Pattern**: Redux 스타일의 예측 가능한 상태 변경
- **MMKV**: 고성능 키-값 저장소로 영구 저장

## 📋 주요 기능

### 🎯 핵심 기능
- [x] 1~6개 섹션 동적 분할 (sqrt 기반 그리드)
- [x] 제스처: 탭(+1), 길게누르기(-1), 더블탭(초기화)
- [x] 섹션별 개별 설정 (제목, 색상, 사운드, 햅틱)
- [x] 글로벌 설정 화면
- [x] MMKV 기반 영구 저장

### 🛠️ 기술적 특징
- [x] TypeScript strict 모드
- [x] Clean Architecture 적용
- [x] Zustand + Reducer 패턴
- [x] React.memo를 활용한 성능 최적화
- [x] 접근성 라벨 적용
- [x] Jest 기반 단위 테스트
- [x] ESLint + Prettier 코드 품질

### 🎨 UI/UX
- [x] 동적 그리드 레이아웃 (ceil(sqrt(n)) 컬럼)
- [x] 8색 팔레트 색상 선택
- [x] 확인 다이얼로그 (더블탭 초기화)
- [x] 그림자와 애니메이션 효과

## 🔧 데이터 모델

```typescript
type Section = {
  id: string;        // "S1"..."S6"
  title: string;     // 사용자 지정 제목
  color: string;     // hex 색상 코드
  count: number;     // 카운터 값
  sound: boolean;    // 사운드 on/off
  haptic: boolean;   // 햅틱 on/off
};

type Settings = {
  sectionsCount: 1|2|3|4|5|6;  // 분할 개수
  defaultSound: boolean;        // 기본 사운드 설정
  defaultHaptic: boolean;       // 기본 햅틱 설정
};

type AppState = {
  sections: Section[];  // 섹션 배열
  settings: Settings;   // 글로벌 설정
};
```

## 🚀 실행 방법

1. **의존성 설치**: `npm install && cd ios && pod install`
2. **Metro 시작**: `npm start`
3. **Android 실행**: `npm run android`
4. **iOS 실행**: `npm run ios`
5. **테스트 실행**: `npm test`
6. **린트 검사**: `npm run lint`

자세한 내용은 [SETUP_GUIDE.md](./SETUP_GUIDE.md)를 참고하세요.