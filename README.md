## MyHomeFit - Web

## Rule
- 코딩을 바로 시작하지 않고, issue를 생성하여 해야할 일을 정리하고 issue번호로 브랜치를 생성한 후(branch명: feat/이슈 번호) 시작한다.
- 절대 main(또는 master)에서 바로 작업하지 않고, issue번호 별로 branch를 생성해서 그 branch에서 작업한다
- merge는 주기적으로 자주 
- commit은 생활화하자 (issue에서 각 항목별로 구현 완료할때마다 체크해주고 commit해주자)
- commit할때는 commit messege convention을 최대한 지켜주자


## commit messege convention
```
- *feat: 새로운 기능 추가*
- *update: 버전 등 업데이트*
- *fix: 수정*
- *fix typo: 오타 수정*
- *bugfix: 버그 수정*
- *docs: 문서 수정*
- *style: 코드 모캣팅, 세미콜론 누락, 코드 변경 없을 경우*
- *refactor: 코드 리펙토링*
- *chore: 빌드 업무 수정, 패키지 수정*
```
- fix, refactor에는 추가적으로 파일명을 써준다. fix(MakeYourSet.js): 스크롤 기능 오류 해결
- 수정한 파일이 많을 경우에는 FileName을 폴더 명 혹은 작업 단위로 대체한다
- commit 메시지가 여러줄일 경우 제목과 내용을 분리시킨다.


## PR convention
- Pull Request 작성 시 제목은 브랜치명과 이슈 제목으로 한다.
    - 예시) feat/2 Make Your Set 페이지 구현
- 내용은 resolve: #{이슈번호}로 한다. (이렇게 하면 Merge시에 자동으로 issue가 해결된 것으로 설정해준다) 
