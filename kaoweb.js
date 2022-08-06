/**
 * ソースの構成
 * 音を
 */
window.onload = ()=>{
  // 音楽を鳴らす準備
  var bgm = document.getElementById("bgm");
  bgm.volume = 0.2;
  var bgmautoplayed = false;

  // canvas準備
  const canvas = document.getElementById("canvas"); // HTML上のcanvasを取得
  const context = canvas.getContext("2d"); // canvasのcontextを取得

  // 変数初期化
  var mouseon = false;
  var nadenade = false;

  // 画像の準備
  const eye = new Image();
  const kao = new Image();
  const kaonade = new Image();
  eye.src = "eye.png";
  kao.src = "kao.png";
  kaonade.src = "kaonade.png";


  // 画像の情報
  const kaoimgsize =[837,837]; // 顔の大きさ
  const eyeimgsize = [221,82]; // 目の大きさ
  const eyeposfix = [-60,10]; // 目の中心位置の補正
  const mouseposfix = [60,-10]; // マウスの位置の補正
  const mousemove = [10,10]; // マウス移動係数

  // マウスが動くごとに描画更新
  document.body.addEventListener("mousemove", function(e){
      draweye(e.pageX, e.pageY);
  });
  // スマホで動くごとに描画更新
  document.body.addEventListener("touchmove", function(e){
    draweye(e.changedTouches[0].pageX, e.changedTouches[0].pageY);
});
  
  // マウスを押したら、目を瞑る。＋jsの仕様で自動再生できなかったので、BGM再生開始
  document.body.addEventListener("mousedown", function(e){
      mouseon = true;
      draweye(e.pageX, e.pageY);
      // bgm自動再生の応急処理        
      if(!bgmautoplayed){
          bgm.play();
          bgmautoplayed = true;
      }
  });

  // マウスを上げたら、元に戻す。
  document.body.addEventListener("mouseup", function(e){
      mouseon = false;
      draweye(e.pageX, e.pageY);
  });

  // 目を描画させる関数
  function draweye(x,y){
      var eyecenterpos = [eyeimgsize[0]/2, eyeimgsize[1]/2]; // 目画像の中心位置計算
      var kaocenterpos = [kaoimgsize[0]/2, kaoimgsize[0]/2]; // 顔画像の中心位置計算
      var eyeposdef = [kaocenterpos[0] - eyecenterpos[0] + eyeposfix[0], kaocenterpos[1] - eyecenterpos[1] + eyeposfix[1]]; // 顔と目の中心を合わせる
      var mouseamount = [x - kaocenterpos[0]+ mouseposfix[0], y - kaocenterpos[1] + mouseposfix[1]]; // マウスと顔の中心を合わせる
      var eyepos = [eyeposdef[0] + (mouseamount[0] / mousemove[0]), eyeposdef[1] + (mouseamount[1] / mousemove[1])]; // マウスの移動量に合わせて目の位置を計算する

      // 目の限界指定
      if(eyepos[0] < 226){
          eyepos[0] = 226;
      } else if(eyepos[0] > 263){
          eyepos[0] = 263;
      }
      if(eyepos[1] < 378){
          eyepos[1] = 378;
      } else if(eyepos[1] > 408){
          eyepos[1] = 408;
      }
      
      //　ナデナデ範囲内か
      if (mouseon && y < 590 && y > 130 && x < 600 && x > 160) {
          nadenade = true;
      } else {
          nadenade = false;
      }

      // キャラクターの描画
      context.clearRect(0, 0, 800, 800);
      context.drawImage(eye, eyepos[0], eyepos[1]);
      // ナデナデtrue?
      if(nadenade) {
          context.drawImage(kaonade, 0, 0);
      } else {
          context.drawImage(kao, 0, 0);
      }


  }

  
//const bgm = new Audio('music.mp3');
//bgm.play();
  
}

