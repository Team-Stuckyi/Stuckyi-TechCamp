Github Webhook과 PM2

#### 작성자 : [김우영](https://github.com/0x000613)


Github Webhook을 이용해 원격 저장소의 PUSH를 감지하여 서버에서 PULL하고

PM2 라이브러리를 이용하여 Node.js서버 프로그램을 자동으로 관리하도록 환경 구성을 진행해보려 합니다.

#### 실습환경

- Raspberry Pi Linux
- Node.js
- 8001, 80번포트 개방 완료

## 01. Webhook

하나의 앱/웹이 다른 어플리케이션으로 앱 관련 이벤트 정보를 실시간으로 제공하기 위한 방법이라고 할 수 있습니다. `Web Callback`또는 `HTTP PUSH API`라고 불리기도 합니다.

#### 1.1 Webhook과 API와의 차이점

![webhook vs api](.\img\webhook-vs-api.png)

일반 API 요청은 짧은 주기, 혹은 필요시 반복적으로 API 서버에 조회 요청을 보내 Data의 변경이나, 이벤트 발생 여부를 감지하지만 Webhook은 Webhook에 우리의 서비스의 요청 URL을 등록해두면 Webhook을 제공하는 서비스로부터 특정 이벤트가 발생하면 우리의 서버로 알림을 주게됩니다. 이러한 특성때문에 Webhook은 `Reverse API`라고 불리기도 합니다.

---

#### 1.2 Github SSH 키 등록

Webhook 구성을 하기 이전에 서버에서 pull을 하기 위해서는 반드시 Github에 SSH키가 등록되어있어야 합니다.

등록 절차는 다음과 같습니다.

1. 아래 명령을 사용하여 SSH 키를 발급받습니다.

   ```bash
   $ ssh-keygen
   ```

2. 아래 명령을 사용하여 발급받은 SSH키를 확인합니다.

   ```bash
   $ cat ~/.ssh/id_rsa.pub
   ```

   ![ssh-keygen](.\img\ssh-keygen.jpg)

3. 출력된 키값을 모두 복사하여 https://github.com/settings/keys 페이지에서 등록합니다.

위 과정을 거치면 Pull 명령 사용시 매번 사용자의 Email, Password를 입력하지 않아도 Private 저장소에 Push, Pull이 가능해집니다.

---

#### 1.3 Github Webhook 설정

이제 Webhook 사용 설정을 할 차례입니다. Webhook에 Callback 서버를 등록하여 해당 저장소에 Push 이벤트가 발생할때마다 지정된 Callback 서버로 이벤트를 전달하는 역할을 합니다.

등록 절차는 다음과 같습니다.

1. Webhook을 설정할 저장소 → Settings → Webhooks 페이지의 Add webhook 버튼을 클릭하여 새로운 Webhook 설정을 추가합니다.
   ![github-webhook-setting](.\img\github-webhook-setting.jpg)

   

2. Webhook 추가 페이지에 접근하였다면 다음 이미지와 같이 설정합니다.
   ![image-20220209010906451](C:\Users\xeros\AppData\Roaming\Typora\typora-user-images\image-20220209010906451.png)

   각 항목에 대한 설명입니다.

   - **Payload URL** : Github에서 이벤트를 전달할 타겟 URL입니다. 
     (자신의 웹서버를 타겟으로 지정하면 됩니다.)
   - **Contents type** : Github에서 이벤트를 어떤 양식으로 전달할지 선택합니다. 여기서는 json 방식을 사용하도록 하겠습니다.
   - **Secret** : 요청이 정상적인지 검증하기 위한 일종의 비밀번호입니다. 패스워드로 사용할 값을 입력하면 됩니다. (추후 이 Secret 값은 후술할 서버 프로그램을 작성할 때도 역시 사용합니다.)
   - **trigger** : 해당 저장소에 어떤 이벤트가 발생하였을 때 Webhook을 작동시킬지를 선택합니다.
     (Push를 감지하고 Pull 요청을 하는 로직을 작성할것이기에 Just the push event를 선택합니다.)
   - **Active** : 요청을 전달할것인지를 선택합니다. 기본값으로 활성화되어있으며 그대로 사용하겠습니다.

---

#### 1.4 Webhook Backend 작성

이제 설정한 Webhook 이벤트를 수신할 백엔드 서버 프로그램을 작성합니다. 총 두가지 프로그램이 필요합니다.

- hook.sh
  저장소에 pull 명령을 실행할 쉘스크립트입니다. 다음과같이 작성합니다.

  ```sh
  #!/bin/bash
  
  # DIRECTORY TO THE REPOSITORY (자신의 저장소 경로로 수정해야함)
  REPOSITORY="/home/xeros/ServerProccess/GreatCatsby-BackEnd"
  
  cd $REPOSITORY
  
  git pull
  ```

  `REPOSITORY`변수는 자신의 Git repository 경로를 적어줍니다. (저장소가 없을 경우 `git clone`명령으로 저장소를 먼저 clone한 뒤 진행합니다.)

  이후 `$ sudo chmod +x hook.sh`명령을 사용하여 권한을 부여합니다.

- webhook.js
  `port`에 사용할 포트 번호를 입력합니다. 저는 8001번을 사용하였습니다.

  ```js
  var http    = require('http');
  var spawn   = require('child_process').spawn;
  var crypto  = require('crypto');
  var url     = require('url');
  
  var secret  = 'xeroswebhook'; // secret key of the webhook
  var port    = 8001; // port
  
  http.createServer(function(req, res){
      
      console.log("request received");
      res.writeHead(400, {"Content-Type": "application/json"});
  
      var path = url.parse(req.url).pathname;
  
      if(path!='/push' || req.method != 'POST'){
         var data = JSON.stringify({"error": "invalid request"});
         return res.end(data); 
      }
  
  
      var jsonString = '';
      req.on('data', function(data){
          jsonString += data;
      });
  
      req.on('end', function(){
        var hash = "sha1=" + crypto.createHmac('sha1', secret).update(jsonString).digest('hex');
        if(hash != req.headers['x-hub-signature']){
            console.log('invalid key');
            var data = JSON.stringify({"error": "invalid key", key: hash});
            return res.end(data);
        } 
         
        console.log("running hook.sh");
     
        var deploySh = spawn('sh', ['hook.sh']);
        deploySh.stdout.on('data', function(data){
            var buff = new Buffer(data);
            console.log(buff.toString('utf-8'));
        });
  
        
      res.writeHead(400, {"Content-Type": "application/json"});
      
      var data = JSON.stringify({"success": true});
        return res.end(data);
   
      });
  
      
  }).listen(port);
  
  console.log("Server listening at " + port);
  ```

  이 코드의 핵심 기능은 35번 라인부터입니다. 35번 라인을 제외한 나머지 부분은 키값이 없거나 잘못된 요청에 대한 예외처리 기능이고 35번 라인부터는 요청이 정상적이면 작성했던 `hook.sh` 쉘스크립트를 실행하고 `hook.sh`스크립트는 설정한 경로에 `git pull` 명령을 실행합니다.

  ---

  **전체적인 흐름을 요약해보면 다음과 같습니다.**

  1. 원격 저장소에서 Push 발생
  2. Github Webhook에서 Push 이벤트를 감지하고 Webhook Callback 서버로 이벤트 감지 전달
  3. Webhook Callback 서버에서 로컬의 `hook.sh` 스크립트 실행 → 저장소 Pull

## 02. PM2

![PM2-Logo](.\img\PM2-Logo.png) 

PM2는 Node.js용 라이브러리로 NPM과 비슷한 역할을 하지만 NPM보다 훨씬 더 다양하고 강력한 기능을 제공하는 **패키지 매니저**입니다. 애초에 라이브러리 이름부터 ProcessManager로써 개발환경의 편리함을 비약적으로 증가시켜주는 라이브러리입니다.

---

#### 2.1 NPM vs PM2

Node.js 서버를 NPM으로 관리하게 될 경우 반드시 아래 두가지 문제를 직면하게됩니다.

1. 서비스를 제공하고 있는 도중 예기치 못한 문제로 서버 중지시
2. Node.js는 싱글 스레드 기반인데 이를 멀티 코어 혹은 하이퍼 스레딩을 제공하고자 함

---

#### 2.2 PM2 설치

PM2는 npm으로 설치합니다. 또한 터미널에서 실행 명령어를 사용하기 위해 `-g`옵션을 주어 전역설치합니다.

```bash
$ npm install pm2 -g
```

---

#### 2.3 PM2 명령셋

- 서버 가동 명령어
  서버를 데몬화하여 가동하는 명령어이며, 기본적으로 서버가 다운되었을때 자동 서버를 재가동시킵니다.

  ```bash
  $ pm2 start example.js
  ```

- `--watch` 옵션
  이 옵션을 사용하면 프로젝트 디렉토리 내 변경사항이 생길경우 자동으로 서버를 재가동시킵니다.

  ```bash
  $ pm2 start example.js --watch
  ```

- `-i max(코어수)` 옵션
  `-i`뒤에 코어수를 입력하거나 `max`인자를 주면 최대 코어 개수로 클러스팅됩니다.
  (코드 내부에서 멀티스레딩 기능 작성 필요없이 해결가능합니다.)
  ![PM2-Clustering](.\img\PM2-Clustering.png)

- 모니터링 명령어
  현재 서버 상태를 확인할 수 있습니다.

  ```bash
  $ pm2 monit
  ```

  ![PM2-Monit](.\img\PM2-Monit.png)

- Startup 등록
  다음 명령어를 사용하여 현재 등록된 데몬들을 서버 재부팅 이후에도 자동으로 가동되도록 등록합니다.

  ```bash
  $ pm2 startup
  ```

  이후 터미널에 출력되는 명령어를 복사하여 지시하는대로 입력하면 부팅시 재가동 목록에 추가됩니다.

  부팅시 자동 재가동 목록에서 제외하고싶다면 다음 명령어를 사용할 수 있습니다.

  ```bash
  $ pm2 unstartup
  ```

---

## 03. Github Webhook + PM2

이제 목표했던대로 개발자가 작업용 PC에서 작업 이후 Push를 하면, 서버에서 자동으로 Pull을 진행한 뒤 배포하는 시스템을 구축하기 위해서 PM2를 실행시켜보도록 하겠습니다.

우선 현재까지 진행한 프로젝트의 디렉토리 구조는 다음과 같습니다.

```
.
├── hook.sh
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── webhook.js
```

1. webhook을 핸들링할 `webhook.js`를 실행합니다.

   ```bash
   $ pm2 start webhook.js -i max
   ```

2. 웹프로그램 `index.js`를 실행합니다.
   이 때 `--watch` 옵션을 반드시 주어 실행합니다.

   ```bash
   $ sudo pm2 start index.js -i max --watch
   ```

   이렇게 `--watch`옵션을 주어 실행하면 `webhook.js`가 `hook.sh`를 실행해 갱신된 내용을 Pull 받았을때 자동으로 `index.js`를 재실행하여 변경된 내용을 반영하기 때문입니다.

   또한 `sudo`를 사용하여 root 권한으로 실행시키는 이유는 기본적으로 리눅스는 `80`번 포트를 관리자 권한 없이 사용하는것을 허용하지 않기때문에 관리자 권한으로 `index.js`를 실행시켜야만 `80`번 포트에서 웹프로그램을 호스팅할 수 있습니다. 

   만약 관리자 권한을 사용할 수 없다면 다른 포트를 사용하고 `80`번 포트로 접속을 시도하면 다른 포트로 포트포워딩해주면 됩니다.

모든 순서를 정상적으로 완료했다면 이제 작업내용 Push만으로 서버에 변경내용이 자동으로 반영됩니다.

