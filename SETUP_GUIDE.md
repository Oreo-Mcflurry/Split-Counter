# SplitCounter 설치 및 실행 가이드

React Native 기반 1~6분할 카운터 앱입니다.

## 개발 환경 요구사항

- Node.js >= 18
- React Native CLI
- Android Studio (Android)
- Xcode >= 14 (iOS)

## 설치 방법

### 1. 의존성 설치

```bash
# 프로젝트 루트에서 실행
npm install

# iOS 의존성 설치
cd ios
pod install
cd ..
```

### 2. Android 설정

Android Studio에서 프로젝트를 열고 SDK 버전을 확인하세요:
- Minimum SDK: 24
- Target SDK: 34

### 3. iOS 설정

Xcode에서 `ios/SplitCounter.xcworkspace` 파일을 열어서 빌드 설정을 확인하세요:
- iOS Deployment Target: 15.0

## 실행 방법

### Metro 번들러 시작

```bash
npm start
```

### Android 실행

```bash
# 안드로이드 에뮬레이터 또는 실기기 연결 후
npm run android
```

### iOS 실행

```bash
# iOS 시뮬레이터에서 실행
npm run ios

# 특정 기기에서 실행
npm run ios -- --device "iPhone 15"
```

## 테스트 실행

```bash
# 단위 테스트 실행
npm test

# 커버리지와 함께 테스트
npm test -- --coverage
```

## 빌드

### Android 릴리스 빌드

```bash
cd android
./gradlew assembleRelease
```

APK 파일은 `android/app/build/outputs/apk/release/` 에 생성됩니다.

### iOS 릴리스 빌드

1. Xcode에서 프로젝트 열기
2. Product > Archive 선택
3. App Store Connect 또는 Ad Hoc 배포

## 트러블슈팅

### Pod 설치 오류

```bash
cd ios
pod repo update
pod install --repo-update
```

### Metro 캐시 문제

```bash
npx react-native start --reset-cache
```

### Android 빌드 오류

```bash
cd android
./gradlew clean
```

### 권한 오류

Android에서 VIBRATE 권한이 자동으로 추가됩니다.
추가 권한이 필요한 경우 `android/app/src/main/AndroidManifest.xml` 을 수정하세요.

## 주요 기능

- ✅ 1~6개 섹션 동적 분할
- ✅ 탭(+1), 길게 누르기(-1), 더블탭(초기화)
- ✅ 섹션별 개별 설정 (색상, 제목, 사운드, 햅틱)
- ✅ 글로벌 설정 화면
- ✅ MMKV 기반 영구 저장
- ✅ TypeScript + 클린 아키텍쳐
- ✅ Zustand + Reducer 패턴

## 파일 구조

```
src/
├── core/
│   ├── constants/     # 앱 상수
│   ├── types/         # TypeScript 타입 정의
│   └── utils/         # 유틸리티 함수
├── data/
│   ├── datasources/   # MMKV 데이터소스
│   └── repositories/  # 리포지토리 패턴
├── domain/
│   └── usecases/      # 비즈니스 로직
├── presentation/
│   ├── components/    # UI 컴포넌트
│   ├── screens/       # 화면 컴포넌트
│   └── navigation/    # 네비게이션 설정
└── store/
    ├── store.ts       # Zustand 스토어
    └── hooks.ts       # 커스텀 훅
```