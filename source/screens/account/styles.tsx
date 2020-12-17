import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 16px;
    justify-content: center;
    align-items: center;
    background-color: #222;
`;

export const FormBox = styled.View`
    background-color: #333;
    margin-top: 16px;
    border-radius: 10px;
    width: 90%;
    padding: 16px;
`;

export const Input = styled.TextInput`
    border: 1px solid gray;
    padding: 0px 8px;
    border-radius: 10px;
    margin-bottom: 16px;
    height: 40px;
    color: white;
`;

export const Button = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 50px;
    border-radius: 10px;
    background-color: tomato;
`;

export const SwitchButton = styled.TouchableOpacity`
    margin-top: 16px;
    justify-content: center;
    align-items: center;
`;