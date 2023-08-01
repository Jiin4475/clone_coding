(() => {
    
let yOffset = 0;//window.pageYOffset 대신 쓸 변수
let prevScrollHeight = 0;//현재 스크롤 위치( yOffset) 보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값의 합
let currentScene = 0;//현재 활성화된 (눈 앞에 보고 있는) 씬(scroll-section)
let enterNewScene = false;//새로운 씬이 시작되는 순간 true

const sceneInfo = [
    { // 0
        type: 'sticky',
        heightNum: 5,//브라우저 높이의 5배로 scrollheight 세팅
        scrollHeight : 0 ,
        objs:{
            container: document.querySelector('#scroll-section-0'),
            messageA: document.querySelector
            ('#scroll-section-0 .main-message.a'),
            messageB: document.querySelector
            ('#scroll-section-0 .main-messgae.b'),
            messageC: document.querySelector
            ('#scroll-section-0 .main-messgae.c'),
            messageD: document.querySelector
            ('#scroll-section-0 .main-messgae.d'),
        },
        values:{// 애니메이션 구간설정 start 0.1 end 0.2
            messageA_opacity_in: [0, 1, { start:0.1, end:0.2 }],//0~1, 
            //messageB_opacity_in: [0, 1, { start:0.3, end:0.4 }],
            messageA_translateY_in: [20, 0, { start:0.1, end:0.2 } ],

            messageA_opacity_out: [1, 0, { start:0.25, end:0.3 }],
            messageA_translateY_out: [0, -20, { start:0.25, end:0.3 } ],
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
        let rv;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollRatio =  currentYOffset / scrollHeight;
        if(values.length === 3){
            //start~ end 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset<= partScrollEnd){
                rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            }else if(currentYOffset < partScrollStart){
                rv = values[0];
            }else if (currentYOffset > partScrollEnd){
                rv = values[1];
            }
            
        }else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
            //퍼센테지 구하기
        }
        return rv;
   };

    // 첫번째 애니메이션 구간 => 해당 구간에서만 애니메이션이 작동하는거 확인
    function  playAnimation (){
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight =sceneInfo[currentScene].scrollHeight
        const scrollRatio = (yOffset - prevScrollHeight) / scrollHeight;
   
       
    switch (currentScene) {
        case 0: 
            //console.log('0 play');
            const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
            const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);

            const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
            const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
            
            
            if(scrollRatio <= 0.22 ) {
                // in
                objs.messageA.style.opacity = messageA_opacity_in;
                objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
            }else {
                //out
                objs.messageA.style.opacity = messageA_opacity_out;
                objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
            }
            //스크롤 값에 맞게 투명=> 진해졌다가=>
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
        enterNewScene = false;
        prevScrollHeight = 0;// 스크롤 할 때마다 초기화가 안되어서 다 더해지는 일이 발생 하기 때문에 0으로 지정
        for(let i = 0; i < currentScene; i++ ){
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id',`show-scene-${currentScene}`)
        }
        if (yOffset < prevScrollHeight){
            if(currentScene === 0) return;//브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일)
            enterNewScene = true;
            currentScene--;
            document.body.setAttribute('id',`show-scene-${currentScene}`)

        }
        // enterNewScene = true => 새로운 씬 (1->2씬으로 넘어가는 순간)
        if (enterNewScene) return ;// 새로운 값을 주지말고 종료
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