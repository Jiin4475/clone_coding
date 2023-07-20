// 전역변수를 피하기 위해,즉시 호출 함수 (function (){})
//4개의 객체를 만듬 - 4개 구간으로 구성되어있어서
//애니메이션 구간 설정 (scrollHeight)

(()=> {
    const sceneInfo = [
     //4개 객체인 이유? 스크롤 섹션이 4개
      {  
         //각 구간의 스크롤 높이, 집적 값을 넣지 않는 이유는 여러 기기에 접급 할 수 있기 때문에 고정값을 주지 않음
         // 0
         type:'sticky',
         heightNum:5,//브라우저 높이의 5배로 scrollHeigh 셋팅
         scrollHeigh :0,
         objs:{
          container: document.querySelector('#scroll-section-0')
         }
      }, 
      {   //1
          type:'normal',
          heightNum:5,
          scrollHeigh :0,
          objs:{// container는 각 섹션의 아이디로 미리 가져온것 
              container: document.querySelector('#scroll-section-1')
             }
      },
      {   //2
          type:'sticky',
          heightNum:5,
          scrollHeigh :0,
          objs:{
              container: document.querySelector('#scroll-section-2')
             }
      },
      {   //3
          type:'sticky',
          heightNum:5,
          scrollHeigh :0,
          objs:{
              container: document.querySelector('#scroll-section-3')
             }
      }
    ];
  
    function setLayout(){
      //각 스크롤 섹션의 높이 세팅 * window.innerHeight 브라우저창의 높이 곱하기
    for (let i =0; i < sceneInfo.length; i++){
      sceneInfo[i].scrollHeigh = sceneInfo[i].heightNum * window.innerHeight;
      //위에서 받은  scrollHeigh 3450px을 objs 컨테이너,즉 실행되는 섹션의 아이디에 스크롤값을 주기위에 (각기 다른 섹션이기 때문에 ` %{변수}` 에 넣어줌)
      sceneInfo[i].objs.container.style.height = `${ sceneInfo[i].scrollHeigh}px`;
      //위의 결과로 스크롤바가 작아짐(sceneInfo[i].scrollHeigh 결과를 넣어서) => 컨텐츠의 길이가 길어졌다는것
    }
  
    console.group(sceneInfo);
  }
  //윈도우의 창 사이즈가 변할 때 재 조정 
   window.addEventListener('resize', setLayout);
   setLayout();//실행
  
  }) ();