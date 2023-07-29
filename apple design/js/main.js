(() => {
    
let yOffset = 0;//window.pageYOffset 대신 쓸 변수
let prevScrollHeight = 0;//현재 스크롤 위치( yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
let currentScene = 0;//현재 활성화된 (눈 앞에 보고 있는) 씬(scroll-section)


const sceneInfo = [
    { // 0
        type: 'sticky',
        heightNum: 5,//브라우저 높이의 5배로 scrollheight 세팅
        scrollHeight : 0 ,
        objs:{
            container: document.querySelector('#scroll-section-0')
        }
    },
    { // 1
        type: 'normal',
        heightNum: 5,
        scrollHeight : 0 ,
        objs:{
            container: document.querySelector('#scroll-section-1')
        }
    },
    { // 2
        type: 'sticky',
        heightNum: 5,
        scrollHeight : 0 ,
        objs:{
            container: document.querySelector('#scroll-section-2')
        }
    },
    { // 3
        type: 'sticky',
        heightNum: 5,
        scrollHeight : 0 ,
        objs:{
            container: document.querySelector('#scroll-section-3')
        }
    }
];

    function setLayout(){
    // 각 스크롤 섹션의 높이
     for (let i = 0; i < sceneInfo.length;  i++){
         sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
         sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
     }
     yOffset = window.pageYOffset; 
     let totalScrollHeight = 0;
     for (let i = 0; i < sceneInfo.length; i++) {
        totalScrollHeight += sceneInfo[i].scrollHeight;
        if (totalScrollHeight >= yOffset){
            currentScene = i;
            break;

        }
     }
     document.body.setAttribute('id',`show-scene-${currentScene}`);
}

    function scrollLoop(){//현재 눈 앞에 몇번 째 스크롤섹션이 스크롤중인지
        prevScrollHeight = 0;// 스크롤 할 때마다 초기화가 안되어서 다 더해지는 일이 발생 하기 때문에 0으로 지정
        for(let i = 0; i < currentScene; i++ ){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
        if (yOffset < prevScrollHeight){
            if(currentScene === 0) return;//브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`)

        }
   
    };
    
    window.addEventListener('resize', setLayout);
    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });
    //window.addEventListener('DOMContentLoaded', setLayout);//DOM => html 구조만 로드되면 실행 
    window.addEventListener('load', setLayout);
    window.addEventListener('resize', setLayout);

})(); 