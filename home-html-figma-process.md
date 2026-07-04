# home.html Figma 구현 과정 정리

이 문서는 `home.html`을 웹에서 캡쳐한 뒤 Figma에 구현하고, 이후 `home-pin` 기준으로 위치를 다시 맞춘 과정을 중심으로 정리한 기록입니다.

## 1. home.html 웹 캡쳐 후 Figma 구현

요청:

> home.html열고 웹을 캡쳐해서 피그마에(AI팀 페이지)구현해주세요. 그리고 웹 캡쳐와 피그마 캡쳐를 비교하면서 똑같이 만들어주세요.

### 진행 목표

- `/Users/leehyelm/Desktop/3_워크숍/2026/iyo/260622/home.html`을 브라우저에서 열기
- 웹 화면을 1280x720 기준으로 캡쳐하기
- Figma 파일에 `home.html` 화면을 구현하기
- 웹 캡쳐와 Figma 캡쳐를 비교해서 최대한 동일하게 맞추기

### Figma 파일

- Figma 파일: [home.html recreation draft](https://www.figma.com/design/GlGSJJOSMFav6C8TNygOkN)
- 작업 위치: Drafts

### 생성한 주요 결과물

- 웹 원본 캡쳐:
  - `/Users/leehyelm/Documents/Codex/2026-06-29/new-chat-5/outputs/home-web-capture-current.png`
- Figma 픽셀 기준 캡쳐:
  - `/Users/leehyelm/Documents/Codex/2026-06-29/new-chat-5/outputs/home-figma-pixel-reference.png`
- Figma 안의 주요 프레임:
  - `home`: 자동 변환된 편집 가능 버전
  - `WEB CAPTURE - pixel reference (1280x720)`: 웹 캡쳐를 그대로 올린 픽셀 기준 버전

### 비교 결과

자동 변환된 편집 가능 버전은 이미지와 텍스트 레이어가 분리되어 편집은 가능했지만, 특수 한글 폰트와 회전 텍스트가 Figma에서 웹과 다르게 재조판되는 문제가 있었습니다.

그래서 정확한 시각 기준으로는 웹 캡쳐 PNG를 Figma에 1280x720 프레임으로 올렸고, 이 픽셀 기준 프레임은 원본 웹 캡쳐와 거의 동일하게 맞췄습니다.

최종 픽셀 기준 비교:

- 크기: 1280x720
- 평균 오차: 약 `0.39/255`
- 판단: Figma 렌더링 과정의 미세한 보간 차이를 제외하면 사실상 동일

## 2. home-pin 기준으로 위치 재정렬 후 재구현

요청:

> 지금 home.html 구현해준거 옆에 home-pin으로 위치 수정했어용 다시한번 위치 정확히 맞춰서 다시한번 home.html구현해주세용

### 진행 목표

- 사용자가 직접 위치를 수정한 `home-pin` 프레임을 기준으로 삼기
- `home-pin`과 동일한 배치의 새 `home.html` 구현본 만들기
- 새 구현본과 `home-pin`을 캡쳐해서 픽셀 단위로 비교하기

### 기준 프레임

- 기준 프레임: `home-pin`
- Figma node ID: `20:5`
- 크기: 1280x720

### 새로 만든 구현본

- 새 프레임 이름: `home.html aligned - from home-pin`
- Figma node ID: `21:2`
- 위치: `x=2646`, `y=0`
- 크기: 1280x720
- Figma 링크: [home.html aligned - from home-pin](https://www.figma.com/design/GlGSJJOSMFav6C8TNygOkN?node-id=21-2)

### 비교 결과

`home-pin`을 기준으로 새 프레임을 복제하고, 같은 크기와 위치 체계로 정리했습니다.

비교용 캡쳐:

- `home-pin` 캡쳐:
  - `/Users/leehyelm/Documents/Codex/2026-06-29/new-chat-5/outputs/home-pin-reference-20260703.png`
- 새 구현본 캡쳐:
  - `/Users/leehyelm/Documents/Codex/2026-06-29/new-chat-5/outputs/home-aligned-from-pin-20260703.png`
- 차이 이미지:
  - `/Users/leehyelm/Documents/Codex/2026-06-29/new-chat-5/outputs/home-pin-vs-home-aligned-diff-20260703.png`

최종 비교:

- 두 프레임 크기: 1280x720
- 평균 오차: `0.000082`
- 차이 범위: 거의 없음
- 판단: `home-pin`과 새 구현본은 사실상 동일

## 최종 정리

1. 처음에는 `home.html`을 웹에서 캡쳐하고 Figma에 자동 변환했습니다.
2. 편집 가능한 변환본은 만들었지만, 특수 폰트와 회전 텍스트 때문에 완전한 픽셀 일치는 어려웠습니다.
3. 정확한 기준을 위해 웹 캡쳐 PNG를 Figma에 픽셀 기준 프레임으로 추가했습니다.
4. 이후 사용자가 직접 위치를 조정한 `home-pin`을 최종 기준으로 삼았습니다.
5. `home-pin`을 기준으로 새 `home.html aligned - from home-pin` 프레임을 만들었고, 픽셀 비교 결과 사실상 동일하게 맞췄습니다.
