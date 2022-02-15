/* 
    useState 중접 (여러개 사용)
 */
import React, { useState } from 'react';

const Info = () => {
    // 이름을 저장할 name state
    const [name, setName] = useState('');
    // 닉네임을 저장할 nickname state
    const [nickname, setNickname] = useState('');

    // 이름이 변경되면 실행될 onChangeName 함수
    const onChangeName = e => {
        setName(e.target.value);
    };

    // 닉네임이 변경되면 실행될 onChangeNickname 함수
    const onChangeNickname = e => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
            {/* input의 value는 name state로 지정, 값이 변경될때 onChangeName 함수 호출 */}
            <input value={name} onChange={onChangeName} />
            {/* input의 value는 nickname state로 지정, 값이 변경될때 onChangeNickname 함수 호출 */}
            <input value={nickname} onChange={onChangeNickname} />
        </div>
        <div>
            <div>
            <b>이름:</b> {name}
            </div>
            <div>
            <b>닉네임: </b>
            {nickname}
            </div>
        </div>
        </div>
    );
};

export default Info;