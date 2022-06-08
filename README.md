# blockchain-in-action
블록체인 인 액션 예제

1. Intellij Plugin 설치
   1. Plugin 마켓에서 검색 후 설치
   2. Solidity, Truffle
2. NPM 모듈 설치
   1. Truffle
   ```bash
   $ npm install -g truffle
   ```
   2. Ganache CLI
   ```bash
   $ npm install -g ganache-cli
   ```
3. 프로젝트 설정
   1. Truffle 프로젝트로 생성
   2. truffle-config.js 파일 수정
   ```js
   module.exports = {
       // ...
       networks: {
           // ...
           development: {
               host: "127.0.0.1",
               port: 7545,
               network_id: "5777"
           }
       },
       // ...
   };
   ```
4. Ganache Ethereum Local Instance 실행
   1. 실행 명령어
      1. 반드시 -i 옵션으로 사용할 network_id 를 설정하고 실행할 것!!
   ```bash
   {WORK_DIR}$ ganache-cli -p 7545 -i 5777
   ```
5. 컴파일 위치 변경
   1. truffle-config.js 파일 수정
      1. 단일파일 컴파일은 지원하지 않음
      2. 디렉토리 단위로 컴파일은 가능함
      3. 동일한 contract 이름이 있는 경우 해당 파일은 컴파일되지 않음
      ```text
      > Duplicate contract names found for Counter.
      > This can cause errors and unknown behavior. Please rename one of your contracts.
      
      > Duplicate contract names found for AccountsDemo.
      > This can cause errors and unknown behavior. Please rename one of your contracts.
      
      > Duplicate contract names found for Airlines.
      > This can cause errors and unknown behavior. Please rename one of your contracts
      ```
      4. 소스에 있는 "pragma" 설정과 "solc" 설정을 같은 버전으로 설정 해야 컴파일이 정상적으로 동작함
      5. 단일파일 테스트를 위해 "testsrc" 디렉토리를 생성 후 해당 디렉토리에 테스트할 .sol 파일만 복사하여 테스트함
      6. compile 시 기존에 컴파일된 파일을 지우지 않으므로 주의 할 것!!
   ```js
   module.exports = {
       // ...
       contracts_directory: "./contracts/testsrc",
       // ...
       // Configure your compilers
       compilers: {
           solc: {
               // version: "0.8.13",      // Fetch exact version from solc-bin (default: truffle's version)
               version: "^0.6.2",      // Fetch exact version from solc-bin (default: truffle's version)
               // ...
           }
       }
   };
   ```
   2. migrations 디렉토리의 파일 수정
      1. AS-IS
      ```js
      const Migrations = artifacts.require("Migrations");
      ```
      2. TO-BE
      ```js
      const Migrations = artifacts.require("./contracts/testsrc/Counter.sol");
      ```
   3. compile 명령 실행
   ```bash
   {WORK_DIR}$ truffle compile
   ```
   4. 테스트 배포
   ```bash
   {WORK_DIR}$ truffle migrate --network development
   ```
6. Truffle 명령어를 사용한 테스트
   1. contract 생성
      1. 파일 생성 후 내용 작성
   ```bash
   {WORK_DIR}$ truffle create contract Counter
   ```
   2. 배포 스크립트 생성 및 수정
   ```bash
   {WORK_DIR}$ truffle create migration deploy
   ```
   3. 테스트 소스 작성
      1. 위치 : test/*.sol
   4. 5번 사항을 참고하여 아래를 수행
      1. compile
      2. 배포
   5. 테스트 코드 실행
   ```bash
   {WORK_DIR}$ truffle test
   ```
   6. 테스트 결과 확인
   7. Metamask
      1. 테스트용 PW : 0 -> 1
      2. 테스트 계정을 재설정할 경우
         1. 크롬에서 플러그인 삭제
         2. 재설치 후 지갑 가져오기로 비밀번호를 재등록하면 기존 설정이 모두 사라진 상태로 재설치됨
            1. ganache-cli 테스트 노드의 계정을 사용하기 위해서는 새 계정으로 지갑을 생성하면 안됨!!
            2. ganache-cli 테스트 노드의 경우 테스트 노드 서버 실행 시 마다 테스트 계정이 새로 생성되는것에 주의 할 것!!
               1. Metamask 의 경우 지갑 삭제 및 재설정 기능이 없음      
               2. ganache-cli 를 재실행한 경우 매번 Metamask 플러그인을 재설치하여 지갑을 새로 설정해야함!!!      
         3. Ganache 연동 후 테스트용 계정을 Metamask에 등록
            1. ganache-cli 에서 실행 시 사용한 포트로 URL을 등록 해야함
            2. URL : http://localhost:{PORT}
         4. 매번 테스트 계정을 위해 지갑 설정을 새로하기 귀찮을 경우
            1. 개발에 사용할 지갑을 새계정 생성을 사용하여 생성 후 아래의 두 정보를 보관 할 것!!
               1. Metamask 신규 계정의 Mnemonic 문자 보관
               2. 신규 계정에 생성시 사용한 비밀번호 보관
            2. 개발용 지갑에 “계정 가져오기”를 사용하여 필요한 테스트 계정을 import 하여 사용할 것!!
               1. 가져오기 한 계정정보는 삭제가 가능함
      3. 시드 구문(Mnemonic)으로 계정 등록
         1. ganache-cli 로 테스트 노드 실행
         2. 아래의 출력문에서 Mnemonic 글자를 복사
         ```text
         HD Wallet
         ==================
         Mnemonic:      paddle core regular hurdle empty afraid chicken cotton rifle actress narrow asset
         Base HD Path:  m/44'/60'/0'/0/{account_index}
         ```
         3. 지갑 가져오기를 선택 후 위 시드 구문과 비밀번호를 등록하여 로그인 할 것!
         4. 시드 구문으로 로그인하면 테스트 계정중 첫번째 계정만 등록됨
         5. 계정 가져오기에서 아래의 키를 사용하여 두번째부터 마지막 계정까지 계정을 추가 할 것!
         ```text
         Private Keys
         ==================
         (0) 0xdb33ff2c5825dabf919accd495f5802a58463826d0be33e97b5e7fddc27581d1
         (1) 0xba297d75ba5e8f6651c1a443db1b1e676d541500f07fdbfe5e60e2407a4d13f1
         (2) 0xc83fda44c352b48b80a7b7efabfc25642e158a582443e2e9cf2ad7d25c23d42a
         (3) 0x9178f1af15edbd3821fc153d34a42a7845380cf2bca6b217d1f653367edb50ec
         (4) 0x11c04baeb8d15d744dca86c97567a4cb5110bb4ec45d77b1cad555eaf645fa35
         (5) 0x916726aab00435c59a1dd3dc8e78d16ac0105ecca0fddc23ac4d398d0047f0ef
         (6) 0xc21c36d99f1b773044a23bc797109f7add00b73ad73d21edbec99e16b9130fa2
         (7) 0x9d7c267e1447714483e686caa55620b6f539a7cbe289aff217ee2f83dcbd1848
         (8) 0x0337ec7f937dd3874ee01cf4bb98546249563afbed0a3e5dfa33eb69f06c4ead
         (9) 0x83093f4b347122f5f5844e09a3cfde3e52bb6eb0cc04886d8e0667d2a3e3c26d
         ```
      4. 테스트 진행 시 유의할 점
         1. 테스트 진행 시 처음 사이트 연결 팝업이 뜨면 테스트 할 모든 계정을 선택하여 연결 할 것!!
         2. 액션 진행 시 팝업창에서 ETH 전송 화면이 나타남.
            1. 전송이 필요 없는 경우 해당 화면에서 빠져나간 후 “0” ETH 상태에서 다음단계로 진행하면 됨
            2. ETH 전송 실패가 발생하지만, 필요한 액션은 성공됨
         3. 지갑 연동과 관련해서는 테스트용 샘플과의 버전 차이로 인해 특정 액션이 안되는 경우도 발생함
