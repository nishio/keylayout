import React from 'react';
import './App.css';
import styled from 'styled-components'
import { useState } from 'react';

const BORDER_WIDTH = 1;
const BORDER_COLOR = "#bbb"
const Box = styled.div`
border: solid
border-width: ${BORDER_WIDTH}px
border-color: ${BORDER_COLOR}
`
const KEYBOX_DEFAULT_SIZE = 60;
const KeyBox = styled(Box) < { left: number, color: string }> `
width: ${KEYBOX_DEFAULT_SIZE}px
height: ${KEYBOX_DEFAULT_SIZE}px
position: absolute;
background: ${props => props.color}
left: ${props => props.left}px
`

const JA_LETTER_SIZE = 30;
const JA_LETTER_FONTSIZE = 30;
const JA_LETTER_OFFSET = 5

const JaLetter = styled.div`
font-size: ${JA_LETTER_FONTSIZE}px;
position: absolute
width: ${JA_LETTER_SIZE}px
height: ${JA_LETTER_SIZE}px
`

const JaLeft = styled(JaLetter)`
top: ${0 - JA_LETTER_OFFSET}px
left: 0px
`
const JaRight = styled(JaLetter)`
top: ${0 - JA_LETTER_OFFSET}px
left: ${JA_LETTER_SIZE}px
`
const JaBase = styled(JaLetter)`
top: ${JA_LETTER_SIZE - JA_LETTER_OFFSET}px
left: ${JA_LETTER_SIZE / 2}px
`
const EN_LETTER_OFFSET = 4

const EnLetter = styled.div`
font-size: ${JA_LETTER_FONTSIZE / 2}px;
position: absolute
width: ${JA_LETTER_SIZE / 2}px
height: ${JA_LETTER_SIZE / 2}px
border: solid ${BORDER_WIDTH / 2}px ${BORDER_COLOR}
`

const EnShift = styled(EnLetter)`
top: ${JA_LETTER_SIZE}px
left: ${JA_LETTER_SIZE / 2 * 3}px
`
const EnBase = styled(EnLetter)`
top: ${JA_LETTER_SIZE / 2 * 3}px
left: ${JA_LETTER_SIZE / 2 * 3}px
`
const EnSpan = styled.span`
position: absolute
top: ${0 - EN_LETTER_OFFSET}px
text-align: center
width: ${JA_LETTER_SIZE / 2}px
`

const Row = styled.div`
position: relative
height: ${KEYBOX_DEFAULT_SIZE}
`


const makeKeyBox = (left: number, keytop: string, color: string) => {
  return (
    <KeyBox left={left} color={color}>
      <JaLeft>{keytop.charAt(0)}</JaLeft>
      <JaRight>{keytop.charAt(1)}</JaRight>
      <JaBase>{keytop.charAt(2)}</JaBase>
      <EnShift><EnSpan>{keytop.charAt(3)}</EnSpan></EnShift>
      <EnBase><EnSpan>{keytop.charAt(4)}</EnSpan></EnBase>
    </KeyBox>
  );
}

const KEY_COLOR = [
  "#fcc", "#fdc", "#ffc", "#cfc", "#cfc", "white", "#cff", "#cff", "#cdf", "#ccf", "#dcf", "#dcf", "#dcf"
]

const makeRow = (top: number, left: number, keys: string[]) => {
  return (
    <Row style={{ top: top }}>
      {keys.map((x, i) => (makeKeyBox(KEYBOX_DEFAULT_SIZE * i + left, x, KEY_COLOR[i])))}
    </Row>
  );
}

const App: React.FC = () => {
  const [rowData, setRowData] = useState(
    [
      [
        "？！１!1", "・ ２@2", "〜 ３#3", "  ４$4", "  ５%5", "  ￥{[", " ［６^6", " ］７&7", " （８*8", " ）９(9", "  ０)0", "   |\\", ""
      ],
      [
        "ぁ  Q ", "え かW ", "り たE ", "ゃ こR ", "れ さT ", "  「}]", "ぱよらY ", " にちU ", " るくI ", " まつO ", " ぇほ", ""
      ],
      [
        "を うA ", "あ しS ", "な てD ", "ゅ けF ", "も せG ", "  」_-", " みはH ", " おとJ ", " のきK ", "ぽょいL ", " っん:;", "  ：\"'"
      ],
      [
        "ぅ ねZ ", "ー ひX ", "ろ すC ", "や ふV ", "ぃ へB ", "  ＿+=", "ぷぬめN ", " ゆそM ", "ぺむ、<,", "ぴわ。>.", " ぉ・?/"
      ],
    ]
  )
  const originalRowDataString = (
    '[["？！１!1", "・ ２@2", "〜 ３#3", "  ４$4", "  ５%5", "  ￥{[", " ［６^6", " ］７&7", " （８*8", " ）９(9", "  ０)0", "   |\\\\", ""],\n' +
    ' ["ぁ  Q ", "え かW ", "り たE ", "ゃ こR ", "れ さT ", "  「}]", "ぱよらY ", " にちU ", " るくI ", " まつO ", " ぇほ", ""],\n' +
    ' ["を うA ", "あ しS ", "な てD ", "ゅ けF ", "も せG ", "  」_-", " みはH ", " おとJ ", " のきK ", "ぽょいL ", " っん:;", "  ：\\"\'"],\n' +
    ' ["ぅ ねZ ", "ー ひX ", "ろ すC ", "や ふV ", "ぃ へB ", "  ＿+=", "ぷぬめN ", " ゆそM ", "ぺむ、<,", "ぴわ。>.", " ぉ・?/"]]'
  );

  const offsets = [0, 30, 60, 90]

  const rows = rowData.map((x: string[], i: number) =>
    makeRow(i * (KEYBOX_DEFAULT_SIZE + BORDER_WIDTH), offsets[i], x)
  )
  const onChange = (e: any) => {
    console.log(e.target.value)
    setRowData(JSON.parse(e.target.value))
  }

  return (
    <div>
      <div style={{ margin: "30px" }}>
        {rows}
        <textarea onChange={onChange} style={{ marginTop: "300px", width: "100%", height: "10em", fontSize: "16px" }}>
          {originalRowDataString}
        </textarea>
      </div>
    </div >
  );
}

export default App;
