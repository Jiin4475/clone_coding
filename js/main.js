// 전역변수를 피하기 위해,즉시 호출 함수 (function (){})
//4개의 객체를 만듬 - 4개 구간으로 구성되어있어서
//애니메이션 구간 설정 (scrollHeight)


(() => {
 let yOffset = 0;//window.pageYOffset 대신 쓸 변수
 let prevScrollHeight = 0;//현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
 let currentScene = 0;//현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)

 const sceneInfo = [
    { //0
    type:'sticky',
    heightNum: 5,// 브라우저 높이의 5배로 scrollHeight 셋팅
    scrollHeight:0,
    objs:{//애니메이션에 연관된 스크롤섹션4개를 가져와서 쓰기위해,
        container: document.querySelector('#scroll-section-0')

    }
    },
     {
        //1
    type:'normal',
    heightNum: 5,
    scrollHeight:0,
    objs:{
        container: document.querySelector('#scroll-section-1')

    }
    },
    {
        //2
    type:'sticky',
    heightNum: 5,
    scrollHeight:0,
    objs:{
        container: document.querySelector('#scroll-section-2')

    }
    },
    {
        //3
    type:'sticky',
    heightNum: 5,
    scrollHeight:0,
    objs:{
        container: document.querySelector('#scroll-section-3')

    }
    }
 ];

 function setLayout(){//선언
    //각 스크롤 높이 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++){
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
        sceneInfo[i].objs.container.style.height = `${ sceneInfo[i].scrollHeight}px`;
    }
 
  yOffset = window.pageYOffset;
    //current scene 자동으로  세팅
    let totalScrollHeight = 0;
    for(let i =0 ;i <sceneInfo.length; i++){
        totalScrollHeight+= sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= yOffset) {
            currentScene = i;
            break;
        }
    }
    document.body.setAttribute('id',`show-scene-${currentScene}`)
    
 }

 

 function scrollLoop(){
    prevScrollHeight= 0;//값이 누적이 되지 않게 0
   for( let i = 0; i < currentScene; i++){
    prevScrollHeight += sceneInfo[i].scrollHeight;

   }
   if(yOffset > prevScrollHeight+ sceneInfo[currentScene].scrollHeight){
    currentScene++;
    document.body.setAttribute('id',`show-scene-${currentScene}`)
   }
   if(yOffset < prevScrollHeight){
    if(currentScene === 0) return;
    // 종종 다른 브라우저에서 스크롤 바운싱 될 때 마이너스로 취급 될 수 있기 때문에 그러면 에러가 발생 할 수 있음 그걸 방지하기 위해서  if(currentScene === 0) return; 주면 return 종료 
    currentScene--;
    document.body.setAttribute('id',`show-scene-${currentScene}`)
   }

};
    window.addEventListener('scroll',() => {
    yOffset = window.pageYOffset;
    scrollLoop();
});
//이름 그대로 DOM HTML 객체들이 로드만되면 시작(이미지X)
//window.addEventListener('DOMContentLoaded',setLayout);
//웹페이지 내용 이미지등이 싹 로딩된 후 시작
window.addEventListener('load',setLayout);
window.addEventListener('resize',setLayout);
 //윈도우창의 사이즈가 변할 때 add event 주고, setLayout 실행


//  setLayout();//실행

})();