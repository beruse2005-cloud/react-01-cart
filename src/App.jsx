import {useState} from "react";

function App() {
    const [name, setName] = useState("");   // input 관리용
    const [cart, setCart] = useState([]);   // 목록 관리용

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name === "" || name === " ") {
            return;
        }
        setCart([...cart, {name: name, quantity: 1}]);
        setName("");
    }

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleUpdateQuantity = (index, number) => {
        // 기능을 합쳐서 핸들러를 만드는데,
        // '1을 더하고', '1을 빼고' 하는 기능이 아니라, "수량을 변경하는 함수"로 만듦
        // 얼마를 바꾸느냐는 이 함수를 실행하는 곳에서 결정(매개변수로 전달)
        // if (cart[index].quantity <= 1) {
        //     return;
        // }
        const newCart = [...cart];
        // newCart[index].quantity += 1;
        const nextQuantity = newCart[index].quantity + number;
        // 그렇게 -3 해달라는 명령을 처리했을 때 nextQuantity 마이너스 값이면 하면 안됨
        // 이 조건은 nextQuantity 계산을 한 뒤에 if 처리를 해줘야 함.
        if (nextQuantity < 1) {
            return;  // nextQuantity를 구하긴 했지만, 업데이트를 안하고 종료
        }
        newCart[index].quantity = nextQuantity;
        setCart(newCart);
    };

    const handleDeleteButton = (index) => {
        const result = cart.filter((v, i) => {
            return i !== index
        });
        setCart(result);
    }

    // totalQuantity라는 일반 변수는 값을 저장할 때 'state'를 이용하고 있는 중임
    // react는 state의 값이 변하는지를 감시하고 있기 때문에
    // 값이 변하여 재계산을 하는 'react에서의 리렌더링 => 재계산을 하여 브라우저에 코드를 제공하는 일'이라는 과정에 포함됨
    const totalQuantity = cart.reduce((sum, item) => {
        return item.quantity + sum
    }, 0);

    return (
        <>
            <h2>Simple Shop</h2>
            <fieldset>
                <legend>상품 추가</legend>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder={"상품명을 입력하세요"}
                        value={name}
                        onChange={handleChange}/>
                    <button type={"submit"}>카트에 담기</button>
                </form>
            </fieldset>
            <table border={1}
                   cellPadding={10}
                   style={{
                       width: "100%",
                       borderCollapse: "collapse",
                   }}>
                <thead style={{backgroundColor: "#f2f2f2"}}>
                <tr>
                    <th>상품명</th>
                    <th>수량 제어</th>
                    <th>관리</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item, index) => <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                        <button onClick={() => handleUpdateQuantity(index, -10)}>-10</button>
                        <button onClick={() => handleUpdateQuantity(index, -1)}>-</button>
                        {item.quantity}
                        <button onClick={() => handleUpdateQuantity(index, 1)}>+</button>
                        <button onClick={() => handleUpdateQuantity(index, 10)}>+10</button>
                    </td>
                    <td>
                        <button onClick={() => handleDeleteButton(index)}>삭제</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <h3>총 품목 : {cart.length}개 / 총 수량: {totalQuantity}개</h3>
        </>
    );
}

export default App;