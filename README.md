# 집중력 부족 현대인을 위한 AI 일정 비서 FLROU

**FLROU**는 **NER(개체명 인식)** 기반 자연어 처리 기술을 활용하여 사용자의 일정 관리를 지능적으로 돕는 웹입니다. 
- 웹 기반이지만 모바일 버전과 PC 버전의 UI/UX를 모두 갖추어 편의성을 극대화하고 있습니다


## 서비스 개요
![서비스 개요 1](https://github.com/user-attachments/assets/0afc56b5-8fd1-4e98-a56c-2d9ad8f72e7b)
![서비스 개요 2](https://github.com/user-attachments/assets/135a6339-4c08-4506-a2f0-98d5219e8ee4)

---

## 스플래시, 회원가입/로그인 화면
- **간편한 사용자 인터페이스**로 회원가입 및 로그인이 가능합니다.
- 직관적인 디자인으로 사용성을 극대화했습니다.

![스플래시 화면](https://github.com/user-attachments/assets/9d6a5817-d73f-43e8-9406-ab60f05c6784)
![회원가입 화면](https://github.com/user-attachments/assets/cea93541-fc2b-451a-b6df-e610c7ec1f23)
![로그인 화면](https://github.com/user-attachments/assets/7162a173-9fbd-4718-a814-638e89fc0449)

---

## 일정 등록
- **NER 기술**을 사용하여 사용자의 텍스트에서 일정명과 시간을 자동으로 추출합니다.
- **캘린더 연동:** 채팅을 통해 입력한 일정이 캘린더에 자동 저장됩니다.
- **일정 수정 가능:** 일정명, 시간, 알림 설정, 색상 변경이 가능합니다.
- **알림 기능:** **FCM**을 활용하여 설정된 알림 시간이 되면 크롬 브라우저로 알림을 전송합니다.

![일정 등록](https://github.com/user-attachments/assets/6aa6e948-0ba2-4ad1-a860-ffe148a43273)
![캘린더 연동](https://github.com/user-attachments/assets/8eb378ad-4a1d-4bc6-b4ee-2320510f127f)
![일정 수정](https://github.com/user-attachments/assets/e1fb6413-5be8-4cf4-ace8-309cc21119cf)


---

## 할 일(To-Do) 등록
- **OKT 모델**을 사용해 사용자가 입력한 텍스트에서 명사와 동사를 추출하고, 이를 바탕으로 할 일을 자동으로 저장합니다.
- 저장된 할 일은 한눈에 확인할 수 있습니다.

![할 일 등록](https://github.com/user-attachments/assets/4ac43d19-7ceb-4c17-9976-537f116f799d)
![할 일 확인](https://github.com/user-attachments/assets/e1e23c93-c6ca-4d76-b334-8fe1d81dca87)

---

## 성과 그래프
- 매달 일정 완료율과 미완료율을 시각적으로 확인할 수 있습니다.
- **강제 알림 유도:** 지난달 완료율이 50% 미만일 경우, 팝업을 통해 모든 일정에 강제 알림 설정을 유도합니다.

![성과 그래프](https://github.com/user-attachments/assets/fab60125-ab1d-4399-81c8-a16b6b576e6e)
