# ๐ช MyHomeFit 
### - AI๊ธฐ๋ฐ ํํธ๋ ์ด๋ ์น ์๋น์ค
-----------------------------

## โ๋ชจ๋  ์์์ develop ๋ธ๋์น์์ ํ๋ค.โ ##
### ๐ฅ์งํ์ํฉ - develop ๋ธ๋์น์์ ํ์ธ ๊ฐ๋ฅ ###

------------------------------------------
## Rule
- ์ฝ๋ฉ์ ๋ฐ๋ก ์์ํ์ง ์๊ณ , issue๋ฅผ ์์ฑํ์ฌ ํด์ผํ  ์ผ์ ์ ๋ฆฌํ๊ณ  issue๋ฒํธ๋ก ๋ธ๋์น๋ฅผ ์์ฑํ ํ(branch๋ช: feat/์ด์ ๋ฒํธ) ์์ํ๋ค.
- ์ ๋ main(๋๋ master)์์ ๋ฐ๋ก ์์ํ์ง ์๊ณ , issue๋ฒํธ ๋ณ๋ก branch๋ฅผ ์์ฑํด์ ๊ทธ branch์์ ์์ํ๋ค 
- branch ์์ฑ ์ main์์ X, develop์์ ํ์!
- merge๋ ์ฃผ๊ธฐ์ ์ผ๋ก ์์ฃผ 
- commit์ ์ํํํ์ (issue์์ ๊ฐ ํญ๋ชฉ๋ณ๋ก ๊ตฌํ ์๋ฃํ ๋๋ง๋ค ์ฒดํฌํด์ฃผ๊ณ  commitํด์ฃผ์)
- commitํ ๋๋ commit messege convention์ ์ต๋ํ ์ง์ผ์ฃผ์


## commit messege convention
```
- *feat: ์๋ก์ด ๊ธฐ๋ฅ ์ถ๊ฐ*
- *update: ๋ฒ์  ๋ฑ ์๋ฐ์ดํธ*
- *fix: ์์ *
- *fix typo: ์คํ ์์ *
- *bugfix: ๋ฒ๊ทธ ์์ *
- *docs: ๋ฌธ์ ์์ *
- *style: ์ฝ๋ ๋ชจ์บฃํ, ์ธ๋ฏธ์ฝ๋ก  ๋๋ฝ, ์ฝ๋ ๋ณ๊ฒฝ ์์ ๊ฒฝ์ฐ*
- *refactor: ์ฝ๋ ๋ฆฌํํ ๋ง*
- *chore: ๋น๋ ์๋ฌด ์์ , ํจํค์ง ์์ *
```
- fix, refactor์๋ ์ถ๊ฐ์ ์ผ๋ก ํ์ผ๋ช์ ์จ์ค๋ค. fix(MakeYourSet.js): ์คํฌ๋กค ๊ธฐ๋ฅ ์ค๋ฅ ํด๊ฒฐ
- ์์ ํ ํ์ผ์ด ๋ง์ ๊ฒฝ์ฐ์๋ FileName์ ํด๋ ๋ช ํน์ ์์ ๋จ์๋ก ๋์ฒดํ๋ค
- commit ๋ฉ์์ง๊ฐ ์ฌ๋ฌ์ค์ผ ๊ฒฝ์ฐ ์ ๋ชฉ๊ณผ ๋ด์ฉ์ ๋ถ๋ฆฌ์ํจ๋ค.


## PR convention
- Pull Request ์์ฑ ์ ์ ๋ชฉ์ ๋ธ๋์น๋ช๊ณผ ์ด์ ์ ๋ชฉ์ผ๋ก ํ๋ค.
    - ์์) feat/2 Make Your Set ํ์ด์ง ๊ตฌํ
- ๋ด์ฉ์ resolve: #{์ด์๋ฒํธ}๋ก ํ๋ค. (์ด๋ ๊ฒ ํ๋ฉด Merge์์ ์๋์ผ๋ก issue๊ฐ ํด๊ฒฐ๋ ๊ฒ์ผ๋ก ์ค์ ํด์ค๋ค) 
