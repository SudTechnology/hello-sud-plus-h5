# Embark on a Journey of Rapid Integration and Debugging of SUD Games

- Step 1: Integrate SUD Games on the Web (Three-Minute Code Integration)
  <details>
  <summary>Detailed Description</summary>
  
      1.appId、appKey，please use those of the QuickStart client;
      2.Web bundleId，please use the domain name of web;(the bundleId/applicationId in the access information table);
      3.For the short-term token code, please use the QuickStart backend service (obtained through login/getCode);
      4.Complete the integration and get the game running;
  
      *** SUD platform supports one appId being bound to multiple bundleIds and applicationIds ***
      *** After filling out the access information table, SUD will bind the APP's bundleId and applicationId to the QuickStart appId ***
  QuickStart backend service [hello-sud-java code repository](https://github.com/SudTechnology/hello-sud-java) ，`if the code repository cannot be accessed, please contact SUD to add it, and provide your github account`;
  </details>


- Step 2: Debugging between the Web and Server
  <details>
  <summary>Detailed Description</summary>
  
      1.The Server implements 4 HTTP APIs; (filled in the access information table)
      2.Please use the web appId、appKey、bundleId(web)；
      3.The Server implements the login/getCode interface to obtain the short-term token code；
      4.The Web and Server debug 5 HTTP APIs；
      5.Complete the HTTP API debugging；
  </details>


- Step 3：The Web Focuses on Its Own Business Requirements
  <details>
  <summary>Detailed Description</summary>

      1.Refer to the SudMGP documentation, SudMGPWrapper, QuickStart, and HelloSud experience demos (showing multiple scenarios, custom scenarios)；
      2.Focus on APP UI interaction, whether functions are supported, and how to implement them.
      For example：
      Adjust the size and position of the game view；
      Adjust the interaction process between the Web and the game, whether UI elements can be hidden, whether buttons can be hidden and implemented by the APP, and   whether click events support interception callbacks;
      
      3.Focus on the Web business logic process and implementation.
      For example：
      How to pass through numerical type parameters and Key type parameters when a game starts；（settlement）
  ![Android](doc/hello_sudplus_android.png)
  ![iPhone](doc/hello_sudplus_iphone.png)
  [Web Demo](https://hello-sud.sud.tech/)

  </details>

# Three-Minute Code Integration

- Step 1: Install SudMGPSDK and SudMGPWrapper
  <details>
  <summary>Detailed Description</summary>
  
  1. Execute the command 
    ```javascript
      npm install sudmgp-sdk-js sudmgp-sdk-js-wrapper
    ```
  </details>

- Step 2: Import the Modules SudMGPSDK and SudMGPWrapper into the Project
  <details>
  <summary>Detailed Description</summary>
  

  ``` javascript
    import { GameConfigModel, SudFSMMGDecorator, SudFSTAPPDecorator, SudFSMMGListener } from 'sudmgp-sdk-js-wrapper'
    //  SudMGPWrapper can be imported separately or on-demand
    // import { SudMGPWrapper } from 'sudmgp-sdk-js-wrapper'  Full import of SudMGPWrapper

    import { SudMGP } from 'sudmgp-sdk-js'

  ```
  </details>


- Step 3: There is a ready-made [QuickStart](https://github.com/SudTechnology/hello-sud-plus-h5/blob/master/QuickStart/react/src/QuickStart/index.ts)file in the Demo, which can be directly copied and imported into the project for use
  <details>
  <summary>Detailed Description</summary>

      1.Modify the appId and appKey in the QuickStart file.
      2.The web needs to implement the login (backend service login/getCode) request interface method in the getCode of the QuickStart file by itself.
  ```javascript
    /** The UserId used. Here it is randomly generated for demonstration, and developers should modify it to the unique userId used in the business.  */
    public userId = Math.floor((Math.random() + 1) * 10000).toString()
    /** The appId applied for on the Sud platform */
    public SudMGP_APP_ID = "1461564080052506636"
    /** The appKey applied for on the Sud platform */
    public SudMGP_APP_KEY = "03pNxK2lEXsKiiwrBQ9GbH541Fk2Sfnc"

  ```
      3.The APP client should use the QuickStart backend service login/getCode；
        *** To achieve the APP to quickly load and run the game, use the QuickStart service ***
        *** SUD platform supports one appId being bound to multiple bundleIds and applicationIds ***
        *** After filling out the access information table, SUD will bind the APP's bundleId and applicationId to the QuickStart appId ***
  </details>


- Step 4: Add the Mounting Element on the Page
    <details>
    <summary>Detailed Description /react/src/pc/GameDetail.tsx</summary>

    ```html
      <div>
        <!-- The game mounting container, the width and height styles need to be customized -->
        <div id='game'></div>
      </div>
    ```
    </details>


- Step 5: Load the Game
    <details>
    <summary>Detailed Description /react/src/hooks/useGameDetail.ts</summary>

    ``` javascript
      import { SDKGameView } from "QuickStart"
      const root = document.getElementById('game') // Get the mounting container element
      const gameRoomId = 'xxxx' // The roomId of the business itself
      const gameId = 'xxxxx' // Access game id
      const userId = Math.floor((Math.random() + 1) * 10000).toString() //  The userId of the business itself
      if (root) {
        //Initialization
        const nsdk = new SDKGameView({ root, gameRoomId, gameId, userId })

        nsdk.setSudFSMMGListener({
          onGameStarted() {
            console.log('========onGameStarted event=====')
          }
        })
        // Call login to get code
        nsdk.login(userId)
      }    
    ```
    </details>


- Step 6: Destroy the Game
    <details>
    <summary>Detailed Description</summary>

    ``` javascript
      root.innerHTML = '' // Clear the internal elements of the mounting container
      // Execute the destroy method of the sdk
      nsdk.onDestroy()
    ```
    </details>

## Notes
   1. onGetGameViewInfo needs to process the dpr value returned by the game for the width and height. The code is as follows:
  ``` javascript
    onGetGameViewInfo: function (handle: ISudFSMStateHandle, dataJson: string): void {
        const width = self.root.clientWidth
        const height = self.root.clientHeight
        const data = JSON.parse(dataJson)
        const dpr = data.ratio || 1 //Some games may not have ratio, and the default value needs to be set to 1
        const gameViewInfo = {
          ret_code: 0,
          ret_msg: "success",
          view_size: {
            width: width * dpr, // alculate the width and height with dpr
            height: height * dpr
          },
          view_game_rect: {
            left: 0,
            right: 0,
            top: 50,
            bottom: 50
          }
        }
        handle.success(JSON.stringify(gameViewInfo))
      },

  ```

  2. The web communication mechanism is based on the window.onmessage event. If the web page itself also uses the window.onmessage event, the following code needs to be added. SudSDk will not modify the window.onmessage method defined by the web itself, and the corresponding listening and execution will still occur.
  ```javascript
      // The onmessage defined in the page
      window.onmessage = function (data) {
        console.log('[ The listening method of the web itself is executed  ] >', data)
      }
      // Just add the following line of code
      // SudSDk is an instance of SDKGameView (the class in src/QuickStart)
      SudSDk && SudSDk._registerCustomCommandEvent()

  ```



# QuickStart Architecture Diagram

![QuickStartArch.png](doc/QuickStartArch.png)

# 1. SudMGP SDK

### 1.1 SudMGP Client SDK

- [Download SudMGP-Android-v1.1.52.554.zip](https://github.com/SudTechnology/sud-mgp-android/releases)
- [Download SudMGP-iOS-v1.1.52.527.zip](https://github.com/SudTechnology/sud-mgp-ios/releases)

### 1.2 Integration Documentation

- [Integration Documentation](https://docs.sud.tech/zh-CN/app/Client/API/)
- [FAQ](https://docs.sud.tech/zh-CN/app/Client/FAQ/)

# 2. SudMGPWrapper

- `SudMGPWrapper encapsulates SudMGP to simplify the mutual calls between the App and the game`;
- `SudMGPWrapper is maintained and updated regularly`;
- `It is recommended that the APP access side use SudMGPWrapper.`;
- `SudMGPAPPState`、`SudMGPMGState`、`SudFSMMGListener`、`SudFSMMGDecorator`、`SudFSTAPPDecorator  Core class
`;

### 2.1 App Calls the Game

- `SudMGPAPPState` encapsulates [App Common States](https://docs.sud.tech/zh-CN/app/Client/APPFST/CommonState.html) ;
- `SudFSTAPPDecorator` encapsulates [ISudFSTAPP](https://docs.sud.tech/zh-CN/app/Client/API/ISudFSTAPP.html)
  two types of interfaces ，[notifyStateChange](https://docs.sud.tech/zh-CN/app/Client/APPFST/CommonState.html) 、 foo;
- `SudFSTAPPDecorator` is responsible for encapsulating each App common state into an interface;
    <details>
    <summary>Code Framework class SudFSTAPPDecorator</summary>

    ``` javascript
    class SudFSTAPPDecorator {
        // iSudFSTAPP = SudMGP.loadMG(AppAudioRoomActivity, userId, roomId, code, gameId, language, sudFSMMGDecorator);
        public setISudFSTAPP(ISudFSTAPP iSudFSTAPP);
        // 1. Join the state
        public notifyAPPCommonSelfIn(isIn: boolean, seatIndex: number, isSeatRandom: boolean, teamId: number) {

        ...
    
        // 16. Set the AI players in the game (added on 2022-05-11)
        public notifyAPPCommonGameAddAIPlayers(aiPlayers: AIPlayers[], isReady: number)
        public destroyMG();
        public updateCode(code: string, listener: ISudListenerNotifyStateChange)
        ...
    }
    ```
    </details>

### 2.2 Game Calls the App

- `SudMGPMGState` encapsulates [Common States - Game](https://docs.sud.tech/zh-CN/app/Client/MGFSM/CommonStateGame.html)
  and  [Common States - Player](https://docs.sud.tech/zh-CN/app/Client/MGFSM/CommonStatePlayer.html) ;
- `SudFSMMGListener` encapsulates three types of callback functions of [ISudFSMMG](https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG.html) ，onGameStateChange、onPlayerStateChange、onFoo;
- `SudFSMMGListener` is responsible for encapsulating each game state into a separate callback function;
    <details>
    <summary>Code Framework interface SudFSMMGListener</summary>

    ``` javascript
    interface SudFSMMGListener {
        onGameLog(str: string): void
        onGameStarted();
        onGameDestroyed();
        onExpireCode(handle: ISudFSMStateHandle, dataJson: string): void
        onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string): void
        onGetGameCfg(handle: ISudFSMStateHandle, dataJson: string): void
    
        // Common States - Game
        // void onGameStateChange(ISudFSMStateHandle handle, String state, String dataJson);
        // Document: https://docs.sud.tech/zh-CN/app/Client/MGFSM/CommonStateGame.html
        // 1.Public message in the game lobby
       onGameMGCommonPublicMessage?(handle: ISudFSMStateHandle, model: IMGCommonPublicMessage) 

        ...
    
        // 21. The game notifies the app layer whether adding a companion robot is successful（Add on 2022-05-17）
        onGameMGCommonGameAddAIPlayers?(handle: ISudFSMStateHandle, model: IMGCommonGameAddAIPlayers)

        
        // Common States - Player
        // void onPlayerStateChange(ISudFSMStateHandle handle, String userId, String state, String dataJson);
        // Documentation: https://docs.sud.tech/zh-CN/app/Client/MGFSM/CommonStatePlayer.html
        // 1.Join the state
        onPlayerMGCommonPlayerIn?(handle: ISudFSMStateHandle, userId: string, model: IMGCommonPlayerIn)
        ...
    
        // 11. The game notifies the app layer of the remaining time of the current game（Added on 2022-05-23, currently effective for UMO）
        onPlayerMGCommonGameCountdownTime?(handle: ISudFSMStateHandle, userId: string, model: IMG
    ```
    </details>
- The decorator class`SudFSMMGDecorator` of  [ISudFSMMG](https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG.html) is responsible for dispatching each game state and caching the required game states；
    <details>
    <summary>Code Framework class SudFSMMGDecorator</summary>

    ``` javascript
    class SudFSMMGDecorator implements ISudFSMMG {
        // Set the callback
        public setSudFSMMGListener(listener: Partial<SudFSMMGListener>)
        // Game log
        onGameLog(str: string): void
        // Game loading progress
        public onGameLoadingProgress(stage: number, retCode: number, progress: number)
        //The game has started, and the long connection of the game is completed
        public onGameStarted();CommonGameCountdownTime)
    
        // Game personalized states: Draw Guess
        // Documentation：https://docs.sud.tech/zh-CN/app/Client/MGFSM/DrawGuess.html
        // 1. Selecting words state
        onPlayerMGDGSelecting?(handle: ISudFSMStateHandle, userId: string, model: IMGDGSelecting)
        ...
    }
        // Game destruction
        public onGameDestroyed();
        // Code expiration, must be implemented; the APP access side must call handle.success to release the asynchronous callback object
        public onExpireCode(handle: ISudFSMStateHandle, dataJson: string): void
        // Get game View information, must be implemented; the APP access side must call handle.success to release the asynchronous callback object
        // GameViewInfoModel文档: https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG/onGetGameViewInfo.html
        public onGetGameViewInfo(handle: ISudFSMStateHandle, dataJson: string)
        // Get game Config, must be implemented; the APP access side must call handle.success to release the asynchronous callback object
        // GameConfigModel文档: https://docs.sud.tech/zh-CN/app/Client/API/ISudFSMMG/onGetGameCfg.html
        public  onGetGameCfg(handle: ISudFSMStateHandle, dataJson: string): void
        // Game state change; the APP access side must call handle.success to release the asynchronous callback object
        public onGameStateChange(handle: ISudFSMStateHandle, state: string, dataJson: string)
        // Game player state change, the APP access side must call handle.success to release the asynchronous callback object
        public onPlayerStateChange(handle: ISudFSMStateHandle, userId: string, state: string, dataJson: string)
  
        ...
    }
    ```
    </details>

# 3. QuickStart

- Please use the QuickStart project to run；
 QuickStart/react Development Setup
 ```
  npm install

  npm start
 ```

- The demo runs with Node version Node <= 16 and npm >= 5.6;
- Rapid access documentation：[StartUp-Android](https://docs.sud.tech/zh-CN/app/Client/StartUp-Android.html)
  、 [StartUp-iOS](https://docs.sud.tech/zh-CN/app/Client/StartUp-iOS.html) 、[StartUp-Web](https://docs.sud.tech/zh-CN/app/Client/StartUp-Web.html)
- `SDKGameView` is responsible for login(App getCode) --> SudMGP.initSDK --> SudMGP.loadMG;
- `QuickStart Server` [hello-sud-java](https://github.com/SudTechnology/hello-sud-java) ，login(App gets the short-term token code through getCode) ，`If the code repository cannot be accessed, please contact SUD to add it, and provide your github account`;


- HelloSud Experience Demo (showing multiple business scenarios)

![Android](doc/hello_sudplus_android.png)
![iPhone](doc/hello_sudplus_iphone.png)

# 4.  Sequence Diagram of Calls between the Access Party Client and SudMGP SDK

![AppCallSudMGPSeqDiag.png](doc/AppCallSudMGPSeqDiag.png)

