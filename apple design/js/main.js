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
            container: document.querySelector('#scroll-section-0'),
            messageA: document.querySelector
            ('#scroll-section-0 .main-messgae.a'),
            messageB: document.querySelector
            ('#scroll-section-0 .main-messgae.b'),
            messageC: document.querySelector
            ('#scroll-section-0 .main-messgae.c'),
            messageD: document.querySelector
            ('#scroll-section-0 .main-messgae.d'),
        },
        values:{
            messageA_opacity: [0,1]
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

   //values => messageA_opacity: [0,1]
   function calcValues(values, currentYOffset) {
        
   };

    // 첫번째 애니메이션 구간 => 해당 구간에서만 애니메이션이 작동하는거 확인
    function  playAnimation (){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        console.log(currentScene,currentYOffset);
    switch (currentScene) {
        case 0:
            //console.log('0 play');
            let messageA_opacity_0 = values.messageA_opacity[0];
            let messageA_opacity_1 = values.messageA_opacity[1];
            console.log(calcValues(values.messageA_opacity, currentYOffset));
            break;

        case 1:
            //console.log('1 play');
            break;
        
        case 2:
            //console.log('2 play');
            break;
            
        case 3:
            // console.log('3 play');
            break;
            
    }

    };
   

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
        playAnimation();     
   
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