// 전역변수를 피하기 위해,즉시 호출 함수 (function (){})
//4개의 객체를 만듬 - 4개 구간으로 구성되어있어서
//애니메이션 구간 설정 (scrollHeight)
(() => {
 const sceneInfo = [
    {
        //0
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
 }

 window.addEventListener('resize',setLayout);
 //윈도우창의 사이즈가 변할 때 add event 주고, setLayout 실행

 setLayout();//실행
})();