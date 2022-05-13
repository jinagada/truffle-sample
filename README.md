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
               network_id: "*" // Match any network id
           }
       },
       // ...
   };
   ```
4. Ganache Ethereum Local Instance 실행
   1. 실행 명령어
   ```bash
   {WORK_DIR}$ ganache-cli -p 7545
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
   2. 배포 스크립트 생성
   ```bash
   {WORK_DIR}$ truffle create migration deploy
   ```
