import React from 'react';
import Navbar from '../components/Navbar';
import '../css/Main/Main.css'
import IntroImg from "../images/fitness-img.png";
import Screen1 from "../images/makeyourset.png";
import Screen2 from "../images/training.png";
import Screen3 from "../images/fitnotes.png";
import Screen4 from "../images/calendar.png";
import { Link } from 'react-router-dom';
import IntroBox from '../components/Main/IntroBox';
import RightSection from '../components/Main/RightSection';
import LeftSection from '../components/Main/LeftSection';
import AboutUs from '../components/Main/AboutUs';



function Main() {
    return(
        <div className="mainpage-content">
            <div id="intro-page">
                <Navbar />
                <div id="intro-content">
                    <div id="intro-text">
                        <span id="intro-title">
                            My Home Fit
                        </span >
                        <span id="intro-message">
                            세트 관리부터 실시간 운동까지, 언제 어디서든 나만의 AI 트레이너 마이홈핏과 함께해요.
                            {/* 건강한 습관을 만들어주는 나만의 AI 트레이너, 마이홈핏. */}
                        </span>
                        <Link to="/signup">시작하기</Link>
                    </div>
                    <div id="intro-img">
                        <img src={ IntroImg }></img>
                    </div>
                </div>
                <div class="custom-shape-divider-bottom-1635440065">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div id="menu-intro">
                <IntroBox name={'Make Your Set'} icon={1} content={ '원하는 운동만으로 구성된 나만의 세트를 만들고, 관리할 수 있습니다.'}/>
                <IntroBox name={ 'Training'} icon={ 2 } content={'세트를 선택하여 실시간으로 세트를 수행할 수 있습니다.' }/>
                <IntroBox name={ 'Fitnotes'} icon={ 3 } content={ '사용자 랭킹, 세트 랭킹을 확인할 수 있습니다.'}/>
                <IntroBox name={ 'Calendar'} icon={ 4 } content={ '캘린더를 통해 운동 패턴 관리와 일정 관리를 할 수 있습니다.'}/>
            </div>
            <RightSection img={Screen1} color={'#3A6BCF'} title={'나만의 운동세트 만들기'} text={'나에게 맞는 운동을 선별하여 내가 원하는 운동 세트를 만들 수 있어요.'} width={'44rem'} height={'29rem'} link={ 1}/>
            <LeftSection img={ Screen2 } color={ '#00BCCA' } title={'AI 트레이너와 함께 하는 실시간 운동'} text={'원하는 세트를 선택하여 AI 트레이너와 함께 실시간으로 운동을 할 수 있어요.'} width={'39rem'} height={'32.5rem'} link={2 }/>
            <RightSection img={ Screen3 } color={ '#7E43A8' } title={'랭킹 확인을 통한 동기부여'} text={'가장 인기있는 운동부터 사용자 순위, 세트 순위까지 확인할 수 있어요.'} width={'40rem'} height={'44.5rem'} link={ 3}/>
            <LeftSection img={ Screen4 } color={ '#00B3AD' } title={'일정 관리부터 운동 루틴 확인 까지'} text={'나만의 캘린더로 운동 일정을 관리하여 건강한 운동 습관을 만들어요.'} width={'43rem'} height={'34rem'} link={ 4}/>
            {/* <AboutUs/> */}
        </div>
    )
}
export default Main;