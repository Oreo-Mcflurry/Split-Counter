# SplitCounter

SplitCounter는 React Native로 개발된 카운터 앱입니다.

## 🚀 프로젝트 개요

이 프로젝트는 **Claude Code, Cursor와 함께하는 바이브코딩 연습 프로젝트**입니다.

## 🛠️ 기술 스택

- **React Native** 0.79
- **TypeScript**
- **Clean Architecture**
- **Reducer Pattern** (상태 관리)

## 📱 주요 기능

- 카운터 증가/감소
- 비동기 작업 처리
- 상태 관리 연습
- 터치 이벤트 실험

## 🏗️ 프로젝트 구조

```
src/
├── presentation/     # UI Layer
├── store/           # State Management
├── domain/          # Business Logic
├── data/            # Data Layer
└── core/            # Utilities
```

## 🚀 시작하기

```bash
# 의존성 설치
npm install

# iOS 실행
npx react-native run-ios

# Android 실행
npx react-native run-android
```

## 🧪 테스트 및 품질 관리

```bash
# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 실행
npm run lint

# 테스트 실행
npm test
```

## 🔄 CI/CD 파이프라인

GitHub Actions를 통해 자동화된 빌드 및 테스트를 수행합니다:

- **iOS 빌드**: macOS 환경에서 iOS 시뮬레이터 빌드
- **Android 빌드**: Ubuntu 환경에서 APK 및 Bundle 생성
- **테스트**: TypeScript 체크, ESLint, Jest 테스트 실행
- **코드 품질**: 자동화된 코드 검사 및 테스트 커버리지

## 📚 학습 목표

- React Native 기본 개념
- Clean Architecture 패턴
- Reducer 패턴 상태 관리
- 터치 이벤트 처리
- TypeScript 활용
- CI/CD 파이프라인 구축

---

**Claude Code + Cursor + 바이브코딩 = 🎯 코딩 실력 향상!**