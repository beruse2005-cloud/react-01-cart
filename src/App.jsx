import {useState} from "react";

function App() {
    const [name, setName] = useState("");    // input 관리용
    const [cart, setCart] = useState([]);    // 목록 관리용
    return (
        <>
            <h2>Simple Shop</h2>
            <fieldset>
                <legend>상품 추가</legend>
                <form>
                    <input placeholder={"상품명을 입력하세요"} value={name} />
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <table border={1}
                   cellPadding={10}
                   style={{
                       // react에서 style 속성은 객체로 전달해줄 수 있으며,
                       // key: value 형태로 프로퍼티를 기록하는데
                       // key에는 camelCase로 작성해주어야 함
                       width: "100%",
                       borderCollapse: "collapse",
                   }}>
                <thead style={{ backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th>상품명</th>
                    <th>수량 제어</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>지우개</td>
                    <td>수량변경</td>
                    <td>삭제</td>
                </tr>
                </tbody>
            </table>
            <h3>총 품목 : 몇개 / 총 수량: 몇개</h3>
        </>
    )
}

export default App;