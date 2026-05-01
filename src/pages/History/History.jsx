import Container from "../../components/Container/Container.jsx";
import PageHeader from "../../components/PageHeader/PageHeader.jsx";
import AiAnalysisHistoryList
  from "../../components/AiAnalysisHistory/AiAnalysisHistoryList.jsx";
import Card from "../../components/Card/Card.jsx";

// 임시 데이터
const data = [
  {id: 1, content : '분석 내역1'},
  {id: 2, content : '분석 내역2'},
  {id: 3, content : '분석 내역3'},
  {id: 1, content : '분석 내역4'},
  {id: 2, content : '분석 내역5'},
  {id: 3, content : '분석 내역6'}
]

const History = () => {
  return (
      <Container>
        <PageHeader title={"AI 분석 기록"} description={'분석했던 내용을 언제든 다시 확인하세요'} />
        <Card radius={'sm'}>
          <AiAnalysisHistoryList data={data}/>
        </Card>
      </Container>
  )
}

export default History;