<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.util.*" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>휴대전화 인증</title>
    <!-- Google Fonts 추가 -->
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap" rel="stylesheet">
    <!-- Font Awesome 아이콘 추가 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- jQuery CDN -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- SweetAlert2 CDN 추가 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <style>
      /* 전역 스타일 */
      body {
        font-family: 'Noto Sans KR', sans-serif;
        background-color: #f0f4f8;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
      }

      .container {
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 500px;
      }

      .text-box{
        display : flex;
        justify-content: center;
        align-items: center;
        padding : 20px 10px;
        border : 1px solid hotpink;
        border-radius: 15px;
      }

      h1, h3 {
        text-align: center;
        color: #ff69b4;
        margin-bottom: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
      }

      label {
        margin: 15px 0 10px;
        font-weight: 400;
        color: #333333;
      }

      input[type="text"], input[type="password"], select {
        background-color: #fbfbfb; /* 아주 옅은 회색 */
        padding: 10px;
        border: none; /* 전체 테두리 제거 */
        border-bottom: 1px solid #000000; /* 하단 테두리만 검은색 */
        border-radius: 0px; /* 모서리 둥글게 하지 않음 */
        font-size: 1em;
        transition: border-color 0.3s;
      }

      input[type="text"]:focus, select:focus, input[type="password"]:focus {
        border-bottom: 2px solid #ff69b4; /* 포커스 시 하단 테두리 색상 변경 */
        outline: none;
      }

      .id-fields {
        display: flex;
        gap: 10px;
      }

      .id-fields input {
        flex: 1;
      }

      /* 전화번호 입력과 인증번호 전송 버튼을 한 줄로 배치 */
      .phone-verification {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .phone-verification input {
        flex: 1;
        /* 크기 조정을 위해 폰트 사이즈 조절 */
        font-size: 1em;
      }

      .phone-verification button {
        /* 크기를 줄이고 버튼 내 텍스트 크기 조절 */
        padding: 8px 12px;
        background-color: #ff69b4;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 0.9em;
        cursor: pointer;
        transition: background-color 0.3s;
        white-space: nowrap;
      }

      .phone-verification button:hover {
        background-color: #ff4c8b;
      }

      button {
        /*margin-top: 0px;*/
        padding: 12px;
        background-color: #ff69b4;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 1em;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      button:hover {
        background-color: #ff4c8b;
      }

      /* 드로어 모달 스타일 */
      #keypadDrawer {
        position: fixed;
        bottom: -100%;
        left: 0;
        width: 100%;
        max-width: 550px;
        height: 270px;
        background-color: #ffffff;
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.2);
        transition: bottom 0.3s ease-in-out;
        z-index: 1000;
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      #keypadDrawer.active {
        bottom: 0;
      }

      .drawer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .drawer-header h2 {
        margin: 0;
        color: #ff69b4;
        font-size: 1.2em;
      }

      .drawer-close {
        background: none;
        border: none;
        font-size: 1.5em;
        cursor: pointer;
        color: #ff69b4;
      }

      /* 뒤로가기 버튼 스타일 */
      .back-button {
        background-color: #000000; /* 검은색 배경 */
        color: #ffffff; /* 하얀 글씨 */
        border: none;
        cursor: pointer;
        font-size: 1.2em;
      }

      /* 확인 버튼 스타일 (기존 confirm-button 클래스 유지) */
      .confirm-button {
        grid-column: span 2;
        background-color: #ff69b4; /* 핑크 배경 */
        color: #ffffff; /* 하얀 글씨 */
        border: none;
        cursor: pointer;
        font-size: 1em;
      }

      .keypad-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 60px);
        gap: 0px; /* 간격 없애기 */
        flex-grow: 1;
      }

      .keypad-grid button {
        font-size: 1.5em;
        border: 1px solid #ffffff; /* 버튼 간 구분을 없애기 위해 테두리 색상을 배경색과 동일하게 설정 */
        border-radius: 0px; /* 각 버튼의 모서리를 둥글게 하지 않음 */
        background-color: #bababa;
        cursor: pointer;
        transition: background-color 0.3s;
        width: 100%;
        height: 100%;
      }

      .keypad-grid button:hover {
        background-color: #ffb6c1;
      }

      .empty-cell {
        visibility: hidden;
      }

      /* 인증번호 입력 섹션 */
      #codeVerification {
        display: none;
        margin-top: 5px;
        /*text-align: center;*/
      }

      #codeVerification input {
        background-color: #fbfbfb; /* 아주 옅은 회색 */
        padding: 10px;
        border: none; /* 전체 테두리 제거 */
        border-bottom: 2px solid #000000; /* 하단 테두리만 검은색 */
        border-radius: 0px; /* 모서리 둥글게 하지 않음 */
        width: 100%;
        margin: 10px auto 20px;
        font-size: 1em;
        transition: border-color 0.3s;
      }

      #codeVerification input:focus {
        border-bottom: 2px solid #ff69b4; /* 포커스 시 하단 테두리 색상 변경 */
        outline: none;
      }

      /* 인증번호 확인 버튼 스타일 추가 */
      #verifyCodeBtn {
        display: block;
        margin: 10px auto;
        padding: 15px 30px;
        font-size: 1.1em;
        width: 50%;
        max-width: 200px;
      }

      @media (max-width: 600px) {
        .container {
          padding: 20px;
        }

        .keypad-grid button {
          padding: 10px;
          font-size: 1em;
        }

        #codeVerification input {
          width: 100%;
        }

        /* 인증번호 확인 버튼 크기 조정 */
        #verifyCodeBtn {
          width: 60%;
          max-width: 250px;
        }
      }
    </style>
</head>
<body>

<div class="container">
    <h3 class="text-box">휴대전화 인증</h3>

    <form id="verificationForm">
        <label for="name">이름</label>
        <input type="text" id="name" name="name" placeholder="이름을 입력하세요" required>

        <label for="idBack">주민등록번호</label>
        <div class="id-fields">
            <input type="text" id="idFront" name="idFront" placeholder="앞자리" maxlength="6" required>
            <input type="password" id="idBack" name="idBack" placeholder="뒷자리" readonly onclick="openDrawer()" maxlength="6" required>
        </div>

        <label for="telecom">통신사</label>
        <select id="telecom" name="telecom" required>
            <option value="">통신사를 선택하세요</option>
            <option value="SKT">SKT</option>
            <option value="KT">KT</option>
            <option value="LG U+">LG U+</option>
        </select>

        <label for="phoneNumber">휴대전화번호</label>
        <div class="phone-verification">
            <input type="text" id="phoneNumber" name="phoneNumber" placeholder="010-1234-5678" required>
            <button type="button" id="sendCodeBtn">인증번호 전송</button>
        </div>
    </form>

    <!-- 키패드 드로어 -->
    <div id="keypadDrawer">
        <!-- 드로어 헤더 제거 -->
        <div class="keypad-grid">
            <!-- 랜덤 숫자 버튼 (2개의 빈칸 포함) -->
            <%
                // Java 코드로 10개의 랜덤 숫자를 생성하고, 2개의 빈칸을 무작위로 배치하여 12개의 숫자를 그리드에 배치
                List<Integer> numbers = new ArrayList<>();
                for(int i=0; i<10; i++) {
                    numbers.add(i);
                }
                Collections.shuffle(numbers);

                // 두 개의 빈칸을 무작위 위치에 추가 (예: 위치 3과 7)
                int emptyCell1 = (int)(Math.random() * 11); // 0 ~ 10
                int emptyCell2;
                do {
                    emptyCell2 = (int)(Math.random() * 12); // 0 ~ 11
                } while(emptyCell2 == emptyCell1);
                numbers.add(emptyCell1, null);
                numbers.add(emptyCell2, null);

                for(Integer num : numbers) {
                    if(num != null) {
                        out.println("<button type='button'>" + num + "</button>");
                    } else {
                        out.println("<div class='empty-cell'></div>");
                    }
                }
            %>
            <!-- 마지막 행: 뒤로가기, X(닫기), 확인 버튼 -->
            <button type="button" class="back-button" onclick="clearIdBack()"><i class="fas fa-arrow-left"></i></button>
            <button type="button" onclick="closeDrawer()"><i class="fas fa-times"></i></button>
            <button type="button" class="confirm-button" onclick="submitDrawer()">확인</button>
        </div>
    </div>

    <!-- 인증번호 입력 섹션 -->
    <div id="codeVerification">
        <label>인증번호를 입력해주세요</label>
        <input type="text" id="verificationCode" placeholder="인증번호 입력" required>
        <button type="button" id="verifyCodeBtn">인증번호 확인</button>
    </div>
</div>

<script>
  // 드로어 열기
  function openDrawer() {
    // 키패드 드로어 활성화
    document.getElementById("keypadDrawer").classList.add("active");
    // 오버레이 제거 (배경 어둡게 하지 않음)
    // document.getElementById("overlay").classList.add("active");
  }

  // 드로어 닫기
  function closeDrawer() {
    document.getElementById("keypadDrawer").classList.remove("active");
    // 오버레이 제거
    // document.getElementById("overlay").classList.remove("active");
  }

  // 드로어에서 확인 버튼 클릭 시
  function submitDrawer() {
    closeDrawer();
  }

  // 주민등록번호 뒷자리 초기화 (뒤로가기 버튼 클릭 시)
  function clearIdBack() {
    const idBackInput = document.getElementById("idBack");
    idBackInput.value = idBackInput.value.slice(0, -1);
  }

  /* // 오버레이 클릭 시 드로어 닫기 (배경 오버레이 제거)
  document.getElementById("overlay").addEventListener("click", function () {
    closeDrawer();
  }); */

  $(document).ready(function () {
    // 인증번호 전송 버튼 클릭 시
    $('#sendCodeBtn').click(function () {
      var phoneNumber = $('#phoneNumber').val();
      var name = $('#name').val();
      var telecom = $('#telecom').val();
      var idFront = $('#idFront').val();
      var idBack = $('#idBack').val();

      // 입력 유효성 검사
      if (!phoneNumber || !telecom || !idFront || !idBack) {
        Swal.fire({
          icon: 'warning',
          title: '모든 필드를 입력해주세요.',
          confirmButtonColor: '#ff69b4'
        });
        return;
      }

      // 주민등록번호 합치기
      var idNumber = idFront + '-' + idBack;

      // 인증번호 전송 요청
      $.ajax({
        url: '/api/auth/send',
        type: 'POST',
        data: {
          phoneNumber: phoneNumber,
          name: name,
          telecom: telecom,
          idNumber: idNumber
        },
        success: function (response) {
          if (response.message === '문자 전송이 완료되었습니다.') {
            Swal.fire({
              icon: 'success',
              title: '인증번호가 전송되었습니다.',
              confirmButtonColor: '#ff69b4'
            }).then(() => {
              $('#codeVerification').show();
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '인증번호 전송에 실패했습니다.',
              confirmButtonColor: '#ff69b4'
            });
          }
        },
        error: function (error) {
          console.error('Error sending verification code:', error);
          Swal.fire({
            icon: 'error',
            title: '서버 오류로 인증번호 전송에 실패했습니다.',
            confirmButtonColor: '#ff69b4'
          });
        }
      });
    });

    // 인증번호 확인 버튼 클릭 시
    $('#verifyCodeBtn').click(function () {
      var phoneNumber = $('#phoneNumber').val();
      var code = $('#verificationCode').val();

      if (!code) {
        Swal.fire({
          icon: 'warning',
          title: '인증번호를 입력해주세요.',
          confirmButtonColor: '#ff69b4'
        });
        return;
      }

      // 인증번호 확인 요청
      $.ajax({
        url: '/api/auth/verify',
        type: 'POST',
        data: {
          phoneNumber: phoneNumber,
          code: code
        },
        success: function (response) {
          if (response.success) {
            Swal.fire({
              icon: 'success',
              title: '인증에 성공하였습니다.',
              confirmButtonColor: '#ff69b4'
            }).then(() => {
              // 인증 성공 시 창 닫기 또는 다른 동작 수행
              window.close();
              // 만약 window.close()가 작동하지 않는다면, 다른 페이지로 리다이렉트
              // window.location.href = '/InsGift/giveGift/Step0104';
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: '인증번호가 일치하지 않습니다.',
              confirmButtonColor: '#ff69b4'
            });
          }
        },
        error: function (error) {
          console.error('Error verifying code:', error);
          Swal.fire({
            icon: 'error',
            title: '서버 오류로 인증번호 확인에 실패했습니다.',
            confirmButtonColor: '#ff69b4'
          });
        }
      });
    });
  });

  // 키패드 버튼 클릭 시 입력 처리 (즉시 입력되도록)
  $(document).on('click', '#keypadDrawer .keypad-grid button:not(.confirm-button, .drawer-close, .back-button)', function () {
    const value = $(this).text();
    const idBackInput = $('#idBack');
    if (value >= 0 && value <= 9 && idBackInput.val().length < 7) {
      idBackInput.val(idBackInput.val() + value);
    }
  });
</script>

</body>
</html>
