import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 16px;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #222;
`;

export const SearchBar = styled.View`
    height: 40px;
    width: 100%;
    background-color: #444;
    border-radius: 10px;
    margin-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const SearchInput = styled.TextInput`
    padding: 0;
    margin: 0;
    color: white;
    width: 80%;
`;

export const Title = styled.Text`
    color: #fff;
    font-size: 18px;
    margin-bottom: 16px;
`;