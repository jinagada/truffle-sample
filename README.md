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
   2. truffle.js 파일 생성
   ```js
   module.exports = {
     networks: {
       development: {
         host: "127.0.0.1",
         port: 7545,
         network_id: "*" // Match any network id
       }
     }
   };
   ```
4. Ganache Ethereum Local Instance 실행
   1. 실행 명령어
   ```bash
   $ ganache-cli -p 7545
   ```
