import styled from 'styled-components/native';

export const ImageBackground = styled.ImageBackground`
    width: 100%;
    height: 200px;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 16px;
    border-radius: 10px;
    resize-mode: cover;
    background-color: #222;
`;

export const MovieRate = styled.View`
    margin: 8px;
    height: 50px;
    width: 50px;
    align-self: flex-end;
    align-items: center;
    justify-content: center;
    background-color: #000A;
    border-radius: 10px;
`;

export const MovieDescription = styled.View`
    height: 80px;
    width: 100%;
    background-color: #000A;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 8px;
`;

export const RemoveButton = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100%;
    border-radius: 10px;
    background-color: tomato;
`